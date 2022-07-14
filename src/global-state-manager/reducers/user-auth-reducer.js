const userAuthReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_UNAUTHENTICATED':
            state = 'unauthenticated'
            return state;
            break;
        case 'SET_AUTHENTICATED':
            state = 'authenticated';
            return state;
        break;
        default:
            return state;
    }
}

export default userAuthReducer;