import { HeadingExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.h1"> = () => ({
  id: "jbcz.base.h1",
  initialize: () => new HeadingExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-h1`} />
  ),
  getName: () => "Heading 1",
  getActive: (a) => a.heading({ level: 1 }),
  onIconClick: (c) => c.toggleHeading({ level: 1 })
});

export default extension;
