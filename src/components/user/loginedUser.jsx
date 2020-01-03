import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Progress from "../Loading"
import FullUserInformation from './FullUserInformation'
import { Link } from 'react-router-dom'
const UserPage = (props) =>{
    const repoQuery = gql`
        {
            viewer{
                    login
            }
        }`
    const {loading, error, data} = useQuery(repoQuery);
    if (loading) 
        return (<div><Progress/></div>);
    if (error) 
        return (<div>`Error! ${error.message}`</div>);
    return(
        <React.Fragment>
            <Link to="/">Search...</Link>
            <FullUserInformation login={data.viewer.login}/>
        </React.Fragment>
    )
}
export default UserPage