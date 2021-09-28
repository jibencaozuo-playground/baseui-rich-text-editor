import { ItalicExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.italic"> = () => ({
  id: "jbcz.base.italic",
  initialize: () => new ItalicExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-italic`} />
  ),
  getName: () => "Italic",
  getActive: (a) => a.italic(),
  onIconClick: (c) => c.toggleItalic()
});

export default extension;
