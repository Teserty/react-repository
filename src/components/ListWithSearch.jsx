import React, {useState} from "react"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Progress from "./Loading";
import {TextField, Select, MenuItem, IconButton, Container } from '@material-ui/core';
import repoPre from "./repo/repoPre"
import PreviewRepository from "./repo/repoPre"

const ListWithSearch = (props)=>{
    const [name, setName] = useState('twitter')
    const STAR_REPOSITORY = gql`
        mutation($id: ID!) {
            addStar(input: { starrableId: $id }) {
                starrable {
                    id
                    viewerHasStarred
                }
            }
        }
    `;

    const searchQuery = gql`
    query{
        organization(login: "${name}") {
            repositories(first: 100) {
                edges {
                    node {
                        name,
                        url,
                        owner{
                            login
                        },
                        viewerHasStarred,
                        stargazers{
                            totalCount
                        }
                    }
                }
            }
        }
    }`
    const selectorChange = (event) => {
        //console.log(event.target.value)
    }
    const {loading, error, data} = useQuery(searchQuery); 
    let list = ''
    if(!loading && !error){
        const listOfData = data.organization.repositories.edges
        list = listOfData.map((element, key)=> {
            return <PreviewRepository key={key} name={element.node.name}
            viewerHasStarred={element.node.viewerHasStarred}
             sCount = {element.node.stargazers.totalCount}/>
        })
        console.log(listOfData)
    }
    return(
        <Container>
            <Container>
                <TextField variant="outlined" value={name} onChange={event => {
                    setName(event.target.value)
            }}/>
                <Select defaultValue="user" onChange={selectorChange}>
                <MenuItem value="user" >
                    <em>Users</em>
                </MenuItem>
                <MenuItem value="repo">
                    <em>Repos</em>
                </MenuItem>
                </Select>
                <IconButton onClick={() => {}}>Search</IconButton>
            </Container>
            <Container>{list}</Container>
            
            {loading&& (<div><Progress/></div>)}
            {error && <div>Error! {error.message}</div>}
        </Container>
    )
}
export default ListWithSearch