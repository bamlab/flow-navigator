import React from 'react';
import {useFlow} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';

export const Step5Page = () => {
  const {goToPreviousStep} = useFlow();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 5</Text>
      <FlowInfos />
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
