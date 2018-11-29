import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userAuthData: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_AUTH_DATA:
            return {
                ...state,
                userAuthData: action.userAuthData
            };  
        default:
            return state;
    }
};

export default reducer;