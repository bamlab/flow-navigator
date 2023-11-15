# Flow Navigator for React Navigation

## Simplifying Flow Navigation in React Native

Flow Navigator provides a simplified API for managing navigation flows in your React Native applications with [React Navigation](https://reactnavigation.org/). It abstracts the complexity of flow management, allowing individual screens to navigate through the flow using simple methods like `goToNextStep` and `goToPreviousStep`, without the need to understand the entire navigation stack, or knowing which page exactly is the next one.

## Features

- **Simplified Flow Management**: Easily manage the navigation flow without the need for screens to be aware of their position in the flow.
- **Declarative Screen Ordering**: Define the order of screens in your navigation flow declaratively, ensuring a clear and maintainable navigation structure.

## Installation

```bash
yarn add @bam.tech/flow-navigator
# or
npm install @bam.tech/flow-navigator
```

## Usage
### Basic usage

```tsx
import { FlowNavigator } from '@bam.tech/flow-navigator';

const FlowNavigator = createFlowNavigator();

export const FlowNavigator = () => {
   // Define your screens and their order in the flow
  return (
    <FlowNavigator.Navigator screenOptions={{ headerShown: false }}>
      <FlowNavigator.Screen name="Step1" component={Step1Page} />
      <FlowNavigator.Screen name="Step2" component={Step2Page} />
      <FlowNavigator.Screen name="Step3" component={Step2Page} />
    </FlowNavigator.Navigator>
  );
};
```

In each screen component, you can navigate through the flow using:

```tsx
import { useFlow } from '@bam.tech/flow-navigator';

const Step1Page = () => {
  const { currentStep, goToNextStep, goToPreviousStep } = useFlow();

  return (
    <Button title="Go to next page" onPress={() => goToNextStep()} />
  )
};
```

You can find a fully working example in the [example](./example/App.tsx) folder.

![Alt text](<Nov-15-2023 15-29-57.gif>)


### Define conditional steps

In certain scenarios, a flow may include steps that are conditional. These steps might be dependent on user-specific conditions or based on whether certain actions have already been completed. You can manage such conditional steps declaratively in your navigation flow.

Here's an example where "Step 2" is conditionally displayed based on the hasToPassStep2 variable. This variable could be a piece of data fetched from the backend or a state within your application.

```tsx
import { FlowNavigator } from '@bam.tech/flow-navigator';

const AppFlow = createFlowNavigator();

export const App = () => {
  const hasToPassStep2 = /* your condition here */;

  return (
    <AppFlow.Navigator screenOptions={{ headerShown: false }}>
      <AppFlow.Screen name="Step1" component={Step1Page} />
      {hasToPassStep2 && <AppFlow.Screen name="Step2" component={Step2Page} />}
      <AppFlow.Screen name="Step3" component={Step3Page} />
    </AppFlow.Navigator>
  );
};
```

In this example, the Step2 screen is only included in the flow if hasToPassStep2 evaluates to true.

You can check out a fully working example with a condition based on a backend state fetched with react-query in the [example](./example/src/FlowNavigatorExample.tsx) folder

### Define steps with several screens

In some scenarios, a single step in a flow may encompass several screens. To group these screens within one step, you have a couple of options: using [Groups](https://reactnavigation.org/docs/group/) or [Nested navigators](https://reactnavigation.org/docs/screen-options-resolution/). 
Examples of both approaches can be found in the example folder.
We recommend using groups if they suit your use-case. However, one limitation to note is that the `currentStep` will reflect the name of the screen that is currently focused, not the group name. So all the screens in the step won't have the same `currentStep` value. With nested navigator, `currentStep` is the name of the subnavigator, which provides a more cohesive representation of the step.

## API definition

### FlowNavigator
The Flow Navigator is built upon the foundation of the [native stack](https://reactnavigation.org/docs/native-stack-navigator/#api-definition), it inherits the same API.

### useFlow
Inside a screen defined below a Flow Navigator, you can use the `useFlow`, which provides the following:

#### Properties
- `currentStep`: A string representing the identifier of the current step in the flow. Based on the name of the screen.
- `progress`: A number indicating the progress through the flow. It is calculated as the ratio of the current index to the total number of routes.
- `canGoToPreviousStep`: A boolean indicating whether navigation to a previous step is possible.
- `canGoToNextStep`: A boolean indicating whether navigation to the next step is possible.

#### Helpers
- `goToNextStep`: To navigate to the next step in the flow, based on the order of the screens in the navigation flow.
- `goToPreviousStep`: To navigate to the previous step in the flow, based on the order of the screens in the navigation flow.
- `quitFlow`: To exit the flow. 

## Contributing
Pull requests and feature suggestions are more than welcome!
