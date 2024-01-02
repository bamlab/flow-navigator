import React from 'react';
import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {hasToPassStep3Atom} from '../../globalStates/hasToPassStep3';
import {useAtom} from 'jotai';

export const Step32Page = () => {
  const {goToPreviousStep, goToNextStep} =
    useNavigation<FlowNavigationProp<ParamListBase>>();

  const [_, setHasToPassStep3] = useAtom(hasToPassStep3Atom);

  const onNextPress = () => {
    setHasToPassStep3(false);
    goToNextStep();
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
