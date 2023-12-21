import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Step2StackParamList} from './Step2Navigator';
import {FlowInfos} from '../FlowInfos';

export const Step22Page = () => {
  const {goBack, goToNextStep} =
    useNavigation<FlowNavigationProp<Step2StackParamList>>();

  const onBackPress = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 2.2</Text>
      <FlowInfos />
      <Button title="next" onPress={goToNextStep} />
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
