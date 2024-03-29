import React from 'react';
import {createFlowNavigator} from '@bam.tech/flow-navigator';
import {useQuery} from '@tanstack/react-query';
import {getUserFlagB} from './queries/getUserFlagB';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Step1Page} from './steps/Step1/Step1Page';
import {Step2Navigator} from './steps/Step2/Step2Navigator';
import {Step31Page} from './steps/Step3/Step3-1Page';
import {Step32Page} from './steps/Step3/Step3-2Page';
import {Step4Page} from './steps/Step4/Step4Page';
import {Step5Page} from './steps/Step5/Step4Page';
import {userFlagAAtom} from './globalStates/userFlagA';
import {useAtom} from 'jotai';

const FlowNavigator = createFlowNavigator();

export const FlowNavigatorExample = () => {
  const [userFlagA] = useAtom(userFlagAAtom);

  const {data: userFlagB, isLoading: isStep4Loading} = useQuery(
    ['userFlagB'],
    getUserFlagB,
  );

  if (isStep4Loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlowNavigator.Navigator screenOptions={{headerShown: false}}>
      <FlowNavigator.Screen name="Step1" component={Step1Page} />
      <FlowNavigator.Screen name="Step2" component={Step2Navigator} />
      {userFlagA && (
        <FlowNavigator.Group>
          <FlowNavigator.Screen name="Step31" component={Step31Page} />
          <FlowNavigator.Screen name="Step32" component={Step32Page} />
        </FlowNavigator.Group>
      )}
      {userFlagB && <FlowNavigator.Screen name="Step4" component={Step4Page} />}
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
