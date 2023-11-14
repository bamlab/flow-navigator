import {useFlow} from '@bam.tech/flow-navigator';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const FlowInfos = () => {
  const {canGoToPreviousStep, canGoToNextStep, currentStep, progress} =
    useFlow();

  return (
    <>
      <Text style={styles.flowInfos}>progress: {progress}</Text>
      <Text style={styles.flowInfos}>CurrentStep: {currentStep}</Text>
      <Text style={styles.flowInfos}>
        canGoToPreviousStep: {`${canGoToPreviousStep}`}
      </Text>
      <Text style={styles.flowInfos}>
        canGoToNextStep: {`${canGoToNextStep}`}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  flowInfos: {
    fontSize: 18,
  },
});
