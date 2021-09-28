import { HeadingExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.h2"> = () => ({
  id: "jbcz.base.h2",
  initialize: () => new HeadingExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-h2`} />
  ),
  getName: () => "Heading 2",
  getActive: (a) => a.heading({ level: 2 }),
  onIconClick: (c) => c.toggleHeading({ level: 2 })
});

export default extension;
