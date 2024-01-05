import { useContext } from "react";
import { FlowContext } from "./FlowContext";

export const useFlowStatus = () => {
  const { navigationState, currentStepIndex } = useContext(FlowContext);

  return {
    currentStep: navigationState.availableRoutes[currentStepIndex],
    progress: currentStepIndex / navigationState.availableRoutes.length,
    canGoToPreviousStep: currentStepIndex !== 0,
    canGoToNextStep: currentStepIndex !== navigationState.availableRoutes.length - 1,
  };
};
