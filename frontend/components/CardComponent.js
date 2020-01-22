import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon
} from "native-base";

class CardComponent extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require("../assets/resize.jpg")} />
          </Left>
        </CardItem>
      </Card>
    );
  }
}

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
