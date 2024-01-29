import {
  CommonNavigationAction,
  ParamListBase,
  Router,
  StackActionHelpers,
  StackActionType,
  StackRouter,
  StackRouterOptions,
} from "@react-navigation/native";
import { Config, FlowNavigationState, FormState } from "../types/types";

export type FlowRouterOptions = StackRouterOptions;

export type FlowActionHelpers<ParamList extends ParamListBase> = {
  goToNextStep(): void;
  goToPreviousStep(): void;
  quitFlow(): void;
  setStoreState(formState: FormState): void;
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
      type: "SET_STORE_STATE";
      source?: string;
      payload: { formState: Object };
    };

export const buildFlowRouter =
  (
    quitFlowHelper: () => void,
    {
      config,
      initialFormState,
    }: { config: Config<ParamListBase>; initialFormState: FormState }
  ) =>
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

        const disabledRouteNames = Object.entries(config)
          .filter(([_, isRouteNameEnabledCb]) => {
            return !isRouteNameEnabledCb(initialFormState);
          })
          .map(([routeName]) => routeName);

        const availableRoutes = routeNames.filter(
          (routeName) =>
            !disabledRouteNames.find(
              (disabledRoute) => disabledRoute === routeName
            )
        );

        return {
          ...router.getInitialState(params),
          availableRoutes,
          formState: initialFormState,
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

          case "SET_STORE_STATE":
            const newFormState = {
              ...state.formState,
              ...action.payload.formState,
            };

            const disabledRouteNames = Object.entries(config)
              .filter(([_, isRouteNameEnabledCb]) => {
                return !isRouteNameEnabledCb(newFormState);
              })
              .map(([routeName]) => routeName);

            const availableRoutes = state.routeNames.filter(
              (routeName) =>
                !disabledRouteNames.find(
                  (disabledRoute) => disabledRoute === routeName
                )
            );

            const builtRemovedRoute = disabledRouteNames.filter(
              (disabledRoute) =>
                state.routes.some((route) => route.name === disabledRoute)
            );

            const newRoutes = state.routes.filter(
              (route) =>
                !builtRemovedRoute.some(
                  (builtRemovedRoute) => builtRemovedRoute === route.name
                )
            );

            return {
              ...state,
              formState: {
                ...state.formState,
                ...action.payload.formState,
              },
              index: state.index - builtRemovedRoute.length,
              availableRoutes,
              routes: newRoutes,
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
        setStoreState: (formState) => {
          return { type: "SET_STORE_STATE", payload: { formState } };
        },
      },
    };
  };
