import React from 'react';
import { Link } from 'react-router-dom';

class TaskDetails extends React.Component{
    
    constructor(props) {
        super(props);
        
        this.taskIdRef = React.createRef();
        this.taskNameRef = React.createRef();
        this.taskDescriptionRef = React.createRef();
    }

    state = {
        task: null,
        showFrom: false
    }
    componentDidMount(){
        this.findTaskById();
    }
    render() {
        return(
            <div>
                <div className="card">
                    {(this.state.task !== null) ?
                    <div>
                        <h1>{this.state.task.taskName} adatai</h1>
                        <p className="details">Feladat neve: {this.state.task.taskName}</p>
                        <p className="details">Feladat leírása: {this.state.task.taskDescription}</p>
                        <p className="details">ID: {this.state.task.taskId}</p>
                        <Link to={`/api/tasks/${this.props.match.params.task}/assignments`}>
                            <p>Feladathoz tartozó beosztások megtekintése</p>
                        </Link>
                        <Link to={`/api/tasks/${this.props.match.params.task}/employees`}>
                            <p>Feladatra jelentkezett alkalmazottak megtekintése</p>
                        </Link>
                    </div> : <p>A keresett feladat nem létezik</p>}
                    <p>
                        <button id="update" onClick={this.handleShow}>Adatok szerkesztése</button>
                        <button id="delete" onClick={this.deleteTask}>Feladat törlése</button>
                    </p>
                </div>

                {this.state.showForm ? (
                <div className="form-content">
                    <form onSubmit={this.updateTask}>
                        <h3>Feladat szerkesztése</h3>
                        <div className="container">
                            <label>Feladat ID:</label>
                            <input type="text" name="taskId" ref={this.taskIdRef} defaultValue={this.state.task.taskId} />
                            <br/>
                            <label>Feladat neve:</label>
                            <input type="text" name="name" ref={this.taskNameRef} defaultValue={this.state.task.taskName} />
                            <br/>
                            <label>Leírás:</label>
                            <input type="text" name="description" ref={this.taskDescriptionRef} defaultValue={this.state.task.taskDescription} />
                            <br/>
                            <input className="signupbtn" type="submit" value="Mentés"/>
                        </div>
                    </form>
                </div>
                ) : (<p></p>)}
            </div>
        );
    }

    handleShow = () => {
        if (this.state.showForm) {
            this.setState({showForm: false});
        } else {
            this.setState({showForm: true});
        }
    }

    findTaskById = () => {
        fetch(`/api/tasks/${this.props.match.params.task}`, { 
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                task: jsonFile
            });
        });
    }

    updateTask = event => {
        event.preventDefault();

        let form = {
            taskId: this.taskIdRef.current.value,
            taskName: this.taskNameRef.current.value, 
            taskDescription: this.taskDescriptionRef.current.value
        }

        console.log(form);
        console.log(JSON.stringify(form));
        console.log(this.props.match.params.task);

        fetch(`/api/tasks/${this.props.match.params.task}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(this.findTaskById());
    }

    deleteTask = () => {
        fetch(`/api/tasks/${this.props.match.params.task}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.text();
        }).then(() => {
            this.props.history.push('/api/tasks');
        });  
    }
}

export default TaskDetails;