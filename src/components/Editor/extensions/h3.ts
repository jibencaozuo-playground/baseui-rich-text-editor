import { HeadingExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.h3"> = () => ({
  id: "jbcz.base.h3",
  initialize: () => new HeadingExtension(),
  getIcon: () => "H3",
  getName: () => "Heading 3",
  getActive: (a) => a.heading({ level: 3 }),
  onIconClick: (c) => c.toggleHeading({ level: 3 })
});

export default extension;
