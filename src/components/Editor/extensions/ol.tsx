import { OrderedListExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.ol"> = () => ({
  id: "jbcz.base.ol",
  initialize: () => new OrderedListExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-ol`} />
  ),
  getName: () => "Ordered List",
  getActive: (a) => a.orderedList(),
  onIconClick: (c) => c.toggleOrderedList()
});

export default extension;
