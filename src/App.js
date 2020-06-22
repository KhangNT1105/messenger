import React from 'react';
import './App.css';
import Auth from './Layout/AuthLayout'
import MessengerPage from './Page/MessengerPage/MessengerPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './Page/LoginPage/LoginPage';
import ChatTemplate from './Layout/ChatTemplate';
import Test from './Page/test/Test';
import HomeTemplate from './Layout/HomeTemplate';
import  HomePage  from './Page/HomePage/HomePage';
function App() {
  return (
    <Router>
      <Switch>
        {/* <Auth exact path="/messenger" Component={MessengerPage} /> */}
        {/* <Auth exact path="/" Component={MessengerPage} /> */}
        <ChatTemplate path="/messenger/:id" Component={MessengerPage} />
        <HomeTemplate exact path="/" Component={HomePage} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/login" component={LoginPage} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
