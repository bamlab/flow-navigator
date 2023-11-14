import { useFlowContext } from "./FlowContext";

export const useFlow = () => {
  const { navigationState, goToNextStep, goToPreviousStep, getParent } =
    useFlowContext();

  return {
    currentStep: navigationState.routeNames[navigationState.index],
    progress: navigationState.index / navigationState.routeNames.length,
    canGoPreviousStep: navigationState.index !== 0,
    canGoNextStep:
      navigationState.index !== navigationState.routeNames.length - 1,
    goToNextStep,
    goToPreviousStep,
    quitFlow: () => getParent().goBack(),
  };
};
