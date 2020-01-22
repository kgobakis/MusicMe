import React, { Component } from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import HomeTab from "./AppTabNavigator/HomeTab";
import AddMediaTab from "./AppTabNavigator/AddMediaTab";
import ProfileTab from "./AppTabNavigator/ProfileTab";
import Register from "./Onboarding/Register";
import Login from "./Onboarding/Login";
import { Icon } from "native-base";

const AppTabNavigator = createBottomTabNavigator(
  {
    AddMediaTab: {
      screen: AddMediaTab,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    HomeTab: {
      screen: HomeTab,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="home" style={{ color: tintColor }} />;
        }
      }
    },

    ProfileTab: {
      screen: ProfileTab
    }
  },
  {
    initialRouteName: "HomeTab",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#000000",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true
    }
  }
);

const IntroStack = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  }
});

const MainStack = createSwitchNavigator({
  // intro: IntroStack,
  main: AppTabNavigator
});

const MainScreen = createAppContainer(MainStack);

export default MainScreen;
