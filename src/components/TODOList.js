import React, { useState } from 'react';
import TODO from './TODO.js'
import AddToDoComponent from "./AddToDoComponent"
function TODOList(){
    const [todos, setTodos] = useState(["hello", "bue"]);
    const handleClick = (todo) =>{
        const newTodos = todos;
        newTodos.push(todo);
        setTodos(newTodos);
    };
    let todotemp = todos.map((val)=> <TODO name = {val} key={val}/>);
    //local storage, filter
    return(
        <React.Fragment>
            <AddToDoComponent handleClick={handleClick}/>
            <div>{todotemp}</div>
        </React.Fragment>
    )
}
export default TODOList