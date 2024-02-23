import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlowNavigationProp, useFlow} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Step2StackParamList} from './Step2Navigator';
import {FlowInfos} from '../FlowInfos';
import {useAtom} from 'jotai';
import {hasToPassStep3Atom} from '../../globalStates/hasToPassStep3';

export const Step22Page = () => {
  const {goBack} = useNavigation<FlowNavigationProp<Step2StackParamList>>();
  const {goToNextStep} = useFlow();

  const [_, setHasToPassStep3] = useAtom(hasToPassStep3Atom);

  const onNextPress = () => {
    setHasToPassStep3(true);
    goToNextStep();
  };

  const onBackPress = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 2.2</Text>
      <FlowInfos />
      <Button title="next" onPress={onNextPress} />
      <Button title="back" onPress={onBackPress} />
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
