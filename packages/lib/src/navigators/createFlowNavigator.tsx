import * as React from "react";
import {
  createNavigatorFactory,
  ParamListBase,
  useNavigation,
  useNavigationBuilder,
} from "@react-navigation/native";
import {
  NativeStackNavigationEventMap,
  NativeStackView,
} from "@react-navigation/native-stack";
import {
  FlowActionHelpers,
  FlowRouterOptions,
  buildFlowRouter,
} from "../routers/FlowRouter";
import { FlowNavigationEventMap, FlowNavigationOptions, FlowNavigationState, FlowNavigatorProps, FlowStackNavigationOptions } from "../types/types";
import { FlowContext } from "./FlowContext";

function FlowNavigator({
  id,
  initialRouteName,
  children,
  screenListeners,
  screenOptions,
  disabledRoutes,
  ...rest
}: FlowNavigatorProps) {
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
    >(buildFlowRouter(quitFlow, disabledRoutes), {
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
  FlowNavigationState<ParamListBase>,
  FlowStackNavigationOptions,
  NativeStackNavigationEventMap,
  typeof FlowNavigator
>(FlowNavigator);
