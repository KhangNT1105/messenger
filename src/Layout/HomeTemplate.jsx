import React from 'react'
import { Route } from 'react-router-dom'



const HomeLayout = (props) => {
    return (
        <>
            {props.children}
        </>
    )
}
const HomeTemplate = ({ Component, ...props }) => {
    return <Route {...props} render={(componentProps) => {
        return <HomeLayout>
            <Component {...componentProps}></Component>
        </HomeLayout>
    }} />
}
export default HomeTemplate