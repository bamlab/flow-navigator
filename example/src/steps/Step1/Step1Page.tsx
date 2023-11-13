import {useFlow} from 'flow-navigator';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';

export const Step1Page = () => {
  const {goNextStep, quitFlow} = useFlow();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 1</Text>
      <FlowInfos />
      <Button title="quit flow" onPress={quitFlow} />
      <Button title="next" onPress={() => goNextStep()} />
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
