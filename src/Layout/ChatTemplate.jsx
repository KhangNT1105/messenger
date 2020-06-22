import React, { Fragment } from 'react'
import ChatSidebar from "../Component/ChatSidebar/ChatSidebar"
import ChatHeader from "../Component/ChatHeader/ChatHeader"
import MessengerModal from "../Page/MessengerPage/MessengerModal/MessengerModal"
import { Route } from "react-router-dom"

const ChatLayout = props => {
    return (
        <Fragment>
            <ChatSidebar />
            <ChatHeader />
            {props.children}
            <MessengerModal />
        </Fragment>
    )
}
const ChatTemplate = ({ Component, ...props }) => {
    return <Route {...props} render={componentProps => {
        return <ChatLayout {...componentProps}>
            <Component {...componentProps} />

        </ChatLayout>
    }} />
}
export default ChatTemplate;