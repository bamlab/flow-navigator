import React from 'react';
import {useFlow} from 'flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';

export const Step32Page = () => {
  const {goPreviousStep, goNextStep} = useFlow();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 3.2</Text>
      <FlowInfos />
      <Button title="next" onPress={goNextStep} />
      <Button title="back" onPress={goPreviousStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 30,
  },
});
