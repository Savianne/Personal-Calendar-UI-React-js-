const backdropLoadingIndicatorReducer = (state = false,  action) => {
    switch(action.type) {
        case 'CLOSE_BDLI':
            state = false;
            return state;
        break;
        case 'OPEN_BDLI':
            state = true
            return state;
        break;
        default:
            return state;
    }
}

export default backdropLoadingIndicatorReducer;