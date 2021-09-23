import { BlockquoteExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.quote"> = () => ({
  id: "jbcz.base.quote",
  initialize: () => new BlockquoteExtension(),
  getIcon: () => '""',
  getName: () => "Quote",
  getActive: (a) => a.blockquote(),
  onIconClick: (c) => c.toggleBlockquote()
});

export default extension;
