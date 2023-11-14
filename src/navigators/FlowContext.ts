import React from "react";
import {
  NavigationState,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

export interface FlowContext {
  navigationState: NavigationState;
  goPreviousStep: () => void;
  goToNextStep: () => void;
  getParent: () => NavigationProp<ParamListBase>;
}

export const FlowContext = React.createContext<FlowContext>(undefined as any);

export const useFlowContext = () => React.useContext(FlowContext);
