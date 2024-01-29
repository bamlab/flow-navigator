import React from 'react';
import {createFlowNavigator} from '@bam.tech/flow-navigator';
import {useQuery} from '@tanstack/react-query';
import {getHasToPassStep4} from './queries/hasToPassStep4';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Step1Page} from './steps/Step1/Step1Page';
import {Step2Navigator} from './steps/Step2/Step2Navigator';
import {Step31Page} from './steps/Step3/Step3-1Page';
import {Step32Page} from './steps/Step3/Step3-2Page';
import {Step4Page} from './steps/Step4/Step4Page';
import {Step5Page} from './steps/Step5/Step4Page';

export type FlowStackParamList = {
  Step1: undefined;
  Step2: undefined;
  Step31: undefined;
  Step32: undefined;
  Step4: undefined;
  Step5: undefined;
};

const FlowNavigator = createFlowNavigator<FlowStackParamList>();

export const FlowNavigatorExample = () => {
  const {data: hasToPassStep4, isLoading: isStep4Loading} = useQuery(
    ['hasToPassStep4'],
    getHasToPassStep4,
  );

  if (isStep4Loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const initialFlowState = {
    myValue31: false,
    myValue4: hasToPassStep4,
  };

  type FlowState = typeof initialFlowState;

  const config = {
    Step31: (flowState: FlowState) => flowState.myValue31,
    Step4: (flowState: FlowState) => flowState.myValue4,
  };

  return (
    <FlowNavigator.Navigator
      screenOptions={{headerShown: false}}
      config={config}
      initialFlowState={initialFlowState}>
      <FlowNavigator.Screen name="Step1" component={Step1Page} />
      <FlowNavigator.Screen name="Step2" component={Step2Navigator} />
      <FlowNavigator.Group>
        <FlowNavigator.Screen name="Step31" component={Step31Page} />
        <FlowNavigator.Screen name="Step32" component={Step32Page} />
      </FlowNavigator.Group>
      <FlowNavigator.Screen name="Step4" component={Step4Page} />
      <FlowNavigator.Screen name="Step5" component={Step5Page} />
    </FlowNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
