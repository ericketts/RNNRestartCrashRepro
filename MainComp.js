// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RNRestart from 'react-native-restart';
import pastelColor from './pastelColor';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
type State = {backgroundColor: string};
export default class App extends Component<Props> {
  state = {backgroundColor: pastelColor()};

  _restart = () => {
    const ms = 2000;
    console.warn(`restarting in ${ms}ms`);
    setTimeout(() => RNRestart.Restart(), ms);
  };

  render() {
    const {backgroundColor} = this.state;
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <Text style={styles.welcome} onPress={this._restart}>
          Tap me to trigger a restart
        </Text>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
