import React, {useState} from 'react';

function AddToDoComponent(props){
    let [value, setValue] = useState("");
    const handleClick = () =>{
        props.handleClick(value)
        setValue("")
    };
    const changeValue = (event) =>{
        setValue(event.target.value)
    };
    return(
        <React.Fragment>
            <input type="text" onChange={changeValue} value={value}/>
            <input type="submit" onClick={handleClick}/>
        </React.Fragment>
    )
}
export default AddToDoComponent