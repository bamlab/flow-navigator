import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFlow} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Step2StackParamList} from './Step2Navigator';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postPassedStep2} from '../../queries/hasToPassStep2';
import {FlowInfos} from '../FlowInfos';

export const Step22Page = () => {
  const {goBack} =
    useNavigation<NativeStackNavigationProp<Step2StackParamList>>();

  const {goNextStep} = useFlow();

  const queryClient = useQueryClient();
  const {mutate: setHasToPassStep2ToOff} = useMutation(
    ['postHasToPassStep2'],
    postPassedStep2,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['hasToPassStep2']);
        goNextStep();
      },
    },
  );

  const onNextPress = () => setHasToPassStep2ToOff();

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
