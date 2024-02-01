import * as React from "react";
import {
  createNavigatorFactory,
  NavigationContext,
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
import {
  FlowNavigationEventMap,
  FlowNavigationOptions,
  FlowNavigationState,
  FlowNavigatorProps,
  FlowStackNavigationOptions,
} from "../types/types";
import { FlowContext } from "./FlowContext";
import { StaticContainer } from "./fork/descriptorRender";
import { getRouteConfigsFromChildren } from "./fork/getRouteNames";

function FlowNavigator({
  id,
  initialRouteName,
  children,
  screenListeners,
  screenOptions,
  ...rest
}: FlowNavigatorProps) {
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

  const routeConfigs = getRouteConfigsFromChildren<
    State,
    ScreenOptions,
    EventMap
  >(children);

  // routeNames are calculated twice
  const screens = routeConfigs.reduce<
    Record<string, ScreenConfigWithParent<State, ScreenOptions, EventMap>>
  >((acc, config) => {
    if (config.props.name in acc) {
      throw new Error(
        `A navigator cannot contain multiple 'Screen' components with the same name (found duplicate screen named '${config.props.name}')`
      );
    }

    acc[config.props.name] = config;
    return acc;
  }, {});

  const routes = state.routeNames
    .slice(0, state.flowIndex + 1)
    .map((route) => ({
      key: `route${route}`,
      name: route,
    }));

  // descriptors is calculated twice
  const newDescriptors = routes.reduce((acc, route, i) => {
    acc[route.key] = {
      navigation,
      route,
      render: () => {
        const config = screens[route.name];
        const screen = config.props;

        const ScreenComponent = screen.getComponent
          ? screen.getComponent()
          : screen.component;

        // TODO: Make sure other components from original render are not useful
        return (
          <NavigationContext.Provider value={navigation}>
            <FlowContext.Provider
              value={{
                navigationState: state,
                currentStepIndex: i,
              }}
            >
              <StaticContainer
                name={screen.name}
                render={ScreenComponent || screen.children}
                navigation={navigation}
                route={route}
              >
                {ScreenComponent !== undefined ? (
                  <ScreenComponent navigation={navigation} route={route} />
                ) : screen.children !== undefined ? (
                  screen.children({ navigation, route })
                ) : null}
              </StaticContainer>
            </FlowContext.Provider>
          </NavigationContext.Provider>
        );
      },
      options: {},
    };
    return acc;
  }, {});

  const newState = { ...state, routes };

  return (
    <NavigationContent>
      <NativeStackView
        {...rest}
        state={newState}
        navigation={navigation}
        descriptors={newDescriptors}
      />
    </NavigationContent>
  );
}

export const createFlowNavigator = createNavigatorFactory<
  FlowNavigationState<ParamListBase>,
  FlowStackNavigationOptions,
  NativeStackNavigationEventMap,
  typeof FlowNavigator
>(FlowNavigator);
