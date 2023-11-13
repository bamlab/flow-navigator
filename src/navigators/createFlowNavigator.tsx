import * as React from "react";
import {
  createNavigatorFactory,
  ParamListBase,
  StackNavigationState,
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
  FlowRouter,
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
  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
      FlowNavigationState<ParamListBase>,
      FlowRouterOptions,
      FlowActionHelpers<ParamListBase>,
      FlowNavigationOptions,
      FlowNavigationEventMap
    >(FlowRouter, {
      id,
      initialRouteName,
      children,
      screenListeners,
      screenOptions,
    });

  const { goPreviousStep, goNextStep, getParent } = navigation;

  return (
    <FlowContext.Provider
      value={{
        navigationState: state,
        goPreviousStep,
        goNextStep,
        getParent,
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
