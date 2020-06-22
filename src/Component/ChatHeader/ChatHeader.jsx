import React, { useEffect } from 'react'
import './ChatHeader.scss'
import { connect } from 'react-redux'
import { getUserByUsername, logOut } from '../../redux/action/UserAction';
export function ChatHeader(props) {
    const handleLogOut = () => {
    
        props.logOut();
    }
    useEffect(() => {
        console.log("props", props);
    }, [])
    return (
        <div className="chatHeader">
            <div className="chatHeader__content">
                <h2>Phương Khá</h2>
                <p className="logout" onClick={handleLogOut}>Đăng xuất</p>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getABC: (username) => {
            dispatch(getUserByUsername(username))
        },
        logOut: () => {
            dispatch(logOut());
        }
    }
}
export default connect(null, mapDispatchToProps)(ChatHeader)
