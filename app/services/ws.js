import uuid from 'react-native-uuid';

class Socket {
    constructor() {
        this.listeners = {};
        this.callbacks = {};
    }
    connect(cb) {
        this.ws = new WebSocket('http://netherfields.thisis.pw');
        
        // TODO: Tidy this!
        this.ws.onopen = () => {
            console.log('opened connection');
            if(cb) {
                cb(this);
            }
        };

        this.ws.onclose = function() {
            console.log('connection closed');
            this.connect();
        }.bind(this);

        this.ws.onmessage = function (evt) 
        { 
            let msg = JSON.parse(evt.data);
            if(msg.cb) {
                this.callbacks[msg.cb](msg);
            } else {
                if(this.listeners[msg.entity]){
                    this.listeners[msg.entity].forEach((listener) => {
                        listener.callback({body: msg.data, type: msg.type});
                    });
                }
            }

        }.bind(this);
    }
    request(data) {
        return new Promise(function(resolve, reject){
            let sent = new Date().getTime();
            let cb = uuid.v1();
            data.cb = cb;
            this.ws.send(JSON.stringify(data));
            this.callbacks[data.cb] = resolve;
            let counter = 0;
            setTimeout(() => {
                reject('Timed Out');
            }, 4000);
        }.bind(this));
    }
    listen(to, cb) {
        let token = uuid.v1();
        if(!this.listeners[to]){
            this.listeners[to] = [{token: token, callback : cb}]
        } else {
            this.listeners[to].push({token: token, callback : cb})
        }
        return token;
    }
    unlisten(to, token) {
        for(var x in this.listeners[to]){
            let listener = this.listeners[to][x];
            if(listener.token == token){
                this.listeners[to].splice(x, 1);
                return;
            }
        }
    }
}

module.exports = Socket;