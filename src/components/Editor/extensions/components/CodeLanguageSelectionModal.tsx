import * as React from "react";
import { atom, useAtom } from "jotai";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from "baseui/modal";
import { Select } from "baseui/select";

import type { ICodeExtensionState } from "../code";
import type { IAdditionalComponentProps } from "../typing";

export interface ILanguageOption {
  label: string;
  value: string;
}

export const SELECTED_PROGRAMMING_LANGUAGE_ATOM = atom<
  ILanguageOption[] | undefined
>(undefined);

export const LANGUAGES: ILanguageOption[] = [
  { value: "r", label: "R" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "ruby", label: "Ruby" },
  { value: "julia", label: "Julia" },
  { value: "kotlin", label: "Kotlin" },
  { value: "python", label: "Python" },
  { value: "markup", label: "XML" },
  { value: "markup", label: "HTML" },
  { value: "javascript", label: "Javascript" },
  { value: "typescript", label: "Typescript" }
];

export const CodeLanguageSelectionModal: React.FC<
  IAdditionalComponentProps<ICodeExtensionState>
> = ({ commands, state, setState }) => {
  const isOpen = state.modalOpen;
  const setIsOpen = React.useCallback(
    (x: boolean) => {
      setState({ modalOpen: x });
    },
    [setState]
  );

  const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] = useAtom(
    SELECTED_PROGRAMMING_LANGUAGE_ATOM
  );

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setSelectedProgrammingLanguage(undefined);
  }, [setIsOpen, setSelectedProgrammingLanguage]);

  const handleSelectChange = React.useCallback(
    ({ value }) => {
      setSelectedProgrammingLanguage(value);
    },
    [setSelectedProgrammingLanguage]
  );

  const handleSubmit = React.useCallback(() => {
    if (selectedProgrammingLanguage && selectedProgrammingLanguage[0]) {
      commands.createCodeBlock({
        language: selectedProgrammingLanguage[0].value
      });
    }

    handleClose();
  }, [selectedProgrammingLanguage, handleClose, commands]);

  return (
    <Modal onClose={handleClose} isOpen={isOpen}>
      <ModalHeader>选择语言</ModalHeader>
      <ModalBody>
        <Select
          options={LANGUAGES}
          labelKey="label"
          valueKey="value"
          onChange={handleSelectChange}
          value={selectedProgrammingLanguage}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleClose}>取消</ModalButton>
        <ModalButton onClick={handleSubmit}>插入</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
