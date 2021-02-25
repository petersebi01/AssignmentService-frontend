const initialState = {
    client: null,
};

const stompConnectReducer = (state = initialState, action) => {
    switch (action.type){
        case 'STOMP_CLIENT':
            return {client: action.payload};
        default:
            return state;
    }
}

export default stompConnectReducer;