import r from "refractor/lang/r";
import json from "refractor/lang/json";
import yaml from "refractor/lang/yaml";
import ruby from "refractor/lang/ruby";
import julia from "refractor/lang/julia";
import kotlin from "refractor/lang/kotlin";
import python from "refractor/lang/python";
import markup from "refractor/lang/markup";
import javascript from "refractor/lang/javascript";
import typescript from "refractor/lang/typescript";

import { CodeBlockExtension } from "remirror/extensions";

import type { IExtensionFunction } from "./typing";
import { CodeLanguageSelectionModal } from "./components/CodeLanguageSelectionModal";

export interface ICodeExtensionConfig {}

export interface ICodeExtensionState {
  modalOpen: boolean;
}

const extension: IExtensionFunction<
  "jbcz.base.code",
  ICodeExtensionConfig,
  ICodeExtensionState
> = () => ({
  id: "jbcz.base.code",
  initialize: () =>
    new CodeBlockExtension({
      supportedLanguages: [
        r,
        json,
        yaml,
        ruby,
        julia,
        kotlin,
        python,
        markup,
        javascript,
        typescript
      ]
    }),
  getIcon: () => "</>",
  getName: () => "Code",
  getActive: (a) => a.codeBlock(),
  initialState: { modalOpen: false },
  onIconClick: (_, __, setState) => setState({ modalOpen: true }),
  AdditionalContent: CodeLanguageSelectionModal
});

export default extension;
