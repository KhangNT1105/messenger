import React, { useState, useEffect } from 'react'
import './MessengerModal.scss'
import { connect } from 'react-redux';
import { connectToUser } from '../../../redux/action/UserAction';
import { FiEdit } from 'react-icons/fi'
export function MessengerModal(props) {
    const [state, setstate] = useState({
        "username": ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        props.connectToUser(state);
    }
    useEffect(() => {
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setstate({
            ...state, [name]: value,
        })
        console.log("value", state);
    }
    return (
        <div className="modalInput">
            <button type="button" className="btn btn-primary connect" data-toggle="modal" data-target="#exampleModalLong">
                <FiEdit />
            </button>
            <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} >
                                <input placeholder="Input Username" name="username" onChange={handleChange} type="text" />
                                <div className="buttonConnect">
                                    <button className="btn btn-primary" >Connect</button>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        connectToUser: (username) => {
            dispatch(connectToUser(username))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessengerModal)