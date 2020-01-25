import React from "react"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Progress from "./Loading";
import PreviewUserInformation from "./user/userPre"
import {Container, Divider, ListItem, List } from '@material-ui/core';
import { Link } from 'react-router-dom'
const UserList = ({name})=>{
    const query = gql`
    query{
        search(query: "${name}", type: USER, first: 50) {
            nodes {
                __typename
                ... on User {
                  name
                  login
                  avatarUrl
                  id
                }
                ... on Organization {
                    id
                    login
                    name
                    avatarUrl
                  }
              }
          }
    }`
    const {loading, error, data} = useQuery(query);
    let list = ''
    if(!loading && !error){
        const listOfData = data.search.nodes
        list = listOfData.map((element, key)=> {
            return(  <ListItem key={key}>
                                <PreviewUserInformation  login={element.login} name={element.name} avatarUrl={element.avatarUrl}/>
                                <Link to={`/user/${element.login}/`}>More...</Link>
                                <Divider variant="fullWidth"/>
                    </ListItem>
            )
        })
    }

    return(
        <Container>
            Users
            <List>{list}</List>
            {loading&& (<div><Progress/></div>)}
            {error && <div>Error! {error.message}</div>}
        </Container>
    )
}
export default UserList