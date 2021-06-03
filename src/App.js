import React from 'react';
import './App.css';
// import Navbar from './Navbar';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer'
import Canvas from './Canvas/Canvas'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      canvas: false,
    }
  }

  toggleCanvas = ()=>{
    const canvas = !this.state.canvas;
    this.setState({canvas});
  }

  render(){

    if(!this.state.canvas){
      return (
        <div className="App">
          <PathfindingVisualizer
              toggleCanvas={()=>this.toggleCanvas()}
              isCanvas = {this.state.canvas}
          ></PathfindingVisualizer>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Canvas
            toggleCanvas={() => this.toggleCanvas()}
            isCanvas={this.state.canvas}
          ></Canvas>
        </div>
      )
    } 
  }
}

export default App;
