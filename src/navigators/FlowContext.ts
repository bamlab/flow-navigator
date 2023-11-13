import React from "react";
import {
  NavigationState,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

export interface FlowContext {
  navigationState: NavigationState;
  goPreviousStep: () => void;
  goNextStep: () => void;
  getParent: () => NavigationProp<ParamListBase>;
}

export const FlowContext = React.createContext<FlowContext>({
  navigationState: null,
  getParent: null,
  goPreviousStep: null,
  goNextStep: null,
});

export const useFlowContext = () => React.useContext(FlowContext);
