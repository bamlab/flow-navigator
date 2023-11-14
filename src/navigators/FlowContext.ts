import React from "react";
import {
  NavigationState,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

export interface FlowContext {
  navigationState: NavigationState;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  getParent: () => NavigationProp<ParamListBase>;
}

export const FlowContext = React.createContext<FlowContext>(undefined as any);

export const useFlowContext = () => React.useContext(FlowContext);
