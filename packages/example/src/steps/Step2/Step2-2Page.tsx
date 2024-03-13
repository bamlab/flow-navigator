import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFlow} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Step2StackParamList} from './Step2Navigator';
import {FlowInfos} from '../FlowInfos';
import {useAtom} from 'jotai';
import {userFlagAAtom} from '../../globalStates/userFlagA';

export const Step22Page = () => {
  const {goBack} = useNavigation<NavigationProp<Step2StackParamList>>();
  const {goToNextStep} = useFlow();

  const [_, setUserFlagA] = useAtom(userFlagAAtom);

  const onNextPress = () => {
    setUserFlagA(true);
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
