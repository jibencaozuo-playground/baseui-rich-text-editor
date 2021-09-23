import { HeadingExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

const extension: IExtensionFunction<"jbcz.base.h1"> = () => ({
  id: "jbcz.base.h1",
  initialize: () => new HeadingExtension(),
  getIcon: () => "H1",
  getName: () => "Heading 1",
  getActive: (a) => a.heading({ level: 1 }),
  onIconClick: (c) => c.toggleHeading({ level: 1 })
});

export default extension;
