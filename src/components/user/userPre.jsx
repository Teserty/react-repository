import React from 'react';
import {ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';
const PreviewUserInformation = ({name, avatarUrl, login})=>{
    if(name === ""){
        name = login
    }
    return(
        <div>
            <ListItemAvatar>
                <Avatar  src={avatarUrl} alt="Remy Sharp"/>
            </ListItemAvatar>
            <ListItemText>{name}</ListItemText>
            
        </div>
    )
}
export default PreviewUserInformation