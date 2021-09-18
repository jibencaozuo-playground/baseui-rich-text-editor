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

export const LINK_MODAL_OPEN_ATOM = atom(false);
export const LINK_URL_ATOM = atom<string | undefined>(undefined);

interface ILinkModalProps {
  onSubmit: (url: string) => void;
}

export const LinkModal: React.FC<ILinkModalProps> =
  ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useAtom(LINK_MODAL_OPEN_ATOM);
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
        onSubmit?.(url);
      }

      handleClose();
    }, [onSubmit, url, handleClose]);

    return (
      <Modal onClose={handleClose} isOpen={isOpen}>
        <ModalHeader>插入链接</ModalHeader>
        <ModalBody>
          <Input
            onChange={handleUrlChange}
            value={url || ''}
          />
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={handleClose}>取消</ModalButton>
          <ModalButton onClick={handleSubmit}>插入</ModalButton>
        </ModalFooter>
      </Modal>
    );
  };
