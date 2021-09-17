import * as React from "react";

import {
  Remirror,
  EditorComponent,
  useRemirror,
  useActive,
  useCommands
} from "@remirror/react";

import { Block } from "baseui/block";
import { Button, KIND as BUTTON_KIND } from "baseui/button";

import { EXTENSIONS } from "./extensions";

export const Editor = () => {
  const { manager } = useRemirror({ extensions: EXTENSIONS });

  return (
    <Remirror manager={manager}>
      <InternalEditor />
    </Remirror>
  );
};

export const InternalEditor = () => {
  const active = useActive();

  const c = useCommands();

  const handleToggleBold = React.useCallback(() => c.toggleBold(), [c]);
  const handleToggleItalic = React.useCallback(() => c.toggleItalic(), [c]);
  const handleToggleStrike = React.useCallback(() => c.toggleStrike(), [c]);
  const handleToggleSup = React.useCallback(() => c.toggleSuperscript(), [c]);
  const handleToggleSub = React.useCallback(() => c.toggleSubscript(), [c]);
  const handleToggleH1 = React.useCallback(
    () => c.toggleHeading({ level: 1 }),
    [c]
  );
  const handleToggleH2 = React.useCallback(
    () => c.toggleHeading({ level: 2 }),
    [c]
  );
  const handleToggleH3 = React.useCallback(
    () => c.toggleHeading({ level: 3 }),
    [c]
  );
  const handleToggleUl = React.useCallback(() => c.toggleBulletList(), [c]);
  const handleToggleOl = React.useCallback(() => c.toggleOrderedList(), [c]);
  const handleToggleQuote = React.useCallback(() => c.toggleBlockquote(), [c]);
  const handleToggleCode = React.useCallback(
    () => c.toggleCodeBlock({ language: "typescript" }),
    [c]
  );
  const handleAddHr = React.useCallback(() => c.insertHorizontalRule(), [c]);
  const handleAddLink = React.useCallback(
    () => c.updateLink({ href: "https://google.com" }),
    [c]
  );
  const handleAddPicture = React.useCallback(
    () =>
      c.insertImage({ src: `https://picsum.photos/200/300?${Math.random}` }),
    [c]
  );

  return (
    <Block>
      <Block>
        <Button
          onClick={handleToggleBold}
          kind={active.bold() ? BUTTON_KIND.primary : BUTTON_KIND.secondary}
        >
          B
        </Button>
        <Button
          onClick={handleToggleItalic}
          kind={active.italic() ? BUTTON_KIND.primary : BUTTON_KIND.secondary}
        >
          I
        </Button>
        <Button
          onClick={handleToggleStrike}
          kind={active.strike() ? BUTTON_KIND.primary : BUTTON_KIND.secondary}
        >
          S
        </Button>
        <Button
          onClick={handleToggleSup}
          kind={active.sup() ? BUTTON_KIND.primary : BUTTON_KIND.secondary}
        >
          ^
        </Button>
        <Button
          onClick={handleToggleSub}
          kind={active.sub() ? BUTTON_KIND.primary : BUTTON_KIND.secondary}
        >
          _
        </Button>
        <Button
          onClick={handleToggleH1}
          kind={
            active.heading({ level: 1 })
              ? BUTTON_KIND.primary
              : BUTTON_KIND.secondary
          }
        >
          H<sub>1</sub>
        </Button>
        <Button
          onClick={handleToggleH2}
          kind={
            active.heading({ level: 2 })
              ? BUTTON_KIND.primary
              : BUTTON_KIND.secondary
          }
        >
          H<sub>2</sub>
        </Button>
        <Button
          onClick={handleToggleH3}
          kind={
            active.heading({ level: 3 })
              ? BUTTON_KIND.primary
              : BUTTON_KIND.secondary
          }
        >
          H<sub>3</sub>
        </Button>
        <Button
          onClick={handleToggleUl}
          kind={
            active.bulletList() ? BUTTON_KIND.primary : BUTTON_KIND.secondary
          }
        >
          ul
        </Button>
        <Button
          onClick={handleToggleOl}
          kind={
            active.orderedList() ? BUTTON_KIND.primary : BUTTON_KIND.secondary
          }
        >
          ol
        </Button>
        <Button
          onClick={handleToggleQuote}
          kind={
            active.blockquote() ? BUTTON_KIND.primary : BUTTON_KIND.secondary
          }
        >
          ""
        </Button>
        <Button
          onClick={handleToggleCode}
          kind={
            active.codeBlock() ? BUTTON_KIND.primary : BUTTON_KIND.secondary
          }
        >
          {"</>"}
        </Button>
        <Button onClick={handleAddHr} kind={BUTTON_KIND.secondary}>
          {"hr"}
        </Button>
        <Button onClick={handleAddLink} kind={BUTTON_KIND.secondary}>
          {"Link"}
        </Button>
        <Button onClick={handleAddPicture} kind={BUTTON_KIND.secondary}>
          {"Img"}
        </Button>
      </Block>
      <Block className="remirror-theme">
        <EditorComponent />
      </Block>
    </Block>
  );
};
