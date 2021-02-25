import React from 'react';
import Stomp from 'stompjs';
import { connect } from 'react-redux';

import { stompConnect, subscribeToNotifications } from './actions/index';

let client;
let subscription;

class StompConnect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            client: Stomp.client('ws://localhost:15674/ws')
        }

        this.props.stompConnect(this.state.client);
    }
    componentDidMount() {
        
    }

    render() {
        return <span />;
    }

    componentDidUpdate(){

        const loggedIn = this.props.loggedIn;

        if (loggedIn === true && (subscription === undefined || subscription === null)) {
            console.log("connectiong to broker");
            this.connect();
        } else if (loggedIn === true && subscription){
            console.log("subscribing");
            this.subscribeToEmployeesFanout();
        }
        else if (loggedIn === false && subscription){

            subscription.unsubscribe();
            client.disconnect()
        }
    }

    connect = () => {

        client = Stomp.client('ws://localhost:15674/ws');
        client.connect('guest', 'guest', this.subscribeToEmployeesFanout);

    }

    // Értesítések
    subscribeToEmployeesFanout = () => {

        if (subscription) {
            subscription.unsubscribe();
            
            console.log('unsubscribe')
            client.disconnect();
        } else if (!subscription) {
            
            subscription = client.subscribe(`/exchange/employees-notification`, this.showNotification, 
            { ack: 'client', exclusive: true, durable: false, 'auto-delete': true });
            
            client.debug = (str) => {
                console.log(str)
            }
            console.log("congratulation you are subscribed")
            console.log(subscription);
        }
    }

    showNotification = (message) => {
        this.props.showNotification(message)
    }
    
}

const mapStateToProps = (state) => {
    return {
        connection: state.connectedToBroker,
        subscription: state.subscribedTo
    };
}

const mapDispatchToProps = {
    stompConnect,
    subscribeToNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(StompConnect);