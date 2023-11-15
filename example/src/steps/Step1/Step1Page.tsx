import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {ParamListBase, useNavigation} from '@react-navigation/native';

export const Step1Page = () => {
  const {goToNextStep, quitFlow} =
    useNavigation<FlowNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 1</Text>
      <FlowInfos />
      <Button title="quit flow" onPress={quitFlow} />
      <Button title="next" onPress={() => goToNextStep()} />
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
