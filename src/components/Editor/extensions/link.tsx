import { LinkExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

import { LinkModal } from "./components/LinkModal";

export interface ILinkExtensionConfig {}

export interface ILinkExtensionState {
  modalOpen: boolean;
}

const extension: IExtensionFunction<
  "jbcz.base.link",
  ILinkExtensionConfig,
  ILinkExtensionState
> = () => ({
  id: "jbcz.base.link",
  initialize: () => new LinkExtension({ autoLink: true }),
  initialState: { modalOpen: false },
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-link`} />
  ),
  getName: () => "Code",
  getActive: (a) => a.link(),
  onIconClick: (_, __, setState) => setState({ modalOpen: true }),
  AdditionalContent: LinkModal
});

export default extension;
