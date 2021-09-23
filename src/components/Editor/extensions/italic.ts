import { ItalicExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.italic"> = () => ({
  id: "jbcz.base.italic",
  initialize: () => new ItalicExtension(),
  getIcon: () => "I",
  getName: () => "Italic",
  getActive: (a) => a.italic(),
  onIconClick: (c) => c.toggleItalic()
});

export default extension;
