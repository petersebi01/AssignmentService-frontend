import React from 'react';
import { Link } from 'react-router-dom';

import AssignmentList from '../assignments/AssignmentList';

class AssignmentsOnTask extends React.Component{
    state = {
        assignments: []
    }
    componentDidMount(){
        this.findAssignmentsOnTask();
    }
    render() {

        let assignments = this.state.assignments;

        if (this.state.assignments.length > 0) {
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
                    <p>A feladathoz tartozó beosztások:</p>
                    <ul>{assignments}</ul>
                </div> : 
                <div>
                    <p>Ennek a feladatnak még nincsenek beosztásai.</p>
                    <Link to="/api/assignments">Hozzon létre egy beosztást</Link>
                </div>
                }
            </div>
        );
    }

    findAssignmentsOnTask = () => {
        fetch(`/api/tasks/${this.props.match.params.task}/assignments`, { 
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                assignments: jsonFile
            });
        });
        console.log(this.state.assignments)
    }
}

export default AssignmentsOnTask;