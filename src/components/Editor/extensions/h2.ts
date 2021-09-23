import { HeadingExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.h2"> = () => ({
  id: "jbcz.base.h2",
  initialize: () => new HeadingExtension(),
  getIcon: () => "H2",
  getName: () => "Heading 2",
  getActive: (a) => a.heading({ level: 2 }),
  onIconClick: (c) => c.toggleHeading({ level: 2 })
});

export default extension;
