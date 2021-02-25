export const stompConnect = (connection) => {
    return {
        type: 'STOMP_CLIENT',
        payload: connection
    }
}

export const subscribeToNotifications = (subscription) => {
    return {
        type: 'SUBSCRIBE_TO_NOTIFICATIONS',
        payload: subscription
    }
}

export const login = () => {
    return {
        type: 'LOGIN'
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const addMessageToAck = (message) => {
    return {
        type: 'ADD_MESSAGE',
        payload: message
    }
}

export const removeMessageFromAck = (message) => {

    return {
        type: 'REMOVE_MESSAGE',
        payload: message
    }
}

export const addWorkToAccept = (work) => {
    return {
        type: 'ADD_WORK',
        payload: work
    }
}

export const removeWorkFromAccept = (work) => {
    return {
        type: 'REMOVE_WORK',
        payload: work
    }
}