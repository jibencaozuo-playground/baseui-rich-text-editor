import { StrikeExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.strike"> = () => ({
  id: "jbcz.base.strike",
  initialize: () => new StrikeExtension(),
  getIcon: () => "S",
  getName: () => "Strike",
  getActive: (a) => a.strike(),
  onIconClick: (c) => c.toggleStrike()
});

export default extension;
