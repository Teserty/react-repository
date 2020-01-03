import React, {useState} from 'react';
import {ListItemText, ListItemAvatar, Avatar, ListItem} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
const PreviewRepository = ({name, totalCount, login, id, viewerHasStarred})=>{
    const add_star = gql`
        mutation{
            addStar(input: { starrableId: "${id}" }) {
                starrable {
                    id
                    viewerHasStarred
                }
            }
        }
    `;
    const remove_star = gql`
        mutation{
            removeStar(input: {starrableId: "${id}"}) {
            starrable {
                id
                viewerHasStarred
            }
            }
        }
    `;  
    const [addStar]= useMutation(add_star)
    const [removeStar]= useMutation(remove_star)
    const [count, setCount] = useState(totalCount)
    return(
        <ListItem>
            <ListItemText>{name}, {login}</ListItemText>
            <ListItemAvatar>
                {count}
                {!viewerHasStarred && <Avatar src="./black-star.png" alt="Remy Sharp" onClick={()=>{addStar(); setCount(count+1)}}/>}
                {viewerHasStarred && <Avatar src="./gold-star.png" alt="Remy Sharp" onClick={()=>{removeStar(); setCount(count+-1)}}/>}
            </ListItemAvatar>
        </ListItem>
    )
}
export default PreviewRepository