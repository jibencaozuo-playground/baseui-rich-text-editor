import * as React from "react";
import cn from "classnames";
import merge from "lodash.merge";

import { useMap } from "@react-hookz/web";

import {
  Remirror,
  EditorComponent,
  useRemirror,
  useActive,
  useHelpers,
  useCommands,
  UseRemirrorReturn,
} from "@remirror/react";
import type { RemirrorJSON, AnyExtension } from "@remirror/core";

import { Block } from "baseui/block";
import { Button, ButtonOverrides } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";

import type { IExtension } from "./extensions/typing";
import styles from "./editor.module.scss";

export interface EditorChangeEvent {
  target: IEditorRef;
  currentTarget: IEditorRef;
  type: "change";
}

export interface IEditorProps {
  name?: string;
  extensions: Readonly<IExtension<string, any, any>[]>;
  onChange?: (event: EditorChangeEvent) => void;
  editorClassName?: string;
  buttonOverrides?: ButtonOverrides;
}

export interface IEditorRef {
  value: RemirrorJSON;
  type: "richtext",
  name?: string,
}

const _Editor: React.ForwardRefRenderFunction<IEditorRef, IEditorProps> = (
  { extensions = [], editorClassName, buttonOverrides, onChange, name },
  ref
) => {
  const remirrorExtensions = React.useCallback(() => {
    return extensions
      .map((x) => x.initialize?.())
      .filter((x) => !!x) as AnyExtension[];
  }, [extensions]);

  const internalEditorRef = React.useRef<IInternalEditorRef>(null);

  const { manager, state, setState } = useRemirror({
    extensions: remirrorExtensions,
  });

  const [initValue, setInitValue] = React.useState<boolean>(false);
  const [blockFirstOnChange, setBlockFirstOnChange] = React.useState<boolean>(true);

  // rhf gets the value from ref after receiving the onchange
  const stateRef = React.useRef<UseRemirrorReturn<AnyExtension>["state"] | null>();

  const mockElement = React.useMemo(() => {
    return {
      get value() {
        return stateRef?.current?.doc?.toJSON() || internalEditorRef?.current?.getJSON?.()
      },
      set value(x) {
        const newState = manager.createState({ content: x })
        stateRef.current = newState
        if(initValue) {
          setState(newState);
        } else {
          setInitValue(true)
          window.setTimeout(() => {
            setState(newState);
          }, 0)
        }
      },
      type: "richtext" as const,
      name,
    };
  }, [name, initValue, setState, manager]);

  React.useImperativeHandle(ref, () => mockElement, [mockElement]);

  const handleChange = React.useCallback((parameter) => {
    setState(parameter.state);
    stateRef.current = parameter.state;
    if(!blockFirstOnChange) {
      onChange?.({
        target: mockElement,
        currentTarget: mockElement,
        type: "change",
      });
    } else {
      setBlockFirstOnChange(false)
    }
  }, [setState, blockFirstOnChange, onChange, mockElement]);

  return (
    <Remirror
      manager={manager}
      state={state}
      onChange={handleChange}
    >
      <InternalEditor
        ref={internalEditorRef}
        extensions={extensions}
        editorClassName={editorClassName}
        buttonOverrides={buttonOverrides}
      />
    </Remirror>
  );
};

export const Editor = React.forwardRef(_Editor);

interface IInternalEditorProps {
  extensions: IEditorProps["extensions"];
  editorClassName?: string;
  buttonOverrides?: ButtonOverrides;
}

interface IInternalEditorRef {
  getJSON: ReturnType<typeof useHelpers>["getJSON"];
}

const _InternalEditor: React.ForwardRefRenderFunction<
  IInternalEditorRef,
  IInternalEditorProps
> = ({ extensions = [], editorClassName, buttonOverrides }, ref) => {
  const active = useActive();
  const commands = useCommands();
  const { getJSON } = useHelpers();

  React.useImperativeHandle(ref, () => ({ getJSON }), [getJSON]);

  const initialState = React.useMemo(() => {
    return extensions.map((extension) => {
      return [extension.id, Object.assign({}, extension.initialState)] as const;
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

  const baseButtonOverrides = React.useMemo<ButtonOverrides>(() => {
    return merge(
      {
        BaseButton: {
          style: {
            width: "48px",
            height: "28px",
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            color: "#C4C4C4",
            ":hover": {
              color: "#00ABCF",
            },
          },
        },
      },
      buttonOverrides
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonOverrides]);

  return (
    <Block
      backgroundColor="backgroundTertiary"
      overrides={{
        Block: {
          style: ({ $theme }) => ({
            "--overrides-rmr-radius-border": "0",
            "--overrides-rmr-color-text": $theme.colors.primary,
          }),
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
              overrides={baseButtonOverrides}
              type="button"
            >
              {x.getIcon()}
            </Button>
          </ButtonGroup>
        ))}
      </Block>
      <Block
        className={cn(
          editorClassName,
          "remirror-theme",
          styles.editorComponentBox
        )}
      >
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

const InternalEditor = React.forwardRef(_InternalEditor);
