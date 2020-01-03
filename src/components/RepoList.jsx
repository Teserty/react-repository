import React from "react"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Progress from "./Loading";
import { Container, List } from '@material-ui/core';
import PreviewRepository from "./repo/repoPre"

const RepoList = ({name})=>{
    const query = gql`
        query {
        search(query: "${name}", type: REPOSITORY, first: 50) {
          nodes {
            ... on Repository {
              name
              id
              url
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
            return <PreviewRepository key={key} name={element.name} id = {element.id} viewerHasStarred={element.viewerHasStarred}
            totalCount = {element.stargazers.totalCount} login={element.owner.login} avatarUrl={element.avatarUrl}
            />
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