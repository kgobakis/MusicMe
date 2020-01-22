import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  AsyncStorage
} from "react-native";

import { Asset } from "expo-asset";

import LoginGesture from "./LoginGesture.js";
import RegisterGesture from "./RegisterGesture";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      showProgress: false,
      isReady: false
    };
    this.login = this.login.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
  }

  async loginGoogle() {}

  async register(signUpRequest) {
    // const signUpRequest = Object.assign({}, this.state.credentials);

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

  async login(loginRequest) {
    await AsyncStorage.setItem("isLoggedIn", "true");
    this.setState({ showProgress: true });
    try {
      let response = await fetch(
        "http://cosc-257-grp3.cs.amherst.edu:8080/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginRequest)
        }
      );
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        this.setState({ error: "", showProgress: false });
        this.props.navigation.navigate("HomeTab");
      } else {
        //Handle error
        let error = res;
        throw error;
      }
    } catch (error) {
      this.setState({ error: "Invalid Credentials", showProgress: false });
    }
  }

  _loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    this.props.navigation.navigate(isLoggedIn === "true" ? "HomeTab" : "login");
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "flex-end"
        }}
      >
        <LoginGesture
          login={this.login}
          loginGoogle={this.loginGoogle}
          upperState={this.state}
        />
      </View>
    );
  }
}

export default Login;
