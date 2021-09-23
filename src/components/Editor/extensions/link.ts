import { LinkExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

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
  initialState: { modalOpen: true },
  getIcon: () => "Link",
  getName: () => "Code",
  getActive: (a) => a.codeBlock(),
  onIconClick: (_, __, setState) => setState({ modalOpen: true }),
  AdditionalContent: LinkModal
});

export default extension;
