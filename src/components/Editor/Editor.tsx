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
import { ButtonGroup, ButtonGroupOverrides } from "baseui/button-group";
import { mergeOverrides } from "baseui";

import type { IExtension } from "./extensions/typing";
import styles from "./editor.module.scss";
import { ModalOverrides } from "baseui/modal";
import { StyleObject } from "styletron-react";
import { Overrides } from "baseui/overrides";

export interface EditorChangeEvent {
  target: IEditorRef;
  currentTarget: IEditorRef;
  type: "change";
}

export interface IInterfaceOverride {
  ToolbarBlock?: ButtonGroupOverrides;
  ToolbarButton?: ButtonOverrides;
  ReselectImageButton?: ButtonOverrides;
  EditorContainer?: StyleObject;
  Model?: ModalOverrides;
  ModalButton?: ButtonOverrides;
}

export interface IInterfaceEvents {
  onImageUpload?: (blobURL: string) => Promise<string>;
}

export interface IEditorProps {
  name?: string;
  extensions: Readonly<IExtension<string, any, any>[]>;
  onChange?: (event: EditorChangeEvent) => void;
  onWordCountChange?: (count: number) => void;
  editorClassName?: string;
  editable?: boolean;
  overrides?: IInterfaceOverride;
  events?: IInterfaceEvents;
}

export interface IEditorRef {
  value: RemirrorJSON;
  type: "richtext",
  name?: string,
}

const StylesContext = React.createContext<IInterfaceOverride>({});
export const EventsContext = React.createContext<IInterfaceEvents | undefined>({});

const _Editor: React.ForwardRefRenderFunction<IEditorRef, IEditorProps> = (
  {
    extensions = [],
    editorClassName,
    onChange,
    onWordCountChange,
    name,
    overrides = {},
    editable = true,
    events,
  },
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
    onWordCountChange?.(internalEditorRef?.current?.getText({ state: parameter.state }).length || 0)
  }, [
    setState,
    blockFirstOnChange,
    onWordCountChange,
    onChange,
    mockElement
  ]);

  return (
    <StylesContext.Provider value={overrides}>
      <EventsContext.Provider value={events}>
        <Remirror
          manager={manager}
          state={state}
          onChange={handleChange}
          editable={editable}
        >
          <InternalEditor
            ref={internalEditorRef}
            extensions={extensions}
            editorClassName={editorClassName}
            overrides={overrides}
            editable={editable}
          />
        </Remirror>
      </EventsContext.Provider>
    </StylesContext.Provider>
  );
};

export const Editor = React.forwardRef(_Editor);

interface IInternalEditorProps {
  extensions: IEditorProps["extensions"];
  editorClassName?: string;
  editable?: boolean;
  overrides?: IInterfaceOverride;
}

interface IInternalEditorRef {
  getJSON: ReturnType<typeof useHelpers>["getJSON"];
  getText: ReturnType<typeof useHelpers>["getText"];
}

const _InternalEditor: React.ForwardRefRenderFunction<
  IInternalEditorRef,
  IInternalEditorProps
> = ({ extensions = [], editorClassName, overrides, editable }, ref) => {
  const active = useActive();
  const commands = useCommands();
  const { getJSON, getText } = useHelpers();

  React.useImperativeHandle(ref, () => ({ getJSON, getText }), [getJSON, getText ]);

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
    return mergeOverrides(
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
      (overrides?.ToolbarButton || {}) as Overrides<unknown>
    );
  }, [overrides]);

  return (
    <Block
      backgroundColor="backgroundTertiary"
      overrides={{
        Block: {
          style: ({ $theme }) => (merge(
            {
              "--overrides-rmr-radius-border": "0",
              "--overrides-rmr-color-text": $theme.colors.primary,
            },
            (overrides?.EditorContainer || {}) as Overrides<unknown>
          ) as any),
        },
      }}
    >
      {editable &&(
        <Block display="flex">
          {extensions.map((x) => (
            <ButtonGroup
              key={x.id}
              mode="checkbox"
              selected={x.getActive(active) ? [0] : []}
              overrides={overrides?.ToolbarBlock}
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
      )}
      <Block
        className={cn(
          "remirror-theme",
          styles.editorComponentBox,
          editorClassName,
        )}
      >
        <EditorComponent />
      </Block>
      {extensions.map((x) => {
        const Component = x.AdditionalContent;

        if (!Component) return null;

        return (
          <StylesContext.Consumer key={x.id}>
            {overrides => (
              <Component
                state={stateMap.get(x.id)}
                setState={setStates[x.id]}
                commands={commands}
                active={active}
                overrides={overrides}
              />
            )}
          </StylesContext.Consumer>
        );
      })}
    </Block>
  );
};

const InternalEditor = React.forwardRef(_InternalEditor);
