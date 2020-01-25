import React from 'react';
import gql from 'graphql-tag';
import Progress from "../Loading";
import { Container, List, ListItem } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
const FullRepository = (props)=>{
    const query = gql`
    query{
        repository(name: "${props.match.params.name}", owner: "${props.match.params.login}") {
          createdAt
          assignableUsers {
            totalCount
          }
          description
          diskUsage
          forkCount
          homepageUrl
        }
    }`
    const {loading, error, data} = useQuery(query);
    let content = "";
    if(!loading && !error){
        const info = data.repository
        content = 
        <React.Fragment>
            <List>
                <ListItem>Owner Login: {props.match.params.login}</ListItem>
                <ListItem>Description:{info.description}</ListItem>
                <ListItem>Assignable Users: {info.assignableUsers.totalCount}</ListItem>
                <ListItem>Fork Count: {info.forkCount}</ListItem>
                <ListItem>Disk Usage: {info.diskUsage}</ListItem>
                <ListItem>Created At: {info.createdAt}</ListItem>
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
export default FullRepository