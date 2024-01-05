import React from "react";
import {
  NavigationState,
} from "@react-navigation/native";

export interface FlowContext {
  navigationState: NavigationState;
  currentStepIndex: number;
}

export const FlowContext = React.createContext<FlowContext>(undefined as any);

export const useFlowContext = () => React.useContext(FlowContext);
