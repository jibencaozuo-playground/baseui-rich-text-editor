import { BulletListExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.ul"> = () => ({
  id: "jbcz.base.ul",
  initialize: () => new BulletListExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-ul`} />
  ),
  getName: () => "Bulleted List",
  getActive: (a) => a.bulletList(),
  onIconClick: (c) => c.toggleBulletList()
});

export default extension;
