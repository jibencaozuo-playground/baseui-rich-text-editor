import { BoldExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.bold"> = () => ({
  id: "jbcz.base.bold",
  initialize: () => new BoldExtension(),
  getIcon: () => "B",
  getName: () => "Bold",
  getActive: (a) => a.bold(),
  onIconClick: (c) => c.toggleBold()
});

export default extension;
