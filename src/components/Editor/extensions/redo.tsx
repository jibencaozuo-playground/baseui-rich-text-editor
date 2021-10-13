import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.redo"> = () => ({
  id: "jbcz.base.redo",
  initialize: () => {},
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-redo`} />
  ),
  getName: () => "Redo",
  getActive: (a) => false,
  onIconClick: (c) => c.redo()
});

export default extension;
