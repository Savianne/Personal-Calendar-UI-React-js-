const editEventFormReducer = (state = {state: false, event_id: null}, action) => {
    switch(action.type) {
        case 'EDIT_EVENT':
            state = {state: true, event_id: action.payload}
            return state;
            break;
        case 'CLOSE_EDIT_EVENT_FORM':
            state = {state: false, event_id: null};
            return state;
        break;
        default:
            return state;
    }
}

export default editEventFormReducer;