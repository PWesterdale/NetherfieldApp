import React, { Component } from 'react';
var t = require('tcomb-form-native');
import {
  Modal,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var Form = t.form.Form;

var Type = t.enums({
    O: 'One Off',
    D: 'Daily',
    W: 'Weekly',
    M: 'Monthly'
});

var Day = t.enums({
    0 : 'Monday',
    1 : 'Tuesday',
    2 : 'Wednesday',
    3 : 'Thursday',
    4 : 'Friday',
    5 : 'Saturday',
    6 : 'Sunday'
})

var ToDo = t.struct({txt: t.Str, type: Type});

var options = {
    fields: {
        txt: {
            label: 'To-Do Item',
            placeholder: 'enter a to do item here',
            autoFocus: true
        },
        type: {
            nullOption: false
        }
    }
};

import styles from '../styles/Styles';

class TodoCreateModal extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {visible: this.props.visible, type : ToDo, item : {type: 'O'}}
    }
    componentWillReceiveProps(nextProps) {
        this.setModalVisible(nextProps.visible);
    }
    getType(todo) {
        if(todo.type == 'O'){
            return t.struct({txt: t.Str, type: Type});
        } else if (todo.type == 'W') {
            return t.struct({txt: t.Str, type: Type, day: Day})
        } else {
            return ToDo;
        }
    }
    onUpdate() {
        var value = this.refs.form.getValue();
        if (value) {
            this.props.ws.request({
                method : 'put', 
                entity: 'todo', 
                data: value
            })
            .then(function(data) {
                this.setModalVisible(false);
            }.bind(this));
        }
    }
    _onChange(value) {
        let type = this.getType(value);
        this.setState({type : type, item: value});
    }
    setModalVisible(visible) {
        this.setState({visible: visible});
    }
    render() {
        return (
            <Modal animationType={"slide"}
            transparent={false}
            visible={this.state.visible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={styles.todo}>
                    <Form
                        ref="form"
                        type={this.state.type}
                        onChange={this._onChange.bind(this)}
                        options={options}
                        value={this.state.item}/>
                    <TouchableHighlight
                        style={[styles.button, styles.saveButton]}
                        onPress={this.onUpdate}
                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}

module.exports = TodoCreateModal;