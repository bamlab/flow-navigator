import React from 'react';
import {createFlowNavigator} from '@bam.tech/flow-navigator';
import {useQuery} from '@tanstack/react-query';
import {getHasToPassStep2} from '../queries/hasToPassStep2';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Step1Page} from '../steps/Step1/Step1Page';
import {Step2Navigator} from '../steps/Step2/Step2Navigator';
import {Step31Page} from '../steps/Step3/Step3-1Page';
import {Step32Page} from '../steps/Step3/Step3-2Page';
import {Step4Page} from '../steps/Step4/Step4Page';

const FlowNavigator = createFlowNavigator();
const shouldPassStep3 = true;

export const FlowNavigatorExample = () => {
  const {data: hasToPassStep2, isLoading: isStep2Loading} = useQuery(
    ['hasToPassStep2'],
    getHasToPassStep2,
  );

  if (isStep2Loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlowNavigator.Navigator screenOptions={{headerShown: false}}>
      <FlowNavigator.Screen name="Step11" component={Step1Page} />
      {hasToPassStep2 && (
        <FlowNavigator.Screen name="Step2" component={Step2Navigator} />
      )}
      {shouldPassStep3 && (
        <FlowNavigator.Group>
          <FlowNavigator.Screen name="Step31" component={Step31Page} />
          <FlowNavigator.Screen name="Step32" component={Step32Page} />
        </FlowNavigator.Group>
      )}
      <FlowNavigator.Screen name="Step4Navigator" component={Step4Page} />
    </FlowNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
