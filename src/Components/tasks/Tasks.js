import React from 'react';

import TaskList from './TaskList';

class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.taskNameRef = React.createRef();
        this.taskDescriptionRef = React.createRef();
    }

    state = {
        tasks: [],
    }

    componentDidMount() {
        if (this.props.location.search !== null) {
            this.findTasksByQueryString();
        } else {
            this.findAllTasks();
        }
    }

    render() {

        let tasks = this.state.tasks;
        
        if (tasks.length > 0) {
            tasks = tasks.map((task, id) => {
                return(
                    <TaskList task={task} key={id}/>
                );
            });
        }

        return (
            <div className="taskList">
                <form onSubmit={this.findTasksByQueryString}>    
                    <select ref="option" name="taskStatus">
                        <option value="">Minden feladat</option>
                        <option value="now">Folyamatban levő feladatok</option>
                        <option value="done">Befejezett feladatok</option>
                        <option value="future">Függő feladatok</option>
                    </select>
                    <input type="submit" value="Szűrés"/>
                </form>
                <h1>Feladatok:</h1>
                <br/>
                <ul>{tasks}</ul>  
                <div className="form-content">
                    <h2>Feladat létrehozása</h2>
                    <form onSubmit={this.handleRegistration}>
                        <div className="container">
                            <label>Feladat neve</label>
                            <input type="text" name="taskName" ref={this.taskNameRef} required/>
                            <br/>
                            <label>Leírás</label>
                            <input type="text" name="description" ref={this.taskDescriptionRef} />
                            <br/>
                            <input className="signupbtn" type="submit" value="Közzététel"/>
                        </div>
                    </form>
                </div>  
            </div>
        );
    }

    findAllTasks = () => {
        fetch('/api/tasks/', { 
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                tasks: jsonFile
            })
        });
    }

    findTasksByQueryString = () => {
        fetch(`/api/tasks${this.props.location.search}`, { 
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                tasks: jsonFile
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

    handleRegistration = event => {
        event.preventDefault();

        let form = {
            taskName: this.taskNameRef.current.value, 
            taskDescription: this.taskDescriptionRef.current.value
        }

        console.log(form);
        console.log(JSON.stringify(form));

        fetch('/api/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(() => {
            if (this.props.location.search !== null) {
                this.findTasksByQueryString();
            } else {
                this.findAllTasks();
            }
        });
    }
}

export default Tasks;