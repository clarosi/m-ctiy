import * as actionTypes from './actionTypes';

export const setUserAuthData = (userAuthData) => {
    return {
        type: actionTypes.SET_USER_AUTH_DATA,
        userAuthData
    };
}