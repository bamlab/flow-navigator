import { useFlowContext } from "./FlowContext";

export const useFlow = () => {
  const { navigationState } =
    useFlowContext();

  return {
    currentStep: navigationState.routeNames[navigationState.index],
    progress: navigationState.index / navigationState.routeNames.length,
    canGoToPreviousStep: navigationState.index !== 0,
    canGoToNextStep:
      navigationState.index !== navigationState.routeNames.length - 1,
  };
};
