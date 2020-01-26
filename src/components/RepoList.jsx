import React from "react"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Progress from "./Loading";
import { Container, List, Divider, ListItem } from '@material-ui/core';
import PreviewRepository from "./repo/repoPre"
import { Link } from 'react-router-dom'
const RepoList = ({name})=>{
    const query = gql`
        query {
        search(query: "${name}", type: REPOSITORY, first: 50) {
          nodes {
            ... on Repository {
              name
              id
              viewerHasStarred
              stargazers{
                totalCount
              }
              owner {
                login
              }
            }
          }
        }
    }`
    
    const {loading, error, data} = useQuery(query);
    let list = ''
    
    if(!loading && !error){
        const listOfData = data.search.nodes
        list = listOfData.map((element, key)=> {
            return  <ListItem key={key}><List>
                      <ListItem><PreviewRepository name={element.name} id = {element.id} viewerHasStarred={element.viewerHasStarred}
                      totalCount = {element.stargazers.totalCount} login={element.owner.login}/></ListItem>
                      <ListItem><Link to={`/user/${element.owner.login}/${element.name}`}>More...</Link></ListItem>
                      <ListItem><Divider variant="fullWidth"/></ListItem>
                   </List>
                   </ListItem>
        })
    }
    return(
        <Container>
            Repos
            <List>{list}</List>
            {loading&& (<div><Progress/></div>)}
            {error && <div>Error! {error.message}</div>}
        </Container>
    )
}
export default RepoList