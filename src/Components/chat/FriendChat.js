import React from 'react';

function FriendChat(props) {

    return(
        <div className="other">
            <li>
                <h1>{props.username}</h1>
                <p>{props.message}</p>
                <span className="time-left">{props.time}</span>
            </li>
        </div>
    );
}

export default FriendChat;