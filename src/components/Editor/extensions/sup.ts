import type { IExtensionFunction } from "./typing";

import { SupExtension } from "remirror/extensions";

const extension: IExtensionFunction<"jbcz.base.sup"> = () => ({
  id: "jbcz.base.sup",
  initialize: () => new SupExtension(),
  getIcon: () => "^",
  getName: () => "Superscript",
  getActive: (a) => a.sup(),
  onIconClick: (c) => c.toggleSuperscript()
});

export default extension;
