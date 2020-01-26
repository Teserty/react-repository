import React, {useState} from "react"
import {TextField, Select, MenuItem, Container } from '@material-ui/core';
import RepoList from "./RepoList"
import UserList from "./UserList"
import { Link } from 'react-router-dom'
const ListWithSearch = (props)=>{
    let isUserSearch = true;
    const [name, setName] = useState('twitter')
    const [list, setList] = useState(<RepoList name={name}/>)
    const selectorChange = (event) => {
        event.target.value === "user"? isUserSearch = true: isUserSearch = false 
        console.log(isUserSearch)
        if(isUserSearch){
            setList(<UserList name={name}/>)
        }else{
            setList(<RepoList name={name}/>)
        }
    }
    return(
        <Container>
            <Container>
               
                <TextField variant="outlined" value={name} onChange={event => {
                    setName(event.target.value)
            }}/>
                <Select defaultValue="repo" onChange={selectorChange}>
                <MenuItem value="user" >
                    <em>Users</em>
                </MenuItem>
                <MenuItem value="repo">
                    <em>Repos</em>
                </MenuItem>
                </Select>
            </Container>
            <Link to="/user/">Home...</Link>
            {list}
        </Container>
    )
}
export default ListWithSearch