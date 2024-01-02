import * as React from "react";
import {
  createNavigatorFactory,
  ParamListBase,
  StackNavigationState,
  useNavigation,
  useNavigationBuilder,
} from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  NativeStackView,
} from "@react-navigation/native-stack";
import { NativeStackNavigatorProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import {
  FlowActionHelpers,
  FlowNavigationState,
  FlowRouterOptions,
  buildFlowRouter,
} from "../routers/FlowRouter";
import { FlowNavigationEventMap, FlowNavigationOptions } from "../types/types";
import { FlowContext } from "./FlowContext";

function FlowNavigator({
  id,
  initialRouteName,
  children,
  screenListeners,
  screenOptions,
  ...rest
}: NativeStackNavigatorProps) {
  const parentNavigation = useNavigation()

  const quitFlow = () => {
    parentNavigation?.goBack()
  }

  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
      FlowNavigationState<ParamListBase>,
      FlowRouterOptions,
      FlowActionHelpers<ParamListBase>,
      FlowNavigationOptions,
      FlowNavigationEventMap
    >(buildFlowRouter(quitFlow), {
      id,
      initialRouteName,
      children,
      screenListeners,
      screenOptions,
    });

  return (
    <FlowContext.Provider
      value={{
        navigationState: state,
      }}
    >
      <NavigationContent>
        <NativeStackView
          {...rest}
          state={state}
          navigation={navigation}
          descriptors={descriptors}
        />
      </NavigationContent>
    </FlowContext.Provider>
  );
}

export const createFlowNavigator = createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  typeof FlowNavigator
>(FlowNavigator);
