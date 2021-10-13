import { HistoryExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";

import sprite from './images/icons.svg'

import { SVGIcon } from './components/SVGIcon'

const extension: IExtensionFunction<"jbcz.base.undo"> = () => ({
  id: "jbcz.base.undo",
  initialize: () => new HistoryExtension(),
  getIcon: () => (
    <SVGIcon href={`${sprite}#react-editor-undo`} />
  ),
  getName: () => "Undo",
  getActive: (a) => false,
  onIconClick: (c) => c.undo()
});

export default extension;
