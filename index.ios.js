/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ApplicationContainer from './app/components/ApplicationContainer';
import {navigator} from './app/styles/Styles';

class netherfield extends Component {
  render() {
    return (
      <NavigatorIOS style={navigator} initialRoute={{component: ApplicationContainer, title: 'Netherfields'}}/>
    );
  }
}

AppRegistry.registerComponent('netherfield', () => netherfield);
