import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {FlowNavigatorExample} from './FlowNavigatorExample';
import {Button, StyleSheet, Text, View} from 'react-native';

type NativeStackParamList = {
  Home: undefined;
  Flow: undefined;
};

const NativeStack = createNativeStackNavigator<NativeStackParamList>();

export const FlowNavigatorContainer = () => {
  return (
    <NativeStack.Navigator screenOptions={{headerShown: false}}>
      <NativeStack.Screen name="Home" component={Home} />
      <NativeStack.Screen name="Flow" component={FlowNavigatorExample} />
    </NativeStack.Navigator>
  );
};

const Home = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<NativeStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to the example app. Press the start flow button to navigate to
        the flow navigator.
      </Text>
      <Button title="Go to Flow" onPress={() => navigate('Flow')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
