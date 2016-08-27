import React, { Component } from 'react';

import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  AlertIOS,
  TabBarIOS
} from 'react-native';

import TodoListItem from './TodoListItem';
import TodoBottomBar from './TodoBottomBar';
import TodoCreateModal from './TodoCreateModal';

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [],
            filter : false,
            modalVisible : false,
            listenerToken : false
        }
    }
    componentWillMount() {
        
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.props.getSocket(function(ws){
            this.ws = ws;
            
            this.ws.request({ method : 'get', entity : 'todo'})
            .then(function(res){
                this.setState({items : res.data})
            }.bind(this))
            .catch(function(err){
                console.log(err);
            });

            let token = this.ws.listen('todo', function(data){
                if(data.type == 'add'){ // TODO: Break out into service
                    this.setState({
                        items: this.state.items.concat([data.body]),
                        modalVisible : false
                    });
                } else if (data.type == 'merge') {
                    let items = this.state.items.map((item) => {
                        if(item.id == data.body.id){
                            return Object.assign({}, item, data.body);
                        } else {
                            return item;
                        }
                    });
                    this.setState({
                        items: items
                    });
                }
            }.bind(this));

            this.setState({listenerToken : token});

        }.bind(this));

    }
    componentWillUnmount() {
        this.ws.unlisten('todo', this.state.listenerToken);
        this.setState({listenerToken : false});
    }
    launchModal() {
        this.setState({modalVisible : true});
    }
    filterList(filter) {
        this.setState({filter : filter});
    }
    completeHandler(id, state) {
        this.ws.request({method : 'post', entity: 'todo', data: {completed: state}, id: id});
    }
    render() {

        let filtered = this.state.items.filter((item) => {
            if(this.state.filter && this.state.filter.indexOf(item.type) !== -1 || this.state.filter == false){
                return item;
            }
        });

        let data = this.dataSource.cloneWithRows(filtered);

        return (
            <View style={{flex:1}}>
                <ListView enableEmptySections={true} dataSource={data} renderRow={(rowData) =>
                    <TodoListItem item={rowData} completeHandler={this.completeHandler.bind(this)} />
                } />
                <TodoBottomBar launchModal={this.launchModal.bind(this)} filterList={this.filterList.bind(this)} />
                <TodoCreateModal visible={this.state.modalVisible} ws={this.ws} />
            </View>
        );
    }
}

module.exports = TodoContainer;