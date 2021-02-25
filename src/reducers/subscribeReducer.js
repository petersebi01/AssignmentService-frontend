const initialState = {
    subscriptionToPrivatChat: null,
    subscriptionToGroupChat: null,
    subscriptionToNews: null,
    subscriptionToMonitor: null
};

const subscribeReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SUBSCRIBE_TO_NOTIFICATIONS':
            //return { ...state, subscriptions: [state.subscriptions, action.payload] };
            return { subscriptionToNotifications: action.payload };
        default:
            return state;
    }
}

export default subscribeReducer;