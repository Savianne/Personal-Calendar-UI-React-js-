const eventListReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_EVENT_LIST':
            state = [...action.payload]
            return state;
        break;
        case 'ADD_ONE_ITEM_TO_EVENT_LIST':
            state = [...state, action.payload];
            return state;
        break;
        case 'REMOVE_ONE_ITEM_IN_EVENT_LIST':
            state = state.filter(item => !(item.event_id === action.payload))
            return state;
        break;
        case 'EDIT_ONE_ITEM_IN_EVENT_LIST':
            state = state.map(item => {
                if(item.event_id === action.payload.event_id) {
                    return action.payload;
                }

                return item
            });
            return state;
        break;
        default:
            return state;
    }
}

export default eventListReducer;