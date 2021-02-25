import React from 'react';

class ChangeList extends React.Component{

    render(){
        return(
            <div>
                <li className="resourceList">
                    <table>
                        <thead>
                            <tr>
                                <th>Művelet</th>
                                <th>Módosítás dátuma</th>
                                <th>Információk</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.message.type}</td>
                                <td>{this.props.message.date}</td>
                                <td>{this.props.message.info}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </div>
        );
    }
}

export default  ChangeList;