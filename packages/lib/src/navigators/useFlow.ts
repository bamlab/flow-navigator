import { useFlowContext } from "./FlowContext";

export const useFlowStatus = () => {
  const { navigationState } =
    useFlowContext();

  return {
    currentStep: navigationState.routeNames[navigationState.index],
    progress: navigationState.index / navigationState.routeNames.length, // TODO repair those numbers
    canGoToPreviousStep: navigationState.index !== 0,
    canGoToNextStep:
      navigationState.index !== navigationState.routeNames.length - 1,
  };
};
