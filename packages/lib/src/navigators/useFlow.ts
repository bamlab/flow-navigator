import { useContext } from "react";
import { FlowContext } from "./FlowContext";

export const useFlowStatus = () => {
  const { navigationState, currentStepIndex } = useContext(FlowContext);

  return {
    currentStep: navigationState.routeNames[currentStepIndex],
    progress: currentStepIndex / navigationState.routeNames.length,
    canGoToPreviousStep: currentStepIndex !== 0,
    canGoToNextStep: currentStepIndex !== navigationState.routeNames.length - 1,
  };
};
