import React from 'react';
import './App.css';
import UserPage from './components/user/loginedUser'
import ListWithSearch from './components/ListWithSearch'
import { connect } from 'react-redux'
import OverFullUserInformation from './components/user/FullUserInformation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const App = (props) => {
        return ( 
            <BrowserRouter >
                <Switch >
                    <Route exact path = "/" component={ListWithSearch}/>
                    <Route path="/user/:login" component={OverFullUserInformation}/>
                    <Route path="/user/" component={UserPage}/>
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