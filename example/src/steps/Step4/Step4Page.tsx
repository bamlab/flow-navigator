import React from 'react';
import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {postPassedStep4} from '../../queries/hasToPassStep4';

export const Step4Page = () => {
  const {goToPreviousStep, goToNextStep} =
    useNavigation<FlowNavigationProp<ParamListBase>>();

  const queryClient = useQueryClient();
  const {mutate: setHasToPassStep2ToOff} = useMutation(
    ['postHasToPassStep4'],
    postPassedStep4,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['hasToPassStep4']);
        goToNextStep();
      },
    },
  );

  const onNextPress = () => setHasToPassStep2ToOff();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 4</Text>
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
