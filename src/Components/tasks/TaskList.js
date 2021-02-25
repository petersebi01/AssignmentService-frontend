import React from 'react';
import { Link } from 'react-router-dom';

function TaskList(props) {

    return(
        <div>
            <Link to={`/api/tasks/${props.task.taskId}`}>
                <li className="resourceList">
                    <table>
                        <thead>
                            <tr>
                                <th>Feladat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.task.taskName}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </Link>
        </div>
    );
}

export default  TaskList;