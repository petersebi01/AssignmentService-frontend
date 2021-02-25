import React from 'react';
import { connect } from 'react-redux';
import Stomp from 'stompjs';

import EmployeeList from '../employees/EmployeeList';

class AssignmentsEmployee extends React.Component{
    state = {
        employees: [],
        //connection: this.props.connection.client
    }
    componentDidMount(){
        this.findAssignmentsEmployee();
        console.log(this.state.connection)
    }

    
    componentDidUpdate(){
        console.log("componetnDidUpdate");
        console.log(this.state.connection)
    }
    render(){

        let employees = this.state.employees;
        if (employees.length > 0) {
            employees = employees.map((employee, id) => {
                return(
                    <EmployeeList employee={employee} key={id}/>
                );
            });
        }

        return(
            <div>
                {(this.state.employees.length > 0) ?
                <div>
                    <p>Beosztás résztvevői:</p>
                    <ul>{employees}</ul>
                </div>: <p>Nincsenek alkalmazottak ezen a beosztáson.</p>}
                <p>Alkalmazott hozzáadása</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="number" name="employee" ref="employee" />
                    <input type="submit" value="Hozzáadás" />
                </form>
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const date = new Date()
        const dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        
        let form = {
            employeeID: this.refs.employee.value,
            assignmentID: this.props.match.params.assignment,
            startDate: dateTime
        }
        
        console.log(JSON.stringify(form))

        let client = Stomp.client('ws://localhost:15674/ws');
        console.log(client);
        client.connect('guest', 'guest', () => {

            let userID = `user-${this.refs.employee.value}`;
            client.send(`/queue/a-${userID}`, { 'Content-Type': 'application/json' }, JSON.stringify(form));
            
            client.debug = (str) => {
                console.log(str)
            }
            client.disconnect();
        });

    }

    findAssignmentsEmployee = () => {
        console.log(this.state.employees);
        fetch(`/api/assignments/${this.props.match.params.assignment}/employees`, {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                employees: jsonFile
            });
            console.log(this.state.employees);
        });
    }
}

function mapStateToProps(state) {
    return {
        connection: state.connectedToBroker
    }
}

export default connect(mapStateToProps)(AssignmentsEmployee);