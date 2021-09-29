import { BoldExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.bold"> = () => ({
  id: "jbcz.base.bold",
  initialize: () => new BoldExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-bold`} />
  ),
  getName: () => "Bold",
  getActive: (a) => a.bold(),
  onIconClick: (c) => c.toggleBold()
});

export default extension;
