import React from 'react';
import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {ParamListBase, useNavigation} from '@react-navigation/native';

export const Step31Page = () => {
  const {goToPreviousStep, goToNextStep} =
    useNavigation<FlowNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 3.1</Text>
      <FlowInfos />
      <Button title="next" onPress={goToNextStep} />
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
