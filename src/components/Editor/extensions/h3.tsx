import { HeadingExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.h3"> = () => ({
  id: "jbcz.base.h3",
  initialize: () => new HeadingExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-h3`} />
  ),
  getName: () => "Heading 3",
  getActive: (a) => a.heading({ level: 3 }),
  onIconClick: (c) => c.toggleHeading({ level: 3 })
});

export default extension;
