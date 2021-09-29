import type { IExtensionFunction } from "./typing";

import { SubExtension } from "remirror/extensions";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.sub"> = () => ({
  id: "jbcz.base.sub",
  initialize: () => new SubExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-sub`} />
  ),
  getName: () => "Subscript",
  getActive: (a) => a.sub(),
  onIconClick: (c) => c.toggleSubscript()
});

export default extension;
