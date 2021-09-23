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
> = ({ commands, state, setState }) => {
  const isOpen = state.modalOpen;
  const setIsOpen = React.useCallback(
    (x: boolean) => {
      setState({ modalOpen: x });
    },
    [setState]
  );

  const [url, setUrl] = useAtom(LINK_URL_ATOM);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setUrl(undefined);
  }, [setIsOpen, setUrl]);

  const handleUrlChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.currentTarget.value);
    },
    [setUrl]
  );

  const handleSubmit = React.useCallback(() => {
    if (url) {
      commands.updateLink(url);
    }

    handleClose();
  }, [commands, url, handleClose]);

  return (
    <Modal onClose={handleClose} isOpen={isOpen}>
      <ModalHeader>插入链接</ModalHeader>
      <ModalBody>
        <Input onChange={handleUrlChange} value={url || ""} />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleClose}>取消</ModalButton>
        <ModalButton onClick={handleSubmit}>插入</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
