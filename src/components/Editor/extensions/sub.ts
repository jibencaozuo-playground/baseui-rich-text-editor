import type { IExtensionFunction } from "./typing";

import { SubExtension } from "remirror/extensions";

const extension: IExtensionFunction<"jbcz.base.sub"> = () => ({
  id: "jbcz.base.sub",
  initialize: () => new SubExtension(),
  getIcon: () => "_",
  getName: () => "Subscript",
  getActive: (a) => a.sub(),
  onIconClick: (c) => c.toggleSubscript()
});

export default extension;
