import { NavigationState, EventMapBase, RouteConfig, ParamListBase, RouteGroupConfig } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react"
import { isValidElementType } from 'react-is';
// TODO: add react-is as dependency

export const getRouteConfigsFromChildren = <
  State extends NavigationState,
  ScreenOptions extends {},
  EventMap extends EventMapBase
>(
  children: React.ReactNode,
  groupKey?: string,
  groupOptions?: ScreenConfigWithParent<
    State,
    ScreenOptions,
    EventMap
  >["options"]
) => {
  const configs = React.Children.toArray(children).reduce<
    ScreenConfigWithParent<State, ScreenOptions, EventMap>[]
  >((acc, child) => {
    if (React.isValidElement(child)) {
      if (child.type === NativeStack.Screen) {
        // We can only extract the config from `Screen` elements
        // If something else was rendered, it's probably a bug

        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(
            `Got an invalid 'navigationKey' prop (${JSON.stringify(
              child.props.navigationKey
            )}) for the screen '${
              child.props.name
            }'. It must be a non-empty string or 'undefined'.`
          );
        }

        acc.push({
          keys: [groupKey, child.props.navigationKey],
          options: groupOptions,
          props: child.props as RouteConfig<
            ParamListBase,
            string,
            State,
            ScreenOptions,
            EventMap
          >,
        });
        return acc;
      }

      if (child.type === React.Fragment || child.type === NativeStack.Group) {
        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(
            `Got an invalid 'navigationKey' prop (${JSON.stringify(
              child.props.navigationKey
            )}) for the group. It must be a non-empty string or 'undefined'.`
          );
        }

        // When we encounter a fragment or group, we need to dive into its children to extract the configs
        // This is handy to conditionally define a group of screens
        acc.push(
          ...getRouteConfigsFromChildren<State, ScreenOptions, EventMap>(
            child.props.children,
            child.props.navigationKey,
            child.type !== NativeStack.Group
              ? groupOptions
              : groupOptions != null
              ? [...groupOptions, child.props.screenOptions]
              : [child.props.screenOptions]
          )
        );
        return acc;
      }
    }

    throw new Error(
      `A navigator can only contain 'Screen', 'Group' or 'React.Fragment' as its direct children (found ${
        React.isValidElement(child)
          ? `'${
              typeof child.type === "string" ? child.type : child.type?.name
            }'${
              child.props != null &&
              typeof child.props === "object" &&
              "name" in child.props &&
              child.props?.name
                ? ` for the screen '${child.props.name}'`
                : ""
            }`
          : typeof child === "object"
          ? JSON.stringify(child)
          : `'${String(child)}'`
      }). To render this component in the navigator, pass it in the 'component' prop to 'Screen'.`
    );
  }, []);

  if (process.env.NODE_ENV !== "production") {
    configs.forEach((config) => {
      const { name, children, component, getComponent } = config.props;

      if (typeof name !== "string" || !name) {
        throw new Error(
          `Got an invalid name (${JSON.stringify(
            name
          )}) for the screen. It must be a non-empty string.`
        );
      }

      if (
        children != null ||
        component !== undefined ||
        getComponent !== undefined
      ) {
        if (children != null && component !== undefined) {
          throw new Error(
            `Got both 'component' and 'children' props for the screen '${name}'. You must pass only one of them.`
          );
        }

        if (children != null && getComponent !== undefined) {
          throw new Error(
            `Got both 'getComponent' and 'children' props for the screen '${name}'. You must pass only one of them.`
          );
        }

        if (component !== undefined && getComponent !== undefined) {
          throw new Error(
            `Got both 'component' and 'getComponent' props for the screen '${name}'. You must pass only one of them.`
          );
        }

        if (children != null && typeof children !== "function") {
          throw new Error(
            `Got an invalid value for 'children' prop for the screen '${name}'. It must be a function returning a React Element.`
          );
        }

        if (component !== undefined && !isValidElementType(component)) {
          throw new Error(
            `Got an invalid value for 'component' prop for the screen '${name}'. It must be a valid React Component.`
          );
        }

        if (getComponent !== undefined && typeof getComponent !== "function") {
          throw new Error(
            `Got an invalid value for 'getComponent' prop for the screen '${name}'. It must be a function returning a React Component.`
          );
        }

        if (typeof component === "function") {
          if (component.name === "component") {
            // Inline anonymous functions passed in the `component` prop will have the name of the prop
            // It's relatively safe to assume that it's not a component since it should also have PascalCase name
            // We won't catch all scenarios here, but this should catch a good chunk of incorrect use.
            console.warn(
              `Looks like you're passing an inline function for 'component' prop for the screen '${name}' (e.g. component={() => <SomeComponent />}). Passing an inline function will cause the component state to be lost on re-render and cause perf issues since it's re-created every render. You can pass the function as children to 'Screen' instead to achieve the desired behaviour.`
            );
          } else if (/^[a-z]/.test(component.name)) {
            console.warn(
              `Got a component with the name '${component.name}' for the screen '${name}'. React Components must start with an uppercase letter. If you're passing a regular function and not a component, pass it as children to 'Screen' instead. Otherwise capitalize your component's name.`
            );
          }
        }
      } else {
        throw new Error(
          `Couldn't find a 'component', 'getComponent' or 'children' prop for the screen '${name}'. This can happen if you passed 'undefined'. You likely forgot to export your component from the file it's defined in, or mixed up default import and named import when importing.`
        );
      }
    });
  }

  return configs;
};

/**
 * This code is copied from react-navigation, because we need to access it but is not exported
 * The only thing changed is we compare Screen and Group via a native stack instance
 */
const NativeStack = createNativeStackNavigator();

export const isValidKey = (key: unknown) =>
  key === undefined || (typeof key === "string" && key !== "");

