import { useState, useRef, useEffect, useContext } from "react";
import { FlowContext } from "./FlowContext";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { FlowActionHelpers } from "../routers/FlowRouter";

export const useFlowStatus = () => {
  const { navigationState, currentStepIndex } = useContext(FlowContext);

  const { goToNextStep, goToPreviousStep, quitFlow } = useFlowHelpers();

  return {
    currentStep: navigationState.routeNames[currentStepIndex],
    progress: currentStepIndex / navigationState.routeNames.length,
    canGoToPreviousStep: currentStepIndex !== 0,
    canGoToNextStep: currentStepIndex !== navigationState.routeNames.length - 1,
    goToNextStep,
    goToPreviousStep,
    quitFlow,
  };
};

const useFlowHelpers = () => {
  const { goToNextStep, goToPreviousStep, quitFlow } =
    useNavigation<FlowActionHelpers<ParamListBase>>();

  const { waitForRerender } = useWaitForRerender();

  const asyncGoToNextStep = () => waitForRerender(goToNextStep);
  const asyncGoToPreviousStep = () => waitForRerender(goToPreviousStep);

  return {
    goToNextStep: asyncGoToNextStep,
    goToPreviousStep: asyncGoToPreviousStep,
    quitFlow,
  };
};

/**
 * If a condition to display one step was changed just before calling goToNext or goToPrevious,
 * we need to make sure the state was updated, and the navigator re-render,
 * to ensure the routeNames in the navigationState are not outdated
 *
 * See this issue for more details: https://github.com/react-navigation/react-navigation/discussions/11839#discussioncomment-8549314
 * */
const useWaitForRerender = () => {
  const [runAfterRendered, setRunAfterRendered] = useState(false);
  const callback = useRef(() => {});

  useEffect(() => {
    if (runAfterRendered) {
      callback.current?.();
      setRunAfterRendered(false);
    }
  }, [runAfterRendered]);

  const waitForRerender = (newCallback: () => void) => {
    callback.current = newCallback;
    setRunAfterRendered(true);
  };

  return { waitForRerender };
};
