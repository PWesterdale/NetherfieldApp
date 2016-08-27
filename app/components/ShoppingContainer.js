import React, { Component } from 'react';

import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

import {txt as sTxt, container as sContainer} from '../styles/Styles';

class ShoppingContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={sContainer}>
                <Text style={sTxt}>LOOK Xander - SHUT UP</Text>
            </View>
        );
    }
}

module.exports = ShoppingContainer;