//This module will combine our reducers all together
import { combineReducers } from "redux";

//REDUCERS
import themeModeReducer from "./reducers/theme-mode-reducer";
import snackbarReducer from "./reducers/snackbar-reducer";
import eventListReducer from "./reducers/event-list-reducers";
import editEventFormReducer from "./reducers/edit-form-reducer";
import userAuthReducer from "./reducers/user-auth-reducer";
import backdropLoadingIndicatorReducer from "./reducers/backdrop-loading-indicator-reducer";

const combined_reducers = combineReducers({
    themeModeReducer,
    snackbarReducer,
    eventListReducer,
    editEventFormReducer,
    userAuthReducer,
    backdropLoadingIndicatorReducer,
});

export default combined_reducers;