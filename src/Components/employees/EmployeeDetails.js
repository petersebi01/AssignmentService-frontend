import React from 'react';
import { Link } from 'react-router-dom';

class EmployeeDetails extends React.Component{
    
    constructor(props) {
        super(props);

        this.userIdRef = React.createRef();
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.firstnameRef = React.createRef();
        this.lastnameRef = React.createRef();
        this.paymentRef = React.createRef();
    }
    
    state = {
        employee: null,
        showFrom: false
    }

    componentDidMount(){
        this.findEmployeeById();
    }
    render() {
        return(
            <div>
                <div className="user-card">
                    {(this.state.employee !== null) ?
                    <div>
                        <h1>{this.state.employee.firstname} {this.state.employee.lastname} adatai</h1>
                        <p className="details">Felhasználónév: {this.state.employee.username}</p>
                        <p className="details">Vezetéknév: {this.state.employee.firstname}</p>
                        <p className="details">Keresztnév: {this.state.employee.lastname}</p>
                        <p className="details">Fizetés: {this.state.employee.payment}</p>
                        <p className="details">Alkalmazott azonosító száma: {this.state.employee.employeeId}</p>
                        <Link to={`/api/employees/${this.props.match.params.employee}/assignments`}>
                            <p>Feladatok megtekintése</p>
                        </Link>
                    </div> : <p>A keresett felhasználó nem létezik</p>}
                    <p>
                        <button id="update" onClick={this.handleShow}>Adatok szerkesztése</button>
                        <button id="delete" onClick={this.deleteEmployee}>Felhasználó törlése</button>
                    </p>
                </div>

                {this.state.showForm ? (
                <div className="form-content">
                    <form onSubmit={this.updateEmployee}>
                        <h3>Felhasználó szerkesztése</h3>
                        <div className="container">
                            <label>Alkalmazott ID:</label>
                            <input type="text" name="user" ref={this.userIdRef} defaultValue={this.state.employee.employeeId} required/>
                            <br/>
                            <label>Vezetéknév:</label>
                            <input type="text" name="firstname" ref={this.firstnameRef} defaultValue={this.state.employee.firstname} required/>
                            <br/>
                            <label>Keresztnév</label>
                            <input type="text" name="lastname" ref={this.lastnameRef} defaultValue={this.state.employee.lastname} required/>
                            <br/>
                            <label>Fizetés:</label>
                            <input type="number" name="payment" ref={this.paymentRef} defaultValue={this.state.employee.payment} required/>
                            <br/>
                            <input className="signupbtn" type="submit" value="Regisztrálás"/>
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

    findEmployeeById = () => {
        fetch(`/api/employees/${this.props.match.params.employee}`, {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                employee: jsonFile
            });
        });
    }

    updateEmployee = event => {
        event.preventDefault();

        let form = {
            employeeId: this.userIdRef.current.value,
            firstname: this.firstnameRef.current.value,
            lastname: this.lastnameRef.current.value,
            payment: this.paymentRef.current.value,
        }

        fetch(`/api/employees/${this.props.match.params.employee}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(this.findEmployeeById());
    }

    deleteEmployee = () => {
        fetch(`/api/employees/${this.props.match.params.employee}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
        }).then(response => {
            return response.text();
        }).then(() => {
            this.props.history.push('/api/employees');
        });  
    }
}

export default EmployeeDetails;