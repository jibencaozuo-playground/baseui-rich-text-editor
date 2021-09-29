import { BlockquoteExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.quote"> = () => ({
  id: "jbcz.base.quote",
  initialize: () => new BlockquoteExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-quote`} />
  ),
  getName: () => "Quote",
  getActive: (a) => a.blockquote(),
  onIconClick: (c) => c.toggleBlockquote()
});

export default extension;
