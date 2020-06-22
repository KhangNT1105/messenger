import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import avt1 from '../../img/avt1.jpg'
import './ChatSidebar.scss'
import { connect } from 'react-redux';
import { getUserByUsername } from '../../redux/action/UserAction';
const GET_ROOM = gql`
query GetRoom($id:Float!){
    getRoom(id:$id){
        messages{
                  text
                 user{
                     username
                        }
                }
         users{
               user{
                   username
                }
              }
                }
    }
`
export function ChatSidebar(props) {
    // const { loading, error, data, refetch } = useQuery(GET_ROOM, {
    //     variables: { id: 1 }
    // })
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>{error}</p>
    // useEffect(() => {
    //     (() => {
    //         refetch();
    //     })()
    // }, [data])
    useEffect(() => {
        console.log(props);
        props.getUserByUsername(localStorage.getItem("username"))
    }, [])

    const renderListFriend = () => {
        const { rooms, username, data } = props.userLogin;
        let usernameArr = [];
        if (data) {
            usernameArr = data.map((item) => item.members.filter(item2 => item2.username !== username));
        }
        console.log(data);
        // const usernameArr = props.userLogin.data ? props.userLogin.data.member.filter(item => item.username !== props.userLogin.username) : [];
        if (rooms) {
            return rooms.map((item, index) => {
                return <li className="listFiend__item">
                    <Link className="item item1" to={`/messenger/${item.id}`} >
                        <img src={avt1} alt="" />
                        <div className="name">
                            <h3>{usernameArr[index][0] ? usernameArr[index][0].username : ''}</h3>
                        </div>
                    </Link>
                </li>
            })
        }
    }
    return (
        <div className="chatSidebar">
            {/* {Hello()} */}
            <div className="listChat">
                <div className="listChat__title">
                    <h1>Chat </h1>
                </div>
                <ul className="listFriend">
                    {renderListFriend()}

                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userLogin: state.UserReducer.userLogin,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getUserByUsername: (username) => dispatch(getUserByUsername(username))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatSidebar)