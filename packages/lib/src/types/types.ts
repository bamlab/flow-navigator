import {
  DefaultNavigatorOptions,
  NavigationProp,
  NavigationState,
  ParamListBase,
  RouteProp,
  StackNavigationState,
  StackRouterOptions,
} from "@react-navigation/native";
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { NativeStackNavigationConfig } from "@react-navigation/native-stack/lib/typescript/src/types";

export type FlowNavigationOptions = NativeStackNavigationOptions;

export type FlowNavigationEventMap = NativeStackNavigationEventMap;

export type FlowScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
  NavigatorID extends string | undefined = undefined
> = {
  navigation: FlowNavigationProp<ParamList, RouteName, NavigatorID>;
  route: RouteProp<ParamList, RouteName>;
};

export type FlowNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
  NavigatorID extends string | undefined = undefined
> = NavigationProp<
  ParamList,
  RouteName,
  NavigatorID,
  StackNavigationState<ParamList>,
  FlowNavigationOptions,
  FlowNavigationEventMap
>

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
