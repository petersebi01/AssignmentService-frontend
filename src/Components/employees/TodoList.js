import React from 'react';
import { Link } from 'react-router-dom';
//import $ from 'jquery';

function TodoList(props) {
        
    return (
        <div>
            <Link to={`/api/assignments/${this.props.todo.assignmentID}`}>
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
                                <td>{this.props.todo.assignmentName}</td>
                                <td>{this.props.todo.FinishDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </Link>
        </div>
    );
}

export default TodoList;