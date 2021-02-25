import React, { useState } from 'react';

function ChatInput(props) {

    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.print(message);
        console.log(message);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} placeholder="üzenet"/>
                <input type="submit" value="Küldés"/>
            </form>
        </div>
    );
}

export default ChatInput;