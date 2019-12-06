import React from 'react';
import './App.css';
import UserPage from './components/user/loginedUser'
import ListWithSearch from './components/ListWithSearch'
import { connect } from 'react-redux'
import {BrowserRouter, Route, Switch}  from 'react-router-dom'
const App = (props) => {
  const {user, photos} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UserPage/>
        </Route>
        <Route exact path="/search">
          <ListWithSearch/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    photos: store.page
  }
}
export default connect(mapStateToProps)(App)
