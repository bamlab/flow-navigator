import {
  ParamListBase,
  StackActionHelpers,
  StackNavigationState,
  StackRouter,
  StackRouterOptions,
} from "@react-navigation/native";

export type FlowRouterOptions = StackRouterOptions;

export type FlowNavigationState<ParamList extends ParamListBase> =
  StackNavigationState<ParamList>;

export type FlowActionHelpers<ParamList extends ParamListBase> = {
  goNextStep(): void;
  goPreviousStep(): void;
  quitFlow(): void;
} & StackActionHelpers<ParamList>;

export const FlowRouter = (options: FlowRouterOptions) => {
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
