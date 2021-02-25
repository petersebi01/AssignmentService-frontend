import React from 'react';

function Callout(props) {
    return(
        <div className="callout">
            <div className="callout-header">Callout Header</div>
            <span className="closebtn" onClick={props.ack}>Értettem</span>
            <div className="callout-container">
                <ul>
                    <li>{props.callout.type}</li>
                    <li>{props.callout.info}</li>
                    <li>{props.callout.result}</li>
                </ul>
            </div>
        </div>
    );
}

export default Callout;