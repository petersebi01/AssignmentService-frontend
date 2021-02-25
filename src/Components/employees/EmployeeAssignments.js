import React from 'react';
import AssignmentList from '../assignments/AssignmentList';

import { Link } from 'react-router-dom';

class EmployeeAssignments extends React.Component{
    state = {
        assignments: []
    }
    componentDidMount(){
        this.findEmployeeAssignments();
    }
    render(){

        let assignments = this.state.assignments;
        if (assignments.length > 0) {
            assignments = assignments.map((assignment, id) => {
                return(
                    <AssignmentList assignment={assignment} key={id}/>
                );
            });
        }

        return(
            <div>
                {(this.state.assignments.length > 0) ?
                <div>
                    <p>Alkalmazott feladatai:</p>
                    <ul>{assignments}</ul>
                </div>: <p>Nincsenek feladatok.</p>}
                <br />
                <Link to={`/api/assignments`}>
                    <h3>Felvehető munkák</h3>
                </Link>
            </div>
        );
    }

    findEmployeeAssignments = () => {
        console.log(this.state.assignments);
        fetch(`/api/employees/${this.props.match.params.employee}/assignments`, {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                assignments: jsonFile
            });
            console.log(this.state.assignments);
        });
    }
}

export default EmployeeAssignments;