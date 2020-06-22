import * as axios from 'axios'
import * as swal from 'sweetalert2';
import { ActionType } from '../constant/UserConstant';
export const Login = (credentials) => {
    return dispatch => {
        console.log(credentials);
        axios({
            method: 'post',
            url: 'http://localhost:4000/auth/signin',
            data: credentials
        }).then((data) => {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("username", data.data.username);
            console.log(data.data);
            dispatch({
                type: ActionType.LOGIN,
                data: data.data,
            })
            swal.fire({
                icon: 'success',
                title: 'Login Successfully',
            })
        }).catch((err) => {
            console.log(err.response);
            swal.fire({
                icon: 'error',
                title: "Opps...",
                text: err.response.data.message
            })
        })
    }
}
export const SignUp = (credentials) => {
    return dispatch => {
        axios({
            url: 'http://localhost:4000/auth/signup',
            method: 'post',
            data: credentials
        }).then((data) => {
            console.log(data);
            swal.fire({
                icon: 'success',
                title: 'Signup Successfully'
            })
        }).catch(err => {
            console.log(err);
            swal.fire({
                icon: 'error',
                title: "Opps...",
                text: err.response.data.message
            })
        })
    }
}
export const getUserLoginByID = (id) => {
    return dispatch => {
        axios({
            url: `http://localhost:4000/auth/finduserid/${id}`,
            method: 'get'
        }).then(result => {
            dispatch({
                type: ActionType.GET_USER_LOGIN_BY_ID,
                data: result.data,
            })
        }).catch(err => {
            console.log(err.response.data.message);
        })
    }
}
export const getUserByUsername = (username) => {
    return dispatch => {
        axios({
            url: `http://localhost:4000/auth/findusername/${username}`,
            method: 'get'
        }).then(result => {
            dispatch({
                type: ActionType.GET_USER_LOGIN_BY_USERNAME,
                data: result.data,
            })
        }).catch(err => {
            // console.log(err.response.data.message);
        })
    }
}
export const findUserByUsername = (username) => {
    return dispatch => {
        axios({
            url: `http://localhost:4000/auth/findusername/${username}`,
            method: 'get'
        }).then(result => {
            dispatch({
                type: ActionType.FIND_USER_BY_USERNAME,
                data: result.data,
            })
        }).catch(err => {
            console.log(err.response.data.message);
        })
    }
}
export const connectToUser = (username) => {
    console.log("zo day dc oi")
    return dispatch => {
        axios({
            url: 'http://localhost:4000/auth/connectuser',
            method: 'patch',
            data: username,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(result => {
            console.log("data", result.data);
            swal.fire({
                icon: 'success',
                title: 'Successfully'
            })
            dispatch(getUserByUsername(localStorage.getItem("username")))
        }).catch(err => {
            console.log("err", err);
            swal.fire({
                icon: 'error',
                title: 'Opps...',
                text: err.response.data.message,
            })
        })
    }
}
export const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    return dispatch => {
        dispatch({
            type: ActionType.LOGOUT,
            data: false
        })
    }
}