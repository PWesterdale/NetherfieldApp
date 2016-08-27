import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {hr as sHr, txt as sTxt} from '../styles/Styles';

class ApplicationListItem extends React.Component {
    render() {
        var item = this.props.item;
        return (
            <View>
                <TouchableHighlight onPress={this.props.onPress}>
                    <View>
                        <Text style={sTxt}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={sHr} />
            </View>
        );
    }
}

module.exports = ApplicationListItem;