import type { IExtensionFunction } from "./typing";

import { SupExtension } from "remirror/extensions";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.sup"> = () => ({
  id: "jbcz.base.sup",
  initialize: () => new SupExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-sup`} />
  ),
  getName: () => "Superscript",
  getActive: (a) => a.sup(),
  onIconClick: (c) => c.toggleSuperscript()
});

export default extension;
