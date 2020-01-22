import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { withNavigationFocus } from "react-navigation";
import styles from "../../Camera/styles";
import Toolbar from "../../Camera/Toolbar";

import { Camera } from "expo-camera";
const { Type: CameraTypes } = Camera.Constants;

class MyCam extends Component {
  state = {
    video: null,
    picture: null,
    recording: false,
    cameraType: CameraTypes.front
  };
  setCameraType = cameraType => this.setState({ cameraType });

  _saveVideo = async () => {
    const { video } = this.state;

    const asset = await MediaLibrary.createAssetAsync(video.uri);
    if (asset) {
      this.setState({ video: null });
    }
  };

  _StopRecord = async () => {
    this.setState({ recording: false }, () => {
      this.camera.stopRecording();
    });
  };

  _StartRecord = async () => {
    if (this.camera) {
      this.setState({ recording: true }, async () => {
        const video = await this.camera.recordAsync();
        this.setState({ video });
      });
    }
  };

  toogleRecord = () => {
    const { recording } = this.state;

    if (recording) {
      this._StopRecord();
    } else {
      this._StartRecord();
    }
  };
  exitVideoPlayer = async () => {
    this.setState({ video: null });

    this.props.nav.navigation.navigate("AddMediaTab");
  };
  handleChooseVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9]
    });
    if (!result.cancelled) {
      this.setState({ video: result.uri });
    }
  };

  render() {
    const { recording, video, cameraType } = this.state;
    const { isFocused } = this.props;

    return (
      <React.Fragment>
        {video === null && isFocused && (
          <Camera
            ratio={"16:9"}
            type={cameraType}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
        )}
        {video === null && isFocused && (
          <Toolbar
            capturing={recording}
            cameraType={cameraType}
            setCameraType={this.setCameraType}
            startRecording={this.toogleRecord}
            capturing={this.state.recording}
            pickVideo={this.handleChooseVideo}
            goBack={() => {
              this.props.nav.navigation.navigate("HomeTab");
            }}
            video={this.state.video}
          />
        )}
      </React.Fragment>
      // <Camera
      //   ref={camera => (this.camera = camera)}
      //   type={cameraType}
      //   style={{
      //     justifyContent: "flex-end",
      //     alignItems: "center",
      //     flex: 1,
      //     width: "100%"
      //   }}
      // >
      //   {video && (
      //     <TouchableOpacity
      //       onPress={this._saveVideo}
      //       style={{
      //         padding: 20,
      //         width: "100%",
      //         backgroundColor: "#fff"
      //       }}
      //     >
      //       <Text style={{ textAlign: "center" }}>save</Text>
      //     </TouchableOpacity>
      //   )}
      //   <TouchableOpacity
      //     onPress={this.toogleRecord}
      //     style={{
      //       padding: 20,
      //       width: "100%",
      //       backgroundColor: recording ? "#ef4f84" : "#4fef97"
      //     }}
      //   >
      //     <Text style={{ textAlign: "center" }}>
      //       {recording ? "Stop" : "Record"}
      //     </Text>
      //   </TouchableOpacity>
      // </Camera>
    );
  }
}

class RecVideo extends Component {
  state = {
    showCamera: false
  };

  _showCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      this.setState({ showCamera: true });
    }
  };

  render() {
    const { showCamera } = this.state;
    const { isFocused } = this.props;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: "100%"
        }}
      >
        <MyCam isFocused={isFocused} />
      </View>
    );
  }
}

export default withNavigationFocus(RecVideo);
