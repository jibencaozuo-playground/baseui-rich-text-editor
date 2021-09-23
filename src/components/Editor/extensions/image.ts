import { ImageExtension } from "remirror/extensions";
import type { IExtensionFunction } from "./typing";

import { ImageUploadModal } from "./components/ImageUploadModal";

export interface IImageExtensionConfig {}

export interface IImageExtensionState {
  modalOpen: boolean;
}

const extension: IExtensionFunction<
  "jbcz.base.image",
  IImageExtensionConfig,
  IImageExtensionState
> = () => ({
  id: "jbcz.base.image",
  initialize: () => new ImageExtension({ enableResizing: true }),
  initialState: { modalOpen: false },
  getIcon: () => "Img",
  getName: () => "Image",
  getActive: () => false,
  onIconClick: (_, __, setState) => setState({ modalOpen: true }),
  AdditionalContent: ImageUploadModal
});

export default extension;
