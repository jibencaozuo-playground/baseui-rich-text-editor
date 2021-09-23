import { HorizontalRuleExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.hr"> = () => ({
  id: "jbcz.base.hr",
  initialize: () => new HorizontalRuleExtension(),
  getIcon: () => '---',
  getName: () => "Horizontal Rule",
  getActive: () => false,
  onIconClick: (c) => c.insertHorizontalRule()
});

export default extension;
