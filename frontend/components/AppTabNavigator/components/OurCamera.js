import React from "react";
import { Text, View, CameraRoll } from "react-native";
import { withNavigationFocus } from "react-navigation";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toolbar from "../../Camera/Toolbar";
import styles from "../../Camera/styles";
import PropTypes from "prop-types";
import VideoPlayer from "./VideoPlayer";
import * as MediaLibrary from "expo-media-library";

import { UPLOAD, DOWNLOAD } from "../../Config";
class CameraScreen extends React.Component {
  camera = Camera;

  state = {
    captures: [],

    cameraType: Camera.Constants.Type.front,
    hasCameraPermission: null,
    video: null,
    duration: null,
    mute: false,
    uploading: false,
    recording: false
  };
  setCameraType = cameraType => this.setState({ cameraType });

  handleMute = () => {
    this.setState({
      mute: !this.state.mute
    });
  };
  _saveVideo = async () => {
    const { video } = this.state;

    CameraRoll.saveToCameraRoll(video.uri, "video");

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
  uploadVideo = async () => {
    let video = Object.assign({}, this.state.video);

    const data = new FormData();
    data.append("file", {
      name: `clock.mov`,
      uri: video.uri
    });

    // fetch(`http://148.85.77.212:8080/uploadFile/${user_id}`, {
    fetch(`http://148.85.77.212:8080/uploadFile/19`, {
      method: "post",

      body: data
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
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

  toggleRecord = () => {
    const { recording } = this.state;

    if (recording) {
      this._StopRecord();
    } else {
      this._StartRecord();
    }
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";
    this.setState({ hasCameraPermission });
  }
  exitVideoPlayer = async () => {
    this.setState({ video: null });

    this.props.nav.navigation.navigate("AddMediaTab");
  };
  handleChooseVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [2, 1]
    });
    if (!result.cancelled) {
      this.setState({ video: result });
    }
  };

  render() {
    let { video } = this.state;
    const { isFocused } = this.props;

    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      recording
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    return (
      <React.Fragment>
        {video === null && isFocused && (
          <Camera
            ratio={"2:1"}
            type={cameraType}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
        )}
        {video === null && isFocused && (
          <Toolbar
            flashMode={flashMode}
            cameraType={cameraType}
            setCameraType={this.setCameraType}
            toggleRecord={this.toggleRecord}
            capturing={recording}
            pickVideo={this.handleChooseVideo}
            goBack={() => {
              this.props.nav.navigation.navigate("HomeTab");
            }}
            video={video}
            _saveVideo={this._saveVideo}
          />
        )}
        {video !== null && isFocused && (
          <VideoPlayer
            video={video}
            mute={this.handleMute}
            play={this.handlePlayPause}
            exitVideo={this.exitVideoPlayer}
            uploadVideo={this.uploadVideo}
            withNavigationFocus
          />
        )}
      </React.Fragment>
    );
  }
}
CameraScreen.propTypes = {
  exitVideo: PropTypes.any
};
export default withNavigationFocus(CameraScreen);
