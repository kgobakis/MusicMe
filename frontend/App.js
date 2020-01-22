import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import MainScreen from "./components/MainScreen";

class App extends Component {
  state = {
    loaded: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    this.setState({ loaded: true });
  }
  render() {
    const { loaded } = this.state;
    return loaded ? <MainScreen /> : <View />;
  }
}

export default App;
