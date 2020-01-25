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
                    <Route exact path = "react-repository/" component={ListWithSearch}/>
                    <Route exact path="react-repository/user/:login/" component={FullUserInformation}/>
                    <Route exact path="react-repository/user/:login/:name" component={FullRepository}/>
                    <Route path="react-repository/user/" component={UserPage}/>
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