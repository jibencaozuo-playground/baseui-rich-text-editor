import * as React from "react";
import { atom, useAtom } from "jotai";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from "baseui/modal";
import { Input } from "baseui/input";

import type { IImageExtensionState } from "../image";
import type { IAdditionalComponentProps } from "../typing";

export const LINK_URL_ATOM = atom<string | undefined>(undefined);

export const LinkModal: React.FC<
  IAdditionalComponentProps<IImageExtensionState>
> = ({ commands, state, setState, overrides }) => {
  const isOpen = state.modalOpen;
  const setIsOpen = React.useCallback(
    (x: boolean) => {
      setState({ modalOpen: x });
    },
    [setState]
  );

  const [href, setHref] = useAtom(LINK_URL_ATOM);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setHref(undefined);
  }, [setIsOpen, setHref]);

  const handleUrlChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHref(event.currentTarget.value);
    },
    [setHref]
  );

  const handleSubmit = React.useCallback(() => {
    if (href) {
      commands.updateLink({ href });
    }

    handleClose();
  }, [commands, href, handleClose]);

  return (
    <Modal
      onClose={handleClose}
      isOpen={isOpen}
      overrides={overrides?.Model}
    >
      <ModalHeader>插入链接</ModalHeader>
      <ModalBody>
        <Input onChange={handleUrlChange} value={href || ""} />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleClose}>取消</ModalButton>
        <ModalButton onClick={handleSubmit}>插入</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
