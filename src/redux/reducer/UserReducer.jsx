import { ActionType } from '../constant/UserConstant'
const initialState = {
    isLogin: localStorage.getItem("accessToken") ? true : false,
    userLogin: {}
}



export const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.LOGIN: state.isLogin = true;
            state.userLogin = action.data;
            return { ...state };
        case ActionType.GET_USER_LOGIN_BY_ID: state.userLogin = action.data;
            return { ...state };
        case ActionType.GET_USER_LOGIN_BY_USERNAME: state.userLogin = action.data;
            return { ...state };
        case ActionType.FIND_USER_BY_USERNAME: state.userLogin = action.data;
            return { ...state };
        case ActionType.LOGOUT: state.isLogin = action.data;
            return { ...state };
        default:
            return state
    }
}
