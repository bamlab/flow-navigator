import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  StackNavigationState,
} from "@react-navigation/native";
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { FlowActionHelpers } from "../routers/FlowRouter";

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
> &
  FlowActionHelpers<ParamList>;