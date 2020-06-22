import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
const GET_ROOM = gql`
 query GetRoom($id:Float!){
    getRoom(id: $id){
      id
      users{
         user{
      username
          }
             }
        }
     }  
`
const GET_MESSAGE = gql`
  query getMessages{
    text
  }
`
export default function Test() {
    // const { loading, error, data } = useQuery(GET_ROOM, {
    //     variables: {
    //         aaa: 2
    //     }
    // })
    const { error, data, variables, } = useQuery(GET_ROOM, {

        variables: { id: 1 }
    });
    // if (loading) return <p>Loading....</p>
    // if (error) return <p>{error.message}</p>
    // if (data) { console.log("data", data); }
    // const { loading, error, data } = useQuery(GET_MESSAGE)
    // if (loading) return <p>Loading....</p>
    if (error) return <p>{error.message}</p>
    if (data) { console.log("data", data); }
    if (variables) console.log("va", variables)

    return (
        <div>
            {/* {data} */}
        </div >
    )
}
