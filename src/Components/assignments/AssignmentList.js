import React from 'react';
import { Link } from 'react-router-dom';

function AssignmentList(props) {
    return(
        <div>
            <Link to={`/api/assignments/${props.assignment.assignmentId}`}>
                <li className="resourceList">
                    <table>
                        <thead>
                            <tr>
                                <th>Beosztás</th>
                                <th>Határidő</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.assignment.assignmentName}</td>
                                <td>{props.assignment.FinishDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </Link>
        </div>
    );
}

export default AssignmentList;
