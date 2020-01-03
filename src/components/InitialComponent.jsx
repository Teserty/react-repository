import React, {useState} from 'react'
import App from '../App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {TextField, Button} from "@material-ui/core/"
import { store } from '../store/configureStore'
import { Provider } from 'react-redux'
const InitialComponent = (props)=>{
    let t_token;
    const [token, setToken] = useState("");
    const httpLink = {
        uri: 'https://api.github.com/graphql',
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const client = new ApolloClient({
        link: new HttpLink(httpLink),
        cache: new InMemoryCache()
    });
    if(token === ""){
        return(
            <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={t_token} onChange={(event)=> {t_token=event.target.value}}/>
                <Button variant="contained" onClick={()=>{setToken(t_token)}}>Accept Token</Button>
            </div>
        )
    }else{
        return(
        <Provider store = { store } >
            <ApolloProvider client = { client } >
            <App token = { token }/> 
            </ApolloProvider>
        </Provider>
    )}
}
export default InitialComponent