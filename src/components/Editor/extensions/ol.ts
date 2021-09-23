import { OrderedListExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.ol"> = () => ({
  id: "jbcz.base.ol",
  initialize: () => new OrderedListExtension(),
  getIcon: () => "OL",
  getName: () => "Ordered List",
  getActive: (a) => a.orderedList(),
  onIconClick: (c) => c.toggleOrderedList()
});

export default extension;
