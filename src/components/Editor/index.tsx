import * as React from "react";
import { useMap } from "@react-hookz/web";

import {
  Remirror,
  EditorComponent,
  useRemirror,
  useActive,
  useCommands
} from "@remirror/react";

import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";

import type { IExtension } from "./extensions/typing";
import { AnyExtension } from "@remirror/core";

import styles from './editor.module.scss';
import cn from 'classnames'
import { useStyletron } from 'baseui';

interface IEditorProps {
  extensions: Readonly<IExtension<string, any, any>[]>;
}

export const Editor: React.FC<IEditorProps> = ({ extensions }) => {
  const remirrorExtensions = React.useCallback(() => {
    return extensions
      .map((x) => x.initialize?.())
      .filter((x) => !!x) as AnyExtension[];
  }, [extensions]);

  const { manager } = useRemirror({ extensions: remirrorExtensions });

  return (
    <Remirror manager={manager}>
      <InternalEditor extensions={extensions} />
    </Remirror>
  );
};

interface IInternalEditorProps {
  extensions: IEditorProps["extensions"];
}

export const InternalEditor: React.FC<IInternalEditorProps> = ({
  extensions
}) => {
  const active = useActive();
  const commands = useCommands();
  const [css, theme] = useStyletron();

  const initialState = React.useMemo(() => {
    return extensions.map((extension) => {
      return [
        extension.id, 
        Object.assign({}, extension.initialState)
      ] as const;
    });
  }, [extensions]);

  const stateMap = useMap<string, any>(initialState);

  const setStates = React.useMemo(() => {
    const result: Record<string, (x: any) => void> = {};

    extensions.forEach((extension) => {
      result[extension.id] = (state: any) => {
        stateMap.set(extension.id, state);
      };
    });

    return result;
  }, [extensions, stateMap]);

  const handleButtonClickCallbacks = React.useMemo(() => {
    const result: Record<string, () => void> = {};

    extensions.forEach((extension) => {
      result[extension.id] = () => {
        extension.onIconClick(
          commands,
          stateMap.get(extension.id),
          setStates[extension.id]
        );
      };
    });

    return result;
  }, [commands, extensions, setStates, stateMap]);

  const baseButtonStyle = {
    width: '48px',
    height: '28px',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    color: '#C4C4C4',
    ':hover': {
      color: '#00ABCF',
    }
  }

  return (
    <Block
      backgroundColor="backgroundTertiary"
      overrides={{
        Block: {
          style: {
            '--overrides-rmr-radius-border': '0',
            '--overrides-rmr-color-text': theme.colors.primary,
          },
        },
      }}
    >
      <Block display="flex">
        {extensions.map((x) => (
          <ButtonGroup
            key={x.id}
            mode="checkbox"
            selected={x.getActive(active) ? [0] : []}
          >
            <Button
              onClick={handleButtonClickCallbacks[x.id]}
              overrides={{
                BaseButton: {
                  style: baseButtonStyle
                }
              }}
            >
              {x.getIcon()}
            </Button>
          </ButtonGroup>
        ))}
      </Block>
      <Block className={cn('remirror-theme', styles.editorComponentBox)}>
        <EditorComponent />
      </Block>
      {extensions.map((x) => {
        const Component = x.AdditionalContent;

        if (!Component) return null;

        return (
          <Component
            key={x.id}
            state={stateMap.get(x.id)}
            setState={setStates[x.id]}
            commands={commands}
            active={active}
          />
        );
      })}
    </Block>
  );
};
