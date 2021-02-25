import React from 'react';

class AssignmentTask extends React.Component {

    state = {
        task: null
    }

    componentDidMount() {
        this.findAssignedTask();
    }

    render() {
        return (
            <div>
                {(this.state.task !== null) ?
                <div>
                    <h2>Feladat részletei:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Feladat ID</th>
                                <th>Feladat neve</th>
                                <th>Feladat leírása</th>
                                <th>Határidő</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.task.taskId}</td>
                                <td>{this.state.task.taskName}</td>
                                <td>{this.state.task.taskDescription}</td>
                                <td>{this.state.task.expirationDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>: <p>Nem  jeleníthetőek meg a részletek.</p>}
            </div>
        );
    }

    findAssignedTask = () => {
        fetch(`/api/assignments/${this.props.match.params.assignment}/task`, {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            console.log(jsonFile);
            this.setState({
                task: jsonFile
            });
        });
    }
}

export default AssignmentTask;