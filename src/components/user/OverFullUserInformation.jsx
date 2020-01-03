import FullUserInformation from "./FullUserInformation";
import React from 'react'
const OverFullUserInformation=(props)=>{
    const { match } = props;
    let {login} = match.params;
    return <FullUserInformation login={login}/>
}
export default OverFullUserInformation