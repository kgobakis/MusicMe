import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator
} from "react-native";
import config from "../config";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        name: "",
        email: "",
        password: ""
      },
      error: ""
    };
  }
  async register() {
    const signUpRequest = Object.assign({}, this.state.credentials);

    this.setState({ showProgress: true });
    try {
      let response = await fetch(
        "http://cosc-257-grp3.cs.amherst.edu:8080/auth/signup",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(signUpRequest)
        }
      );
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        this.props.navigation.navigate("login");
      } else {
        //Handle error
        let error = res;
        throw error;
      }
    } catch (error) {
      this.setState({ error: "Invalid Credentials" });
      this.setState({ showProgress: false });
    }
  }

  updateText(text, field) {
    //Because it is an object, we have to do Objectassign so that we assign a new pointer in memory
    let newCredentials = Object.assign(this.state.credentials);

    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials
    });
  }
  updateText(text, field) {
    //Because it is an object, we have to do Objectassign so that we assign a new pointer in memory
    let newCredentials = Object.assign(this.state.credentials);

    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials
    });
  }
  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={config.images.loginBackgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Register Page</Text>
          <TextInput
            onChangeText={text => this.updateText(text, "name")}
            placeholder="Name"
            style={styles.input}
            autoCorrect={false}
          />
          <TextInput
            onChangeText={text => this.updateText(text, "email")}
            placeholder="Email"
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            autoCapitalize="none"
            onChangeText={text => this.updateText(text, "password")}
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
            autoCorrect={false}
          />
          <Button
            style={(style = styles.buttonContainer)}
            title="Sign Up"
            onPress={this.register.bind(this)}
          />

          <Text style={styles.error}>{this.state.error}</Text>
          {(
            <ActivityIndicator
              animating={this.state.showProgress}
              size="large"
              style={styles.loader}
            />
          ) && this.state.ActivityIndicator}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    color: "#B49082",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    fontSize: 25,
    fontWeight: "bold"
  },
  input: {
    height: 50,
    width: "100%",
    color: "#0000FF",
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 20,
    borderColor: "#ddd"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  error: {
    color: "red",
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Register;
