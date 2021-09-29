import * as React from "react";
import { useMap } from "@react-hookz/web";

import {
  Remirror,
  EditorComponent,
  useRemirror,
  useActive,
  useCommands
} from "@remirror/react";
import type { EditorState } from "@remirror/core";

import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import type { IExtension } from "./extensions/typing";
import { AnyExtension } from "@remirror/core";

interface EditorChangeEvent {
  target: IEditorRef;
  currentTarget: IEditorRef;
}

interface IEditorProps {
  extensions?: Readonly<IExtension<string, any, any>[]>;
  onChange?: (event: EditorChangeEvent) => void;
}

interface IEditorRef {
  value: EditorState;
}

const _Editor: React.ForwardRefRenderFunction<IEditorRef, IEditorProps> = ({
  extensions = [],
  onChange
}, ref) => {
  const remirrorExtensions = React.useCallback(() => {
    return extensions
      .map((x) => x.initialize?.())
      .filter((x) => !!x) as AnyExtension[];
  }, [extensions]);

  const { manager, state, setState } = useRemirror({
    extensions: remirrorExtensions
  });

  const mockValue = React.useMemo(() => {
    return {
      get value() {
        return state;
      },
      set value(x) {
        setState(x);
      }
    };
  }, [state, setState]);

  React.useImperativeHandle(ref, () => mockValue, [mockValue]);

  const handleChange = () => {
    onChange?.({
      target: mockValue,
      currentTarget: mockValue
    });
  };

  return (
    <Remirror manager={manager} onChange={handleChange}>
      <InternalEditor extensions={extensions} />
    </Remirror>
  );
};

export const Editor = React.forwardRef(_Editor);

interface IInternalEditorProps {
  extensions: IEditorProps["extensions"];
}

export const InternalEditor: React.FC<IInternalEditorProps> = ({
  extensions = []
}) => {
  const active = useActive();
  const commands = useCommands();

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

  return (
    <Block>
      <Block display="flex">
        {extensions.map((x) => (
          <ButtonGroup
            key={x.id}
            mode="checkbox"
            selected={x.getActive(active) ? [0] : []}
          >
            <Button onClick={handleButtonClickCallbacks[x.id]}>
              {x.getIcon()}
            </Button>
          </ButtonGroup>
        ))}
      </Block>
      <Block className="remirror-theme">
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
