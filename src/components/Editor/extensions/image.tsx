import { ImageExtension } from "remirror/extensions";
import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

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
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-image`} />
  ),
  getName: () => "Image",
  getActive: () => false,
  onIconClick: (_, __, setState) => setState({ modalOpen: true }),
  AdditionalContent: ImageUploadModal
});

export default extension;
