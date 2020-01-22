import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Video } from "expo-av";
import React from "react";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import { winWidth, winHeight } from "../../Camera/styles";
import PropTypes from "prop-types";

class VideoPlayer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Video
            source={{ uri: this.props.video.uri }}
            isMuted={false}
            shouldPlay={true}
            isLooping={true}
            resizeMode="cover"
            style={{ width: winWidth, height: winHeight }}
          />
          <View style={styles.controlBar}>
            <MaterialCommunityIcons
              name="exit-to-app"
              style={{
                color: "white",
                flexDirection: "row",
                flex: 4,
                marginLeft: 10,
                bottom: 15,
                left: 0,
                fontSize: 40
              }}
              onPress={this.props.exitVideo}
            />
            <MaterialCommunityIcons
              name="upload"
              style={{
                color: "white",
                flexDirection: "row",
                flex: 1,

                bottom: 15,
                marginRight: 0,
                fontSize: 40
              }}
              onPress={this.props.uploadVideo}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  controlBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
VideoPlayer.propTypes = {
  video: PropTypes.any,
  isMuted: PropTypes.bool
};
export default withNavigation(VideoPlayer);
