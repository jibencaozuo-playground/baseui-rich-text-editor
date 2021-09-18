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

export interface ILanguageOption {
  label: string;
  value: string;
}

export const SELECT_PROGRAMMING_LANGUAGE_MODAL_OPEN_ATOM = atom(false);
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

interface ILanguageModalProps {
  onSubmit: (language: ILanguageOption) => void;
}

export const ProgrammingLanguageSelectionModal: React.FC<ILanguageModalProps> =
  ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useAtom(
      SELECT_PROGRAMMING_LANGUAGE_MODAL_OPEN_ATOM
    );
    const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] =
      useAtom(SELECTED_PROGRAMMING_LANGUAGE_ATOM);

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
      if (selectedProgrammingLanguage) {
        onSubmit?.(selectedProgrammingLanguage[0]);
      }

      handleClose();
    }, [onSubmit, selectedProgrammingLanguage, handleClose]);

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
