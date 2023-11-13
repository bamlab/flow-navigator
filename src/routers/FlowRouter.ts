import {
  ParamListBase,
  StackActionHelpers,
  StackNavigationState,
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
