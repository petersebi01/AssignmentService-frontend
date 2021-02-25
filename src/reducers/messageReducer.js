const initialState = {
    messages: []
}

const messageReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload]};
        case 'REMOVE_MESSAGE':
            return { ...state, messages: [...state.messages.filter(message => message !== action.payload)] };
        default:
            return state;
    }
}

export default messageReducer;