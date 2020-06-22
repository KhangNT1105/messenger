import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserByUsername } from '../../redux/action/UserAction'
export function HomePage(props) {
    useEffect(() => {
        console.log(props);
        props.getUserLoginByUsername(localStorage.getItem("username"));
    }, [])
    useEffect(() => {
        console.log("userlogin", props.userLogin);
    }, [props.userLogin])
    return (
        <div>
            <h1>Homepage</h1>
            <Link to={`/messenger/${props.userLogin.rooms ? props.userLogin.rooms[0].id : '5'}`}>Wanna Chat ?</Link>
        </div>
    )
}
const mapStateToProps = (state) => ({
    userLogin: state.UserReducer.userLogin
})
const mapDispatchToProps = (dispatch) => ({
    getUserLoginByUsername: (username) => {
        dispatch(getUserByUsername(username))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)