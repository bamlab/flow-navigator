import React from 'react';
import {useFlow} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {postUserFlagB} from '../../queries/getUserFlagB';

export const Step4Page = () => {
  const {goToPreviousStep, goToNextStep} = useFlow();

  const queryClient = useQueryClient();
  const {mutate: setHasToPassStep2ToOff} = useMutation(
    ['postUserFlagB'],
    postUserFlagB,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userFlagB']);
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
