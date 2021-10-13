import * as React from "react";

import type { useActive, useCommands } from "@remirror/react";
import type { AnyExtension } from "@remirror/core";

import type { IInterfaceOverride } from "../../Editor"
import type { IInterfaceEvents } from "../../Editor"

export interface IAdditionalComponentProps<State> {
  commands: ReturnType<typeof useCommands>;
  active: ReturnType<typeof useActive>;
  state: State;
  setState: (x: State) => void;
  overrides?: IInterfaceOverride;
  events?: IInterfaceEvents;
}

export interface IExtension<Id extends string, Config = void, State = void> {
  id: Id;
  initialize?: () => AnyExtension | void;
  getIcon: () => React.ReactNode;
  getName: () => string;
  AdditionalContent?: React.FC<IAdditionalComponentProps<State>>;
  getActive: (active: ReturnType<typeof useActive>) => boolean;
  initialState?: State,
  onIconClick: (
    commands: ReturnType<typeof useCommands>,
    state: State,
    setState: (x: State) => void
  ) => void;
}

export type IExtensionFunction<
  Id extends string,
  Config = void,
  State = void
> = (config?: Config) => IExtension<Id, Config, State>;

export type IExtensionIndexItem = <
  Id extends string,
  Config,
  State
>() => Promise<IExtension<Id, Config, State>>;
