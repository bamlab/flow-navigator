import {
  createNavigatorFactory,
  NavigationProp,
  NavigationState,
  ParamListBase,
  RouteProp,
  StackActionHelpers,
  StackNavigationState,
  StackRouter,
  StackRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  NativeStackView,
} from "@react-navigation/native-stack";
import { NativeStackNavigatorProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import * as React from "react";

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
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
> &
  FlowActionHelpers<ParamList>;

export type FlowActionHelpers<ParamList extends ParamListBase> = {
  goNextStep(): void;
  goPreviousStep(): void;
  quitFlow(): void;
} & StackActionHelpers<ParamList>;

const FlowRouter = (options) => {
  const router = StackRouter(options);

  return {
    ...router,
    getStateForAction(state, action, options) {
      switch (action.type) {
        case "NEXT_STEP":
          const nextStepRouteName = state.routeNames[state.index + 1];

          if (!nextStepRouteName) {
            console.error("COULD NOT FIND NEXT SCREEN FOR CURRENT ROUTE");
            return;
          }

          return router.getStateForAction(
            state,
            {
              type: "NAVIGATE",
              source: action.source,
              payload: { name: nextStepRouteName },
            },
            options
          );

        case "BACK_STEP":
          const previousRouteName = state.routeNames[state.index - 1];

          if (!previousRouteName) {
            console.error("COULD NOT FIND PREVIOUS SCREEN FOR CURRENT ROUTE");
            return;
          }

          return router.getStateForAction(
            state,
            {
              type: "NAVIGATE",
              source: action.source,
              payload: { name: previousRouteName },
            },
            options
          );

        default:
          return router.getStateForAction(state, action, options);
      }
    },
    actionCreators: {
      ...router.actionCreators,
      goNextStep: () => {
        return { type: "NEXT_STEP" };
      },
      goPreviousStep: () => {
        return { type: "BACK_STEP" };
      },
      quitFlow: () => {
        return { type: "GO_BACK" };
      },
    },
  };
};

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
      StackNavigationState<ParamListBase>,
      StackRouterOptions,
      FlowActionHelpers<ParamListBase>,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
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
