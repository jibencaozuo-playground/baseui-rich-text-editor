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
import type { DropFilesEventHandler } from "baseui/file-uploader";

import type { IImageExtensionState } from "../image";
import type { IAdditionalComponentProps } from "../typing";
import { useStyletron } from "styletron-react";
import { Button } from "baseui/button";

export const IMAGE_URL_ATOM = atom<string | undefined>(undefined);
export const IMAGE_ALT_ATOM = atom<string | undefined>(undefined);

export const ImageUploadModal: React.FC<
  IAdditionalComponentProps<IImageExtensionState>
> = ({ commands, state, setState, overrides }) => {
  const [css] = useStyletron();
  const isOpen = state.modalOpen;
  const setIsOpen = React.useCallback(
    (x: boolean) => {
      setState({ modalOpen: x });
    },
    [setState]
  );

  const [alt, setAlt] = useAtom(IMAGE_ALT_ATOM);
  const [src, setSrc] = useAtom(IMAGE_URL_ATOM);

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
    if (src) {
      commands.insertImage({ src, alt });
    }

    handleClose();
  }, [commands, alt, src, handleClose]);

  const handleDrop = React.useCallback<DropFilesEventHandler>(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (acceptedFiles[0]) {
        setSrc(URL.createObjectURL(file));
      }
    },
    [setSrc]
  );

  return (
    <Modal
      onClose={handleClose}
      isOpen={isOpen}
      overrides={overrides?.Model}
    >
      <ModalHeader>图片</ModalHeader>
      <ModalBody>
        {src && (
          <div>
            <div
              className={css({
                textAlign: 'center',
              })}
            >
              <img
                className={css({
                  maxWidth: '100%',
                  maxHeight: '50vh',
                })}
                src={src}
                alt=""
              />
            </div>
            <Button
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    width: '100%'
                  })
                }
              }}
              onClick={() => setSrc(undefined)}
            >
              点击替换图片
            </Button>
          </div>
        )}
        <div style={src ? {
          position: 'absolute',
          zIndex: -1,
          height: 0,
          width: 0,
          overflow: 'hidden',
        } : {}}>
          <FileUploader
            accept="image/*"
            onCancel={() => {
              console.log("canceled");
            }}
            onDrop={handleDrop}
          />
        </div>
        <Input
          onChange={handleAltChange}
          placeholder="请输入图片注释"
          value={alt || ""}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleClose}>取消</ModalButton>
        <ModalButton onClick={handleSubmit}>插入</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
