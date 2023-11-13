import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Step21Page} from './Step2-1Page';
import {Step22Page} from './Step2-2Page';

export type Step2StackParamList = {Step21: undefined; Step22: undefined};

const Step1Stack = createNativeStackNavigator<Step2StackParamList>();

export const Step2Navigator = () => {
  return (
    <Step1Stack.Navigator
      initialRouteName="Step21"
      screenOptions={{headerShown: false}}>
      <Step1Stack.Screen name="Step21" component={Step21Page} />
      <Step1Stack.Screen name="Step22" component={Step22Page} />
    </Step1Stack.Navigator>
  );
};
