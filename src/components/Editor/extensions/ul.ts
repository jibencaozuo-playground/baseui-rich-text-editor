import { BulletListExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.ul"> = () => ({
  id: "jbcz.base.ul",
  initialize: () => new BulletListExtension(),
  getIcon: () => "UL",
  getName: () => "Bulleted List",
  getActive: (a) => a.bulletList(),
  onIconClick: (c) => c.toggleBulletList()
});

export default extension;
