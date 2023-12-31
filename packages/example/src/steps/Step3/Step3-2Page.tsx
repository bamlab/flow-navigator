import React from 'react';
import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {ParamListBase, useNavigation} from '@react-navigation/native';

export const Step32Page = () => {
  const {goToPreviousStep, goToNextStep, disableRoute} =
    useNavigation<FlowNavigationProp<ParamListBase>>();

  const onNextPress = () => {
    goToNextStep();
    disableRoute('Step32');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 3.2</Text>
      <FlowInfos />
      <Button title="next" onPress={onNextPress} />
      <Button title="back" onPress={goToPreviousStep} />
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
