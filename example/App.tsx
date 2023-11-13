import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {FlowNavigatorContainer} from './src/FlowNavigatorContainer/FlowNavigatorContainer';
import {NavigationContainer} from '@react-navigation/native';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <FlowNavigatorContainer />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
