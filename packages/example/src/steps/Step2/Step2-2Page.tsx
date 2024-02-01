import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {FlowStackParamList} from '../../FlowNavigatorExample';

export const Step22Page = () => {
  const {goToPreviousStep, goToNextStep, navigate} =
    useNavigation<FlowNavigationProp<FlowStackParamList>>();

  const onNextPress = async () => {
    goToNextStep();
  };

  const onBackPress = () => {
    goToPreviousStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 2.2</Text>
      <FlowInfos />
      <Button title="next" onPress={onNextPress} />
      <Button title="back" onPress={onBackPress} />
      <Button title="go to home" onPress={() => navigate('Home')} />
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
