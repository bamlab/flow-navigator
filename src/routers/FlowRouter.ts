import {
  CommonNavigationAction,
  ParamListBase,
  Router,
  StackActionHelpers,
  StackActionType,
  StackNavigationState,
  StackRouter,
  StackRouterOptions,
} from "@react-navigation/native";

export type FlowRouterOptions = StackRouterOptions;

export type FlowNavigationState<ParamList extends ParamListBase> =
  StackNavigationState<ParamList>;

export type FlowActionHelpers<ParamList extends ParamListBase> = {
  goToNextStep(): void;
  goPreviousStep(): void;
  quitFlow(): void;
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
    };

export const FlowRouter = (
  options: FlowRouterOptions
): Router<
  StackNavigationState<ParamListBase>,
  CommonNavigationAction | FlowActionType
> => {
  const router = StackRouter(options);

  return {
    ...router,
    getStateForAction(state, action, options) {
      switch (action.type) {
        case "NEXT_STEP":
          const nextStepRouteName = state.routeNames[state.index + 1];

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
          const previousRouteName = state.routeNames[state.index - 1];

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

        default:
          return router.getStateForAction(state, action, options);
      }
    },
    actionCreators: {
      ...router.actionCreators,
      goToNextStep: () => {
        return { type: "NEXT_STEP" };
      },
      goPreviousStep: () => {
        return { type: "BACK_STEP" };
      },
    },
  };
};
