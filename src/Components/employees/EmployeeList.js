import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeList(props){

    return(
        <div>
            <Link to={`/api/employees/${props.employee.employeeId}`}>
                <li className="resourceList">
                    <table>
                        <thead>
                            <tr>
                                <th>Név</th>
                                <th>Beosztás</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.employee.firstname} {props.employee.lastname}</td>
                                <td>{props.employee.permissionID}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </Link>
        </div>
    );
}

export default  EmployeeList;