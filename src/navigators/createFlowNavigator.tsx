import * as React from "react";
import {
  createNavigatorFactory,
  NavigationProp,
  NavigationState,
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

export interface FlowContext {
  navigationState: NavigationState;
  goPreviousStep: () => void;
  goNextStep: () => void;
  getParent: () => NavigationProp<ParamListBase>;
}

export const FlowContext = React.createContext<FlowContext>({
  navigationState: null,
  goPreviousStep: () => {},
  goNextStep: () => {},
  getParent: null,
});

export const useFlowContext = () => React.useContext(FlowContext);

export const useFlow = () => {
  const { navigationState, goNextStep, goPreviousStep, getParent } =
    useFlowContext();

  return {
    currentStep: navigationState.routeNames[navigationState.index],
    progress: navigationState.index / navigationState.routeNames.length,
    canGoPreviousStep: navigationState.index !== 0,
    canGoNextStep:
      navigationState.index !== navigationState.routeNames.length - 1,
    goNextStep,
    goPreviousStep,
    quitFlow: () => getParent().goBack(),
  };
};
