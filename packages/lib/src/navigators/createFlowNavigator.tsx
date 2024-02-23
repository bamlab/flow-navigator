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
  const parentNavigation = useNavigation();

  const quitFlow = () => {
    parentNavigation?.goBack();
  };

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

  /**
   * In each page, we add the flow context (Just like for useRoute, we have to create one context per route so that each page statically has their values. If we simply added a context above all the screens and deduced the flow values from useNavigation, the values would change before the navigation animation is completed.)
   * We see two other ways this could be done without needing to mutate an object like that:
   * - Add the context inside NativeStackView, just like NavigationRouteContext, but we didn't want to duplicate too much of the code of the stack navigator.
   * - Calculate flow values from useNavigation and useRoute (state from useNavigation, current route index from useRoute). The code would be very straitfoward, but the progress indicator would be incorrect for subnavigators. Supporting subnavigators would lead to a code that didn't seem much better than those next few lines to us.
   */
  Object.entries(descriptors).forEach(([_, descriptor], index) => {
    const render = descriptor.render;

    descriptor.render = () => (
      <FlowContext.Provider
        value={{
          navigationState: state,
          currentStepIndex: index,
        }}
      >
        {render()}
      </FlowContext.Provider>
    );
  });

  return (
    <NavigationContent>
      <NativeStackView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  );
}

export const createFlowNavigator = createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  typeof FlowNavigator
>(FlowNavigator);
