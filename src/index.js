import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { split } from 'apollo-link'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducer/index';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws'
const store = createStore(rootReducer, applyMiddleware(thunk));

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: localStorage.getItem("accessToken") ? 'Bearer ' + localStorage.getItem("accessToken") : '',
    }
  }
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken");
  console.log("token in index.js", token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);



const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>

    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,

  document.getElementById('root')
);
// client.query({
//   query: gql`
//   query GetRoom{
//     getRoom(id:1){
//       id
//       users{
//     user{
//       username
//     }
//   }
//     }
//   }
//   `
// }).then(res => console.log("res", res))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
