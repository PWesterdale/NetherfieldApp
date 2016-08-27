import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {hr as sHr, txt as sTxt, completed as sCompleted} from '../styles/Styles';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.completeHandler = this.props.completeHandler;
    }
    render() {
        var item = this.props.item;
        return (
            <View>
                <View>
                    <Text style={[sTxt, item.completed && sCompleted]}>
                        {item.txt}
                    </Text>
                </View>
                <TouchableHighlight onPress={() => this.completeHandler(item.id, !item.completed) }>
                <View>
                    <Text>
                        {item.completed ? 'UNDERRR' : 'DERN'}
                    </Text>
                </View>
                </TouchableHighlight>
                <View style={sHr} />
            </View>
        );
    }
}

module.exports = TodoListItem;