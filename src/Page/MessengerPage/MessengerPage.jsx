import React, { useEffect, useState, useRef } from 'react'
import './MessengerPage.scss'
import { connect } from 'react-redux'
import { getUserLoginByID, getUserByUsername, logOut } from '../../redux/action/UserAction'
import { useQuery, useSubscription, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
const GET_ROOM = gql`
 query GetRoom($id:Float!){
    getRoom(id: $id){
      id
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
const MESSAGES_SUBSCRIPTION = gql`
subscription SubscriptNewMessage($roomID:Float!){
    subscriptNewMessage(roomID:$roomID){
    text
    user{
      username
    }
  }
}
`
const CREATE_MESSAGE = gql`
mutation CreateMessage($roomID:Float!,$text:String!){
    createMessage(messageInput: { roomID : $roomID , text:$text } ) {
        id
        text
    }
}
`
export function MessengerPage(props) {
    const conversation = useRef(null);
    const [createMessage] = useMutation(CREATE_MESSAGE);
    const [messages, setmessages] = useState([])
    const { data, loading, error, refetch, variables } = useQuery(GET_ROOM, {
        variables: { id: parseFloat(props.match.params.id) }
    })
    const subscriptNewMessage = useSubscription(MESSAGES_SUBSCRIPTION, {
        variables: { roomID: parseFloat(props.match.params.id) },
        shouldResubscribe: true,


    })


    useEffect(() => {
        async function fetchData() {
            console.log("messasda", messages)
            if (data) {
                refetch();
                setmessages(data.getRoom.messages)
            }
            // return () => {
            //     subscriptNewMessage.data.subscriptNewMessage = [];

            // }
        }
        fetchData();
    }, [props.match, data, subscriptNewMessage.data])
    // useEffect(() => {
    //     if (data) {
    //         setmessages(data.getRoom.messages)
    //     }

    // }, [data])

    //update message when subscription trigger
    // useEffect(() => {
    //     if (subscriptNewMessage.data) {
    //         console.log("subscript: ", subscriptNewMessage.data.subscriptNewMessage)
    //         let newMessage = [...messages, subscriptNewMessage.data.subscriptNewMessage];
    //         setmessages(newMessage);

    //     }
    //     return () => {
    //     }
    // }, [subscriptNewMessage.data])
    useEffect(() => {
        if (!props.isLogin) props.history.push('/login')

    }, [props.isLogin])

    // scroll bottom when the message update
    useEffect(() => {
        if (conversation.current) {
            updateScroll();

        }
    }, [messages])
    function updateScroll() {
        // console.log(conversation.current.style);
        // console.log(conversation.current.scrollHeight)
        conversation.current.scrollTop = conversation.current.scrollHeight + 40;
        // console.log(conversation.current.scrollTop)
        // console.log(conversation.current.clientHeight)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.querySelector('input').value;
        createMessage({ variables: { roomID: parseFloat(props.match.params.id), text } })
        e.target.reset();
    }


    return (
        <div className="messengerPage">

            <div className="conversation" ref={conversation}>
                {loading ? <h1>Loading.....</h1> : ''}
                <div className="conversation__content">
                    {messages.map((item) => {
                        if (item.user.username === localStorage.getItem("username")) {
                            return <div className="currentUser">
                                <div className="userText ">
                                    <span>{item.text}</span>
                                </div>
                            </div>
                        } else return <div className="otherUser">
                            <div className="userText">
                                <span>{item.text}</span>
                            </div>
                        </div>
                    })}
                </div>

            </div>
            <div className="messengerPage__footer">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nhập tin nhắn... " />

                </form>
            </div>


        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userLogin: state.UserReducer.userLogin,
        isLogin: state.UserReducer.isLogin,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoginByID: (id) => {
            dispatch(getUserLoginByID(id));
        },
        getUserLoginByUsername: (username) => {
            dispatch(getUserByUsername(username))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessengerPage)