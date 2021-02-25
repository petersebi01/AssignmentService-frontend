import React from 'react';
import Stomp from 'stompjs';

import MyChat from './MyChat';
import FriendChat from './FriendChat';
import ChatInput from './ChatInput';
import { connect } from 'react-redux';

import { subscribeToNotifications } from '../../actions/index';

let client;
let subscription;

class ChatWall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            chat: [],
            subscription: null
        }
    }
    componentDidMount(){
            client = Stomp.client('ws://localhost:15674/ws');
            client.connect('guest', 'guest', this.subscribeToGroupChat);
    }

    componentWillUnmount() {
        subscription.unsubscribe();
        client.disconnect();
    }

    render() {
        
        let chat = this.state.chat;
        chat = chat.map((message, id) => {
            if (message.username === this.state.username) {
                return(
                    <MyChat message={message.message} key={id}/>
                );
            } else {
                return(
                    <FriendChat message={message.message} key={id}/>
                )
            }
        });
        return(
            <div className="chat-container">
                <ul>{chat}</ul>
                <ChatInput print={this.sendMessage}/>
            </div>
        );
    }

    subscribeToGroupChat = () => {

        const routingKey = `assignment.${this.props.match.params.assignment}`;

        console.log(subscription)
        subscription = client.subscribe(`/topic/${routingKey}`, this.printMessage, 
        { durable: false, 'auto-delete': true});
        client.debug = (str) => {
            console.log(str)
        }
        console.log(subscription);
        
    }

    sendMessage = (message) => {

        const routingKey = `assignment.${this.props.match.params.assignment}`;

        const date = new Date();
        const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        
        let messageData = {
            username: localStorage.getItem('username'),
            time: time,
            message: message
        }

        client.send(`/topic/${routingKey}`, { 'Content-Type': 'application/json' }, JSON.stringify(messageData));
    }

    printMessage  = (message) => {
        
        let msg = JSON.parse(message.body);

        let chat = this.state.chat;
        chat = [...chat, msg];
        this.setState({
            chat: chat
        });
    }
}

const mapStateToProps = (state) => {
    return {
        connection: state.connectedToBroker,
        subscription: state.subscribedTo
    };
}

const mapDispatchToProps = {
    subscribeToNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWall);