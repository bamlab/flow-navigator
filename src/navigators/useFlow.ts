import { useFlowContext } from "./FlowContext";

export const useFlow = () => {
  const { navigationState, goNextStep, goPreviousStep, getParent } =
    useFlowContext();

  return {
    currentStep: navigationState.routeNames[navigationState.index],
    progress: navigationState.index / navigationState.routeNames.length,
    canGoPreviousStep: navigationState.index !== 0,
    canGoNextStep:
      navigationState.index !== navigationState.routeNames.length - 1,
    goNextStep,
    goPreviousStep,
    quitFlow: () => getParent().goBack(),
  };
};
