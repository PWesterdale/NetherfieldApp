import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native';

import {txt as sTxt, container as sContainer} from '../styles/Styles';

class TodoBottomBar extends React.Component {

    constructor(props) {
        super(props);

        this.items = [
            {
                'name' : 'Add',
                'onPress' : this.props.launchModal
            },
            {
                'name' : 'All',
                'onPress' : () => {this.props.filterList(false)}
            },
            {
                'name' : 'Today',
                'onPress' : () => {this.props.filterList(['D', 'O'])}
            },
            {
                'name' : 'This Week',
                'onPress' : () => {this.props.filterList(['W'])}
            },
            {
                'name' : 'This Month',
                'onPress' : () => {this.props.filterList(['M'])}
            }
        ]
    }

    render() {

        let items = this.items.map((item) => {
            return (
                <View key={item.name}>
                    <Text onPress={item.onPress}>{item.name}</Text>
                </View>
            );
        });

        return (
            <View>
                {items}
            </View>
        );
    }
}

module.exports = TodoBottomBar;