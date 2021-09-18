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
import { FileUploader } from "baseui/file-uploader";

export const IMAGE_MODAL_OPEN_ATOM = atom(false);
export const IMAGE_URL_ATOM = atom<string | undefined>(undefined);
export const IMAGE_ALT_ATOM = atom<string | undefined>(undefined);

interface IImageUploadModalProps {
  onSubmit: (url: string, alt: string) => void;
}

export const ImageUploadModal: React.FC<IImageUploadModalProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useAtom(IMAGE_MODAL_OPEN_ATOM);
  const [alt, setAlt] = useAtom(IMAGE_ALT_ATOM);
  const [url, setUrl] = useAtom(IMAGE_URL_ATOM);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setAlt(undefined);
  }, [setIsOpen, setAlt]);

  const handleAltChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAlt(event.currentTarget.value);
    },
    [setAlt]
  );

  const handleSubmit = React.useCallback(() => {
    if (url) {
      onSubmit?.(url, alt || '图像');
    }

    handleClose();
  }, [onSubmit, alt, url, handleClose]);

  return (
    <Modal onClose={handleClose} isOpen={isOpen}>
      <ModalHeader>图片</ModalHeader>
      <ModalBody>
        <FileUploader
          accept="image/*"
          onCancel={() => {console.log('canceled')}}
          onDrop={(acceptedFiles) => {
            const file = acceptedFiles[0]
            if (acceptedFiles[0]) {
                setUrl(URL.createObjectURL(file))
            }
          }}
        />
        <Input onChange={handleAltChange} value={alt || ""} />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleClose}>取消</ModalButton>
        <ModalButton onClick={handleSubmit}>插入</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
