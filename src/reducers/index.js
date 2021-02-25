import {combineReducers} from 'redux';

import authReducer from './authReducer';
import connectReducer from './connectReducer';
import subscribeReducer from './subscribeReducer';
import messageReducer from './messageReducer';
import workReducer from './workReducer';

 const reducers = combineReducers({
    loggedIn: authReducer,
    connectedToBroker: connectReducer,
    subscribedTo: subscribeReducer,
    messageReducer,
    workReducer
 });

 export default reducers;