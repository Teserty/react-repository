import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Progress from "../Loading"
import { Container, Avatar, List, ListItem, ListItemText } from '@material-ui/core';
const repoQuery = gql`
query{
    viewer{
        login,
        email,
        avatarUrl,
        bio,
        repositories{
          totalCount
        }
    }
}`
const UserPage = (props) =>{
    const {loading, error, data} = useQuery(repoQuery);
    if (loading) 
        return (<div><Progress/></div>);
    if (error) 
        return (<div>`Error! ${error.message}`</div>);
    console.log(data)
    return(
        <Container>
            <React.Fragment>
                <Avatar src={data.viewer.avatarUrl}/>
                <List>
                    <ListItem>
                        <ListItemText primary={data.viewer.login} secondary="login"/>
                    </ListItem>
                    {data.viewer.email !=="" &&
                        <ListItem>
                        <ListItemText primary={data.viewer.email} secondary="email"/>
                        </ListItem>
                    }
                    {data.viewer.bio !== null &&<ListItem>
                        <ListItemText primary={data.viewer.bio} secondary="bio"/>
                    </ListItem>}
                    {data.viewer.repositories.totalCount !== "" &&<ListItem>
                        <ListItemText primary={data.viewer.repositories.totalCount} secondary="total repositories"/>
                        </ListItem>
                    }
                </List>
                
                
            </React.Fragment>
        </Container>
        
    )
}
export default UserPage