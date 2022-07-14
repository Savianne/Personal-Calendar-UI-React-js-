
const themeModeReducer = (state = 'light', action) => {
    switch(action.type) {
        case 'LIGHT_MODE':
            state = 'light';
            return state;
        break;
        case 'DARK_MODE':
            state = 'dark';
            return state;
        break;
        default:
            return state;
    }
}

export default themeModeReducer;