import { HorizontalRuleExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.hr"> = () => ({
  id: "jbcz.base.hr",
  initialize: () => new HorizontalRuleExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-hr`} />
  ),
  getName: () => "Horizontal Rule",
  getActive: () => false,
  onIconClick: (c) => c.insertHorizontalRule()
});

export default extension;
