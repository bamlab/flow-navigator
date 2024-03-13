![Alt text](image.png)
# Flow Navigator for React Navigation

## Simplifying Flow Navigation in React Native

Flow Navigator provides a simplified API for managing navigation flows in your React Native applications with [React Navigation](https://reactnavigation.org/). It abstracts the complexity of flow management, allowing individual screens to navigate through the flow using simple methods like `goToNextStep` and `goToPreviousStep`, without the need to understand the entire navigation stack, or knowing which page exactly is the next one.

## Features

- **Simplified Flow Management**: Get a comprehensive overview of your flow in a single location. This allows new developers to quickly understand the entire flow without the need to examine each page individually.
- **Separation of responsibility**: Screens are not aware of their specific position in the flow. They don't need to know which page is next; they simply navigate to the next page in the flow.
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
import { createFlowNavigator } from '@bam.tech/flow-navigator';

const FlowNavigator = createFlowNavigator();

export const FlowNavigatorExample = () => {
   // Define your screens and their order in the flow
  return (
    <FlowNavigator.Navigator>
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
  const { goToNextStep, goToPreviousStep, currentStep } = useFlow();

  return (
    <Button title="Go to next page" onPress={() => goToNextStep()} />
  )
};
```

You can find a fully working example in the [example](./example/App.tsx) folder.

![Alt text](<Nov-15-2023 15-29-57.gif>)


### Define conditional steps

In certain scenarios, a flow may include steps that are conditional. These steps might be dependent on user-specific conditions or based on whether certain actions have already been completed. You can manage such conditional steps declaratively in your navigation flow.

Here's an example where "Step 2" is conditionally displayed based on the hasToPassStep2 variable. This variable could be a piece of data fetched from the backend or a state within your application. In our case, we use jotai to store our user data locally.

```tsx
import { createFlowNavigator } from '@bam.tech/flow-navigator';

export const flagAtom = atom(false);

const FlowNavigator = createFlowNavigator();

export const FlowNavigatorExample = () => {
  const [flag] = useAtom(flagAtom);

  return (
    <FlowNavigator.Navigator>
      <FlowNavigator.Screen name="Step1" component={Step1Page} />
      {flag && <FlowNavigator.Screen name="Step2" component={Step2Page} />}
      <FlowNavigator.Screen name="Step3" component={Step3Page} />
    </FlowNavigator.Navigator>
  );
};
```

In this example, the Step2 screen is only included in the flow if hasToPassStep2 evaluates to true.

You can enable or disable routes at anytime in your flow by setting your boolean state: `setFlag(false)`

```tsx
import { useFlow } from '@bam.tech/flow-navigator';

export const Step1Page = () => {
  const {goBack, goToNextStep} = useFlow();
  const [flag] = useAtom(flagAtom);

  const onNextPress = async () => {
    setFlag(false);
    goToNextStep();
  };

  const onBackPress = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Current page: 1</Text>
      <FlowInfos />
      <Button title="next" onPress={onNextPress} />
      <Button title="back" onPress={onBackPress} />
    </View>
  );
};
```

You can check out a fully working example in the [example](./example/src/FlowNavigatorExample.tsx) folder

### Define steps with several screens

In some scenarios, a single step in a flow may encompass several screens. To group these screens within one step, you have a couple of options: using [Groups](https://reactnavigation.org/docs/group/) or [Nested navigators](https://reactnavigation.org/docs/screen-options-resolution/). 
Examples of both approaches can be found in the example folder.
We recommend using groups if they suit your use-case. However, one limitation to note is that the `currentStep` will reflect the name of the screen that is currently focused, not the group name. So all the screens in the step won't have the same `currentStep` value. With nested navigator, `currentStep` is the name of the subnavigator, which provides a more cohesive representation of the step. Note that all the pages of a subnavigator will correspond to one increment of the progress index, that will stay constant throughout the whole step.

### Use cases
Flows are sequences of pages with a pre-defined order, guiding users through a specific process within your app. Whether complex or straightforward, flows are a fundamental part of the user experience in many applications. Here are some common examples where Flow Navigator can be particularly useful:
- Onboarding flow
- Post publication flow
- Subscription flow
- Shopping cart checkout process
- Survey of feedback flow
- Profile setup flow

## API definition

### FlowNavigator
The Flow Navigator is built upon the foundation of the [native stack](https://reactnavigation.org/docs/native-stack-navigator/#api-definition), it inherits the same API.

### useFlow
Inside a screen defined below a Flow Navigator, you can use the `useFlow`
`useFlow` provides the following helpers:
- `goToNextStep`: To navigate to the next step in the flow, based on the order of the screens in the navigation flow.
- `goToPreviousStep`: To navigate to the previous step in the flow, based on the order of the screens in the navigation flow.
- `quitFlow`: To exit the flow.

`useFlow` also provides information about the current step of the flow. It contains the following properties:

- `currentStep`: A string representing the identifier of the current step in the flow. Based on the name of the screen.
- `progress`: A number indicating the progress through the flow. It is calculated as the ratio of the current index to the total number of routes.
- `canGoToPreviousStep`: A boolean indicating whether navigation to a previous step is possible.
- `canGoToNextStep`: A boolean indicating whether navigation to the next step is possible.

## Contributing
Pull requests and feature suggestions are more than welcome!

### Testing your changes
You can try out your changes in the example folder.
Use [yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/) to try out your local library version:

1. At the root directory of `@bam.tech/flow-navigator`, run
```bash
  cd packages/lib
  yarn link
```
2. Link in the example project:
```bash
  cd packages/example
  yarn link "@bam.tech/flow-navigator"
```

3. Make your changes in the lib, and transpile the code from TS to JS, to be able to try out the changes in the example. You can run this command at the root of the repo
```bash
  yarn transpile:lib
```

4. Unlink when done, once the changes are published:
```bash
  cd packages/example
  yarn unlink "@bam.tech/flow-navigator"
  yarn install
```

### Publishing the package
1. Increment the package.json in ./packages/lib/package.json
2. Commit the change git commit -m "chore: bump version"
2. Add a tag matching the version 
```bash
   git tag vx.x.x && git push --tags
```
3. Then publish the package: run this command at the root of the repo
```bash
  yarn publish:lib
```
