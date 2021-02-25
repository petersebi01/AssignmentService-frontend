import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router-dom';

function NewsFeed(props) {

    let component = null;
    let method = null;
    switch(props.match) {
        case 'tasks':
            component = 'tasks';
            break;
        default:
            component = '...';
    }
    switch(props.method) {
        case 'POST':
            method = 'létrehozta';
            break;
        case 'PUT':
            method = 'fríssítette';
            break;
        case 'PATCH':
            method = 'frissítette';   
            break; 
        case 'DELETE':
            method = 'törölte';
            break;
        default:
            method = '...';
    }
    const handleClick = () => {
        $('newsContainer').slideToggle('slow');
    }
    return (
        <div>
            <Link to={`/api/tasks/${this.props.tasks.taskID}`}>
                <p>{this.props.employee.name} {method} a {this.props.tasks.taskName} feladatot.</p>
            </Link>
            <li className="resourceList">
                <p onClick={handleClick}>Részletek</p>
                <div className="newsContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Név</th>
                                <th>Tevékenység</th>
                                <th>Infó</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.employee.name}</td>
                                <td>{this.props.method}</td>
                                <td>{this.props.tasks.details}</td>
                                <td>{component}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </div>
    );
}

export default NewsFeed;