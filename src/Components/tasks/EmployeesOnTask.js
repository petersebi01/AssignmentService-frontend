import React from 'react';
import EmployeeList from '../employees/EmployeeList';

class EmployeesOnTask extends React.Component{
    state = {
        employees: []
    }
    componentDidMount(){
        this.findEmployeesOnTask();
    }
    render() {

        let employees = this.state.employees;
        
        if (this.state.employees.length > 0) {
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
                    <p>Felhasználók akik beosztásra kerültek a feladaton belül:</p>
                    <ul>{employees}</ul>
                </div>: <p>Az ehhez a feladathoz tartozó beosztásokra még senki sem jelentkezett.</p>}
            </div>
        );
    }

    findEmployeesOnTask = () => {
        fetch(`/api/tasks/${this.props.match.params.task}/employees`, { 
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                employees: jsonFile
            });
        });
        console.log(this.state.employees)
    }
}

export default EmployeesOnTask;