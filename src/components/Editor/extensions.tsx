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

import {
  HistoryExtension,
  BoldExtension,
  ItalicExtension,
  StrikeExtension,
  SupExtension,
  SubExtension,
  HeadingExtension,
  BulletListExtension,
  OrderedListExtension,
  BlockquoteExtension,
  CodeBlockExtension,
  HorizontalRuleExtension,
  LinkExtension,
  ImageExtension
} from "remirror/extensions";

import type { AnyExtension } from "remirror";

export const EXTENSIONS = () =>
  [
    new HistoryExtension(),
    //
    new BoldExtension(),
    new ItalicExtension(),
    new StrikeExtension(),
    new SupExtension(),
    new SubExtension(),
    new HeadingExtension(),
    //
    new BulletListExtension(),
    new OrderedListExtension(),
    new BlockquoteExtension(),
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
    new HorizontalRuleExtension(),
    new LinkExtension({ autoLink: true }),
    new ImageExtension({ enableResizing: true })
  ] as AnyExtension[];
