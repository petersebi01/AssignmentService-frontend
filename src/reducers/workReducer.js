const initialState = {
    works: []
}

const workReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_WORK':
            return { ...state, works: [...state.works, action.payload] };
            //return { subscriptionToNotifications: action.payload };
        case 'REMOVE_MESSAGE':
            return { ...state, works: [...state.works.filter(work => work !== action.payload)] };
        default:
            return state;
    }
}

export default workReducer;