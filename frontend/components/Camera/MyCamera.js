import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Header, Item, Input, Button } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

class CustomCamera extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ratio={"16:9"}
            style={{ flex: 1, justifyContent: "space-between" }}
            type={this.state.type}
          >
            <Header
              searchBar
              rounded
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                left: 0,
                top: 0,
                right: 0,
                zIndex: 100,
                alignItems: "center"
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginBottom: 15,
                alignItems: "flex-end"
              }}
            >
              <MaterialCommunityIcons
                name="metronome"
                style={{ color: "white", fontSize: 30 }}
              ></MaterialCommunityIcons>

              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="circle-outline"
                  style={{ color: "white", fontSize: 50 }}
                ></MaterialCommunityIcons>
                <Ionicons
                  name="ios-images"
                  style={{ color: "white", fontSize: 36 }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Ionicons
                  name="ios-reverse-camera"
                  style={{ color: "white", fontSize: 36 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CustomCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
