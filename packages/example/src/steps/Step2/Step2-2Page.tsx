import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlowNavigationProp} from '@bam.tech/flow-navigator';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlowInfos} from '../FlowInfos';
import {FlowStackParamList} from '../../FlowNavigatorExample';

export const Step22Page = () => {
  const {goBack, goToNextStep, setStoreState} =
    useNavigation<FlowNavigationProp<FlowStackParamList>>();

  const onNextPress = async () => {
    setStoreState({
      myValue31: true,
    });
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
