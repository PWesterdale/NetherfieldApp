import React, { Component } from 'react';

import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

import TodoContainer from './TodoContainer';
import ShoppingContainer from './ShoppingContainer';
import ApplicationListItem from './ApplicationListItem';
import Socket from '../services/ws';

class ApplicationContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            areas: [
                {name: 'Todos', id: 'todos', component: TodoContainer},
                {name: 'Shopping List', id: 'shopping', component: ShoppingContainer}
            ]
        };

        this.navigateTo = this.navigateTo.bind(this);
    }

    getSocket(cb) {
        var s = new Socket();
        s.connect(cb);
    }

    componentWillMount() {
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    navigateTo(rowData) {
        this.props.navigator.push({
            title: rowData && rowData.name,
            component: rowData.component,
            passProps: {item: rowData, getSocket: this.getSocket}
        });
    }

    render() {
        var appAreas = this.dataSource.cloneWithRows(this.state.areas);
        return (
            <View style={{flex:1}}>
                <ListView dataSource={appAreas} renderRow={(rowData) =>
                    <ApplicationListItem item={rowData}
                    onPress={() => this.navigateTo(rowData)} />
                } />
            </View>
        );
    }
}

module.exports = ApplicationContainer;