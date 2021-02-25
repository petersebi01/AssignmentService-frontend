import React from 'react';

function MyChat(props) {

    return(
        <div className="me">
            <li>
                <h1>{props.username}</h1>
                <p>{props.message}</p>
                <span className="time-right">{props.time}</span>
            </li>
        </div>
    );
}

export default MyChat;