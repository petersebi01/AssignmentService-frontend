import React from 'react';
import ChangeList from './ChangeList';
import Stomp from 'stompjs';

let client;
let subscription

class Monitor extends React.Component {
    state = {
        changes: [],
        subscription: false,
    }
    componentDidMount() {
        client = Stomp.client('ws://localhost:15674/ws');
        client.connect('guest', 'guest', this.subscribeToBroker, console.error());
    }
    render() {
        let changes = this.state.changes;
        changes = changes.map((change, id) => {
            return(
                <ChangeList message={change} key={id}/>
            );
        });

        return (
            <div className="monitor">
                <form onChange={this.subscribeToBroker}>
                    <select ref="option">
                        <option value="*">Mind</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </form>

                <ul>{changes}</ul>
            </div>
        );
    }

    subscribeToBroker = () => {
        console.log(this.refs.option.value);
        if (subscription) {
            subscription.unsubscribe();
            this.setState({ 
                subscription: false 
            });
            console.log('unsubscribe')
        }
        subscription = client.subscribe(`/exchange/topics/api.${this.refs.option.value}`, (message) => {
            console.log('subscribe')
            let newMessage = this.state.changes;
            newMessage.push(JSON.parse(message.body));
            this.setState({
                changes: newMessage,
            });
            console.log(this.state.changes)
        }, { durable: false, 'auto-delete': true });
        console.log(subscription)
    }
}

export default Monitor;