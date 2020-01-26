import React from 'react';
import './App.css';
import UserPage from './components/user/loginedUser'
import ListWithSearch from './components/ListWithSearch'
import { connect } from 'react-redux'
import FullUserInformation from './components/user/FullUserInformation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import FullRepository from "./components/repo/repoFull"
const App = (props) => {
        return ( 
            <BrowserRouter>
                <Switch >
                    <Route exact path = "/" component={ListWithSearch}/>
                    <Route exact path="/user/:login/" component={FullUserInformation}/>
                    <Route exact path="/user/:login/:name" component={FullRepository}/>
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