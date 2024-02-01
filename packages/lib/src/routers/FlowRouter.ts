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

export const buildFlowRouter =
  (quitFlowHelper: () => void) =>
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
        return {
          ...router.getInitialState(params),
          flowIndex: 0,
        };
      },

      getStateForAction(state, action, options) {
        switch (action.type) {
          case "NEXT_STEP":
            // TODO: handle case can't go next
            return {
              ...state,
              flowIndex: state.flowIndex + 1, // changing index didn't work, didn't search why
            };

          case "BACK_STEP":
            // TODO: handle case can't go previous
            return {
              ...state,
              flowIndex: state.flowIndex - 1,
            };

          case "QUIT_FLOW":
            /**
             * We didn't succeed defining this function in here, so we imported it from the parent.
             * To define this function here, an idea we had was to send POP_TO_TOP and GO_BACK events
             * But those events don't work on the first page of the stack. They return null, and makes our action falls on the parent. But our action (QUIT_FLOW) does not exist on the parent, which probably is a StackNavigator, and not a FlowNavigator.
             */
            quitFlowHelper();

            return state;
          default:
            return router.getStateForAction(state, action, options);
        }
      },

      getStateForRouteNamesChange(
        state,
        { routeNames }
      ) {
        // TODO: handle edge cases, like if there are no routes left
        const builtRoutes = state.routeNames.slice(0, state.flowIndex)

        const removedRoutes = state.routeNames.filter(routeName => !routeNames.includes(routeName) && builtRoutes.includes(routeName))

        let newFlowIndex = state.flowIndex;
        
        if(removedRoutes.length >0){
          newFlowIndex = newFlowIndex - 1
        }

        return {
          ...state,
          routeNames,
          flowIndex: newFlowIndex,
        };
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
      },
    };
  };
