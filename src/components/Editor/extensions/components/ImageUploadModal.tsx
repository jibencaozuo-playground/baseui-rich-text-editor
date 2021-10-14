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

import { EventsContext } from "../../Editor";
import { mergeOverrides } from "baseui";
import { Overrides } from "baseui/overrides";

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

  const events = React.useContext(EventsContext);

  const [alt, setAlt] = useAtom(IMAGE_ALT_ATOM);
  const [src, setSrc] = useAtom(IMAGE_URL_ATOM);

  const [disabled, setDisabled] = React.useState<boolean>(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setAlt(undefined);
    setSrc(undefined);
  }, [setIsOpen, setAlt, setSrc]);

  const handleAltChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAlt(event.currentTarget.value);
    },
    [setAlt]
  );

  const handleSubmit = React.useCallback(async () => {
    if (src) {
      try {
        if(events?.onImageUpload) {
          setDisabled(true)
          const imageURL = await events?.onImageUpload(src)
          commands.insertImage({ src: imageURL, alt, title: alt });
        } else {
          commands.insertImage({ src, alt, title: alt });
        }
      } catch (error) {
        console.error(error)
      } finally {
        setDisabled(false)
      }
    }
    handleClose();
  }, [src, handleClose, events, commands, alt]);

  const handleDrop = React.useCallback<DropFilesEventHandler>(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (acceptedFiles[0]) {
        if(src) URL.revokeObjectURL(src);
        setSrc(URL.createObjectURL(file));
      }
    },
    [setSrc, src]
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
              overrides={mergeOverrides({
                BaseButton: {
                  style: () => ({
                    width: '100%'
                  })
                }
              }, overrides?.ReselectImageButton as Overrides<unknown>)}
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
            disabled={disabled}
          />
        </div>
        <Input
          onChange={handleAltChange}
          placeholder="请输入图片注释"
          value={alt || ""}
          disabled={disabled}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton
          overrides={overrides?.ModalButton}
          onClick={handleClose}
          disabled={disabled}
        >
          取消
        </ModalButton>
        <ModalButton
          overrides={overrides?.ModalButton}
          onClick={handleSubmit}
          disabled={disabled}
        >
          插入
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};
