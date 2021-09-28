import { StrikeExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.strike"> = () => ({
  id: "jbcz.base.strike",
  initialize: () => new StrikeExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-strike`} />
  ),
  getName: () => "Strike",
  getActive: (a) => a.strike(),
  onIconClick: (c) => c.toggleStrike()
});

export default extension;
