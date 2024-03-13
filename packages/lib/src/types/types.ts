import {
  DefaultNavigatorOptions,
  NavigationState,
  ParamListBase,
  StackRouterOptions,
} from "@react-navigation/native";
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { NativeStackNavigationConfig } from "@react-navigation/native-stack/lib/typescript/src/types";

export type FlowNavigationOptions = NativeStackNavigationOptions;

export type FlowNavigationEventMap = NativeStackNavigationEventMap;

export type FlowNavigationState<ParamList extends ParamListBase> =
  NavigationState<ParamList> & {
    // type: "flow"; : TODO add flow type and key
  };

export type FlowNavigatorProps = DefaultNavigatorOptions<
  ParamListBase,
  FlowNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
> &
  StackRouterOptions &
  NativeStackNavigationConfig

export type FlowStackNavigationOptions = NativeStackNavigationOptions
