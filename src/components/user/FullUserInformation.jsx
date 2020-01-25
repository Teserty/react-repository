import React from 'react';
import gql from 'graphql-tag';
import Progress from "../Loading";
import { Container, Avatar, List, ListItem } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
const FullUserInformation = (props)=>{
    console.log(props.match.params.login)  
    const query = gql`
    query{
        user(login: "${props.match.params.login}") {
          login
          avatarUrl
          createdAt
          company
          bio
          name
          location
          followers(first: 10) {
            nodes {
              avatarUrl
              id
              login
              name
            }
          }
          projects(first: 10) {
            nodes {
              name
              owner {
                ... on User {
                  id
                  login
                  name
                }
                ... on Organization {
                  id
                  login
                  name
                }
              }
            }
          }
        }
      }`
    const {loading, error, data} = useQuery(query);
    let content = "";
    if(!loading && !error){
        const info = data.user
        console.log(data)
        content = 
        <React.Fragment>
            <Avatar src={info.avatarUrl}/>
            <List>
                <ListItem>Login: {info.login}</ListItem>
                <ListItem>Created at:{info.createdAt}</ListItem>
                <ListItem>Company: {info.company}</ListItem>
                <ListItem>Bio: {info.bio}</ListItem>
                <ListItem>Name: {info.name}</ListItem>
                <ListItem>Location: {info.location}</ListItem>
            </List>
        </React.Fragment>
    }
    return(
        <Container>
        {content}
        {loading&& (<div><Progress/></div>)}
        {error && <div>Error! {error.message}</div>}
        </Container>
    )
}
export default FullUserInformation