import React, { useState } from 'react';
import TODOList from './components/TODOList';
class App extends React.Component {
  state = {
    text: "World",
    i : 0
  }
  handleClick = () =>{
    let newi = this.state.i + 1
    newi = newi % this.vals.length
    this.setState({i: newi})
    this.setState({text: this.vals[newi]})
  }
  render(){
    return (
      <React.Fragment>
        <App1/>
      </React.Fragment>
    );
  }
}
function App1() {
  const [text, setText] = useState("World")
  const [i, setI] = useState(0);
  const vals = ["World", "ITIS", "Gleb", "Andrey", "SomeOne", "Who you are?"];
  const handleClick = () =>{
    let newi = i + 1;
    newi = newi % vals.length;
    setI(newi);
    setText(vals[newi]);
  };
  return (
      <React.Fragment>
        <div>
          <h1>Hello, {text}!</h1>
          <button onClick={handleClick}>Hey!</button>
        </div>
        <TODOList/>
      </React.Fragment>
  );
}
export default App;
