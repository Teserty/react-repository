import React from 'react';
import gql from 'graphql-tag';
import Progress from "../Loading";
import { Container, Avatar, ListItemText, ListItemAvatar, List, ListItem } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom'
const FullUserInformation = (props)=>{
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
              login
              name
            }
          }
          projects(first: 10) {
            nodes {
              name
              owner {
                ... on User {
                  login
                }
                ... on Organization {
                  login
                }
              }
            }
          }
        }
      }`
      /*const searchUsersRepos = gql`
      query{
        search(type: REPOSITORY, first: 10, query: "sferik") {
            edges {
              node {
                ... on Repository {
                  name
                }
                ... on App {
                  name
                }
              }
            }
          }
      }`*/
      
      //const {l2, e2, d2} = useQuery(searchUsersRepos);
      //if(!l2 && !e2){
        //console.log(d2)
        //{projectslist.length > 0 &&<ListItem>Projects  <List>{projectslist}</List></ListItem>}
        //{projectslist.length === 0 &&<ListItem>No projects found</ListItem>}
      //}
    const {loading, error, data} = useQuery(query);
    let content = "";
    let followersList = '';
    //let projectslist ='';
    if(!loading && !error){
        const info = data.user
        //console.log(info)
        /*projectslist = info.projects.nodes.map((element, key)=>{
          return( <ListItem key={key}>
            <ListItemText><Link to={`/user/${element.owner.login}/${element.name}`}>{element.name}</Link></ListItemText>
          </ListItem>)
        })*/
        followersList = info.followers.nodes.map((element, key)=>{
          return( 
          <ListItem key={key}>
                <ListItemAvatar>
                   <Avatar  src={`${element.avatarUrl}`}/>
                </ListItemAvatar>
                <ListItemText><Link to={`/user/${element.login}`}>{element.login}</Link></ListItemText>
          </ListItem>)
        })
        //console.log(info.projects.nodes)
        content = 
        <React.Fragment>
          <Container maxWidth="xs">
            <Avatar src={info.avatarUrl}/>
            <List>
                <ListItem>Login: {info.login}</ListItem>
                <ListItem>Created at:{info.createdAt}</ListItem>
                <ListItem>Company: {info.company}</ListItem>
                <ListItem>Bio: {info.bio}</ListItem>
                <ListItem>Name: {info.name}</ListItem>
                <ListItem>Location: {info.location}</ListItem>
                {followersList.length > 0 && <ListItem>Followers<List>{followersList}</List></ListItem>}
                {followersList.length === 0 && <ListItem>No followers found</ListItem>}
                
            </List>
            </Container>
        </React.Fragment>
    }
    return(
        <Container fixed>
          <Link to="/">Go to search</Link>
        {content}
        {loading&& (<div><Progress/></div>)}
        {error && <div>Error! {error.message}</div>}
        </Container>
    )
}
export default FullUserInformation