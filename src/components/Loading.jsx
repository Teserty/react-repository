import React from 'react'
import { CircularProgress } from '@material-ui/core';
const Progress = (props) => {
    if(props.withValue === undefined){
    return(
        <CircularProgress color="secondary" />
    )}else{
        return(
        <CircularProgress variant="determinate" value={props.progress} />  
    )}
    
}
export default Progress