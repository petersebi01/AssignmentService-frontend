import React from 'react';

import { removeMessageFromAck, removeWorkFromAccept } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

function WorkList(props){

    let messages = useSelector(state => state.messageReducer.messages);
    const dispatch = useDispatch();

    const handleAccept = () => {
        
        fetch('/api/works', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(props.work)
        }).then(response => {
            console.log(response.text());
            console.log(messages[props.messageID]);
            messages[props.messageID].ack();
            dispatch(removeMessageFromAck(messages[props.messageID]));
            dispatch(removeWorkFromAccept(messages[props.messageID]));
        });
        
    }

    const handleDecline = () => {
        messages[props.messageID].ack();
        dispatch(removeMessageFromAck(messages[props.messageID]));
        dispatch(removeWorkFromAccept(messages[props.messageID]));
    }

    return(
        <div>
            <li className="resourceList">
                <table>
                    <thead>
                        <tr>
                            <th>Beosztás:</th>
                            <th>Leírás:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.work.employeeID}</td>
                            <td>{props.work.assignmentID}</td>
                            <td><button onClick={handleAccept}>&#10004;</button></td>
                            <td><button onClick={handleDecline}>&#10006;</button></td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </div>
    );
}

export default WorkList;