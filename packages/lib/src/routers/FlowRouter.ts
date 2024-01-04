import {
  CommonNavigationAction,
  ParamListBase,
  Router,
  StackActionHelpers,
  StackActionType,
  StackRouter,
  StackRouterOptions,
} from "@react-navigation/native";
import { FlowNavigationState } from "../types/types";

export type FlowRouterOptions = StackRouterOptions;

export type FlowActionHelpers<ParamList extends ParamListBase> = {
  goToNextStep(): void;
  goToPreviousStep(): void;
  quitFlow(): void;
  enableRoute(routeName: Extract<keyof ParamList, string>): void;
  disableRoute(routeName: Extract<keyof ParamList, string>): void;
} & StackActionHelpers<ParamList>;

export type FlowActionType =
  | StackActionType
  | {
      type: "NEXT_STEP";
      source?: string;
    }
  | {
      type: "BACK_STEP";
      source?: string;
    }
  | {
      type: "QUIT_FLOW";
      source?: string;
    }
  | {
      type: "ENABLE_ROUTE";
      source?: string;
      payload: { routeName: Extract<keyof ParamListBase, string> };
    }
  | {
      type: "DISABLE_ROUTE";
      source?: string;
      payload: { routeName: Extract<keyof ParamListBase, string> };
    };


export const buildFlowRouter =
  (quitFlowHelper: () => void, initialDisabledRoutes: string[]) =>
  (
    options: FlowRouterOptions
  ): Router<
    FlowNavigationState<ParamListBase>,
    CommonNavigationAction | FlowActionType
  > => {
    const router = StackRouter(options) as unknown as Router<
      FlowNavigationState<ParamListBase>,
      FlowActionType | CommonNavigationAction
    >;

    return {
      ...router,

      getInitialState(params) {
        const { routeNames } = params;
        const availableRoutes = routeNames.filter(
          (routeName) =>
            !initialDisabledRoutes.find((disabledRoute) => disabledRoute === routeName)
        );

        return {
          ...router.getInitialState(params),
          availableRoutes,
        };
      },

      getStateForAction(state, action, options) {
        switch (action.type) {
          case "NEXT_STEP":
            const nextStepRouteName = state.availableRoutes[state.index + 1];

            if (!nextStepRouteName) {
              return null;
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
            const previousRouteName = state.availableRoutes[state.index - 1];

            if (!previousRouteName) {
              return null;
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

          case "QUIT_FLOW":
            /**
             * We didn't succeed defining this function in here, so we imported it from the parent.
             * To define this function here, an idea we had was to send POP_TO_TOP and GO_BACK events
             * But those events don't work on the first page of the stack. They return null, and makes our action falls on the parent. But our action (QUIT_FLOW) does not exist on the parent, which probably is a StackNavigator, and not a FlowNavigator.
             */
            quitFlowHelper();

            return state;

          case "ENABLE_ROUTE":
            const notOrdonnedAvailableRoutes = [
              ...state.availableRoutes,
              action.payload.routeName,
            ];

            const newAvailableRoutes = state.routeNames.filter((routeName: string) =>
              notOrdonnedAvailableRoutes.find(
                (newAvailableRoute) => routeName === newAvailableRoute
              )
            );

            return {
              ...state,
              availableRoutes: newAvailableRoutes,
            };

          case "DISABLE_ROUTE":
            return {
              ...state,
              availableRoutes: state.availableRoutes.filter(
                (routeName: string) => routeName !== action.payload.routeName
              ),
            };

          default:
            return router.getStateForAction(state, action, options);
        }
      },
      actionCreators: {
        ...router.actionCreators,
        goToNextStep: () => {
          return { type: "NEXT_STEP" };
        },
        goToPreviousStep: () => {
          return { type: "BACK_STEP" };
        },
        quitFlow: () => {
          return { type: "QUIT_FLOW" };
        },
        enableRoute: (routeName) => {
          return { type: "ENABLE_ROUTE", payload: {routeName} };
        },
        disableRoute: (routeName) => {
          return { type: "DISABLE_ROUTE", payload: {routeName} };
        },
      },
    };
  };
