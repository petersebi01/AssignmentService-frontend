import React from 'react';
import { connect } from 'react-redux';
import Stomp from 'stompjs';

import WorkList from './WorkList';

import { addMessageToAck, addWorkToAccept, removeMessageFromAck, removeWorkFromAccept } from '../../actions';

let client;

class Works extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerFormView: false
        }
        this.openRegistrationForm = this.openRegistrationForm.bind(this);

        this.employeeIdRef = React.createRef();
        this.startDateRef = React.createRef();
        this.assignmentIdRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.location.search === "") {
            this.subscribeToQueue();
        } else {
            this.findWorksByEmployeeId();
        }
    }

    componentWillUnmount() {
        client.disconnect();
    }

    render() {

        let works = this.props.works.works
        if (works.length > 0) {
            works = works.map((work, id) => {
                return(
                    <WorkList work={work} key={id} messageID={id} />
                );
            });
        }

        return(
            <div>
                <h2>Tennivalók:</h2>
                <ul>{works}</ul>
                <div>
                    <button type="button" onClick={this.openRegistrationForm}>Manuális hozzáadás</button>
                    {this.state.registerFormView ? 
                        <div className="form-content">
                            <h2>Hozzáadás manuálisan</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="container">
                                    <label>Alkalmazott:</label>
                                    <input type="text" name="employee" ref={this.employeeIdRef} required/>
                                    <br/>
                                    <label>Beosztás:</label>
                                    <input type="password" name="assignment" ref={this.assignmentIdRef} required/>
                                    <br/>
                                    <label>Kezdés dátuma:</label>
                                    <input type="date" name="startDate" ref={this.startDateRef} required/>
                                    <br/>
                                    <br/>
                                    <input className="signupbtn" type="submit" value="Hozzáadás"/>
                                </div>
                            </form>
                        </div>
                    : ""}
                </div>
            </div>
        );

    }

    subscribeToQueue = () => {
        let userID = `user-${localStorage.getItem('userId')}`;
        console.log(userID)
        client = Stomp.client('ws://localhost:15674/ws');
        client.connect('guest', 'guest', () => {
            client.subscribe(`/amq/queue/a-${userID}`, (message) => {
                console.log(message);
                let assignmentRequest = JSON.parse(message.body);
                console.log(assignmentRequest)
                
                this.props.addWorkToAccept(assignmentRequest);
                this.props.addMessageToAck(message);

            }, {durable: false, 'auto-delete': true, ack: 'client'});
        });
    }

    findAllWorks = () => {
        fetch('/api/works/', {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                employeeWorks: jsonFile
            });
        });
    }

    findWorksByEmployeeId = () => {
        let userId = localStorage.getItem('userId');
        console.log(JSON.stringify(userId));

        fetch(`/api/employees`, {
            body: JSON.stringify(userId)
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                users: jsonFile
            })
        });
    }

    openRegistrationForm = () => {
        if (this.state.registerFormView === false){
            this.setState({
                registerFormView: true
            });
        } else {
            this.setState({
                registerFormView: false
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        let form = {
            employeeID: this.employeeIdRef.current.value,
            assignmentID: this.assignmentIdRef.current.value,
            startDate: this.startDateRef.current.value,
        }

        fetch('/api/works', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(this.findAllWorks());
    }
}

const mapStateToProps = (state) => {
    return {
        connection: state.connectedToBroker,
        messages: state.messageReducer,
        works: state.workReducer
    }
}

const mapDispatchToProps = {
    addMessageToAck,
    addWorkToAccept,
    removeMessageFromAck,
    removeWorkFromAccept
}

export default connect(mapStateToProps, mapDispatchToProps)(Works);