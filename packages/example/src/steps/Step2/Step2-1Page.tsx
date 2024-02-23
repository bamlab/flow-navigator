import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlowNavigationProp, useFlowStatus} from '@bam.tech/flow-navigator';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Step2StackParamList} from './Step2Navigator';
import {FlowInfos} from '../FlowInfos';

export const Step21Page = () => {
  const {navigate} = useNavigation<FlowNavigationProp<Step2StackParamList>>();
  const {goToPreviousStep, quitFlow} = useFlowStatus();

  const goToNext = () => {
    navigate('Step22');
  };

  const goBack = () => {
    goToPreviousStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 2.1</Text>
      <FlowInfos />
      <Button title="quit flow" onPress={quitFlow} />
      <Button title="next" onPress={goToNext} />
      <Button title="back" onPress={goBack} />
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
