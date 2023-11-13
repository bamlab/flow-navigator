import {useFlow} from 'flow-navigator';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const FlowInfos = () => {
  const {canGoPreviousStep, canGoNextStep, currentStep, progress} = useFlow();

  return (
    <>
      <Text style={styles.flowInfos}>progress: {progress}</Text>
      <Text style={styles.flowInfos}>CurrentStep: {currentStep}</Text>
      <Text style={styles.flowInfos}>
        canGoPreviousStep: {`${canGoPreviousStep}`}
      </Text>
      <Text style={styles.flowInfos}>canGoNextStep: {`${canGoNextStep}`}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  flowInfos: {
    fontSize: 18,
  },
});
