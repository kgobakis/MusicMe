import React from "react";
import { Camera } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { TouchableOpacity, Text } from "react-native";

import styles from "./styles";

const { Type: CameraTypes } = Camera.Constants;
export default ({
  capturing,
  cameraType = CameraTypes.back,
  setCameraType,
  toggleRecord,
  pickVideo,
  goBack,
  video,
  _saveVideo
}) => (
  <Grid style={styles.bottomToolbar}>
    <Row>
      <Col style={styles.topToolbar}>
        <MaterialIcons
          name="local-movies"
          style={{
            color: "white",
            flexDirection: "row",
            flex: 4,
            marginLeft: 10,
            fontSize: 40
          }}
          onPress={goBack}
        />
      </Col>
      <Col size={2} style={styles.alignCenter}>
        <Ionicons
          name="ios-images"
          style={{ color: "white", fontSize: 40 }}
          onPress={pickVideo}
        />
      </Col>

      <Col size={2} style={styles.alignCenter}>
        {video && (
          <TouchableOpacity
            onPress={_saveVideo}
            style={{
              padding: 20,
              width: "100%",
              backgroundColor: "#fff"
            }}
          >
            <Text style={{ textAlign: "center" }}>save</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={toggleRecord}
          style={{
            padding: 20,
            width: "100%",
            backgroundColor: capturing ? "#ef4f84" : "#4fef97"
          }}
        >
          <Text style={{ textAlign: "center" }}>
            {capturing ? "Stop" : "Record"}
          </Text>
        </TouchableOpacity>
      </Col>
      <Col style={styles.alignCenter}>
        <Ionicons
          name="ios-reverse-camera"
          color="white"
          size={45}
          onPress={() =>
            setCameraType(
              cameraType === CameraTypes.back
                ? CameraTypes.front
                : CameraTypes.back
            )
          }
        />
      </Col>
    </Row>
  </Grid>
);
