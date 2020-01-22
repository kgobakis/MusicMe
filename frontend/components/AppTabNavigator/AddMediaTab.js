import React, { Component } from "react";
import { View } from "react-native";
import OurCamera from "./components/OurCamera";
import {
  TapGestureHandler,
  RotationGestureHandler
} from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";

class AddMediaTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return (
        <Entypo
          name="video-camera"
          style={{ color: tintColor, fontSize: 25 }}
        />
      );
    }
  };
  render() {
    return <OurCamera nav={this.props} />;
  }
}

export default AddMediaTab;
