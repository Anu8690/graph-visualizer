import React from 'react';

// function navbarHeight(){
//     return document.getElementById("navbarDiv").clientHeight;
// }
class Navbar extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            visualize:'',
            weightOrWall : false,
        }
    }
    onVisualizeClick = () => {
        const visualize = this.state.visualize;
        switch(visualize){
            case 'BFS':
                this.props.bfs();
                break;
            case 'DFS':
                this.props.dfs();
                break;
            case 'Dijkstra':
                this.props.dijkstra();
                break;
            default:
                alert('Choose an algorithm for visualization!!');
        }
        // console.log(visualize);
    }
    bfsClick = ()=>{
        this.setState({visualize : 'BFS'});
    }
    dfsClick = ()=>{
        this.setState({ visualize: 'DFS' });
    }
    dijkstraClick = ()=>{
        this.setState({ visualize: 'Dijkstra' });
    }
    onWeightWallToggleClick = () =>{
        const weightOrWall = !this.state.weightOrWall;
        this.setState({weightOrWall});
        this.props.weightWallToggle();
    }
    componentDidMount = ()=> {
        // console.log(document.getElementById("navbarDiv").clientHeight);
        this.props.navbarHeight(document.getElementById("navbarDiv").clientHeight);
    }
    render() {
        const {
            clearGrid,
            resetGrid,
            mazify,
            hmazify,
            vmazify,
            kruskalMazify,
            primMazify,
            weightMazify,
            wallMazify,
            clearWallsandWeights,
        } = this.props;

        return (
            <div id='navbarDiv'>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a id="refreshButton" className="navbar-brand" href="#">Pathfinding Visualizer</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Algorithms
             <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li id='startButtonDijkstra'><a href="#" onClick = {this.dijkstraClick}>Dijkstra's Algorithm</a></li>
                                    {/* <li id='startButtonAStar2'><a href="#">A* Search</a></li> */}
                                    {/* <li id='startButtonGreedy'><a href="#">Greedy Best-first Search</a></li>
                                    <li id='startButtonAStar'><a href="#">Swarm Algorithm</a></li> */}
                                    {/* <li id='startButtonAStar3'><a href="#">Convergent Swarm Algorithm</a></li>
                                    <li id='startButtonBidirectional'><a href="#">Bidirectional Swarm Algorithm</a></li> */}
                                    <li id='startButtonBFS'><a href="#" onClick = {this.bfsClick}>Breadth-first Search</a></li>
                                    <li id='startButtonDFS'><a href="#" onClick = {this.dfsClick}>Depth-first Search</a></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Mazes &amp; Patterns
             <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li id='startButtonCreateMazeTwo'><a href="#" onClick = {mazify}>Recursive Division</a></li>
                                    <li id='startButtonCreateMazeThree'><a href="#" onClick = {vmazify}>Recursive Division (vertical skew)</a></li>
                                    <li id='startButtonCreateMazeFour'><a href="#" onClick={hmazify}>Recursive Division (horizontal skew)</a></li>
                                    <li id='startButtonCreateMazeFour'><a href="#" onClick={kruskalMazify}>Kruskal's Maze</a></li>
                                    <li id='startButtonCreateMazeFour'><a href="#" onClick={primMazify}>Prims's Maze</a></li>
                                    <li id='startButtonCreateMazeOne'><a href="#" onClick = {wallMazify}>Basic Random Maze</a></li>
                                    <li id='startButtonCreateMazeWeights'><a href="#" onClick = {weightMazify}>Basic Weight Maze</a></li>
                                    {/* <li id='startStairDemonstration'><a href="#">Simple Stair Pattern</a></li> */}
                                </ul>
                            </li>
                            <li id='startButtonAddObject'><a href="#" onClick = {this.onWeightWallToggleClick}>Add {this.state.weightOrWall ? 'Wall':'Weight'}</a></li>
                            <li id='startButtonStart'><button id="actualStartButton" className="btn btn-default navbar-btn" type="button" onClick = {this.onVisualizeClick}>Visualize {this.state.visualize}!</button></li>
                            <li id='startButtonClearBoard'><a href="#" onClick = {resetGrid}>Clear Board</a></li>
                            <li id='startButtonClearWalls'><a href="#" onClick = {clearWallsandWeights}>Clear Walls &amp; Weights</a></li>
                            <li id='startButtonClearPath'><a href="#" onClick={clearGrid}>Clear Path</a></li>
                            {/* <li className="dropdown">
                                <a id="adjustSpeed" className="dropdown-toggle" data-toggle="dropdown" href="#">Speed: Fast
             <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li id='adjustFast'><a href="#">Fast</a></li>
                                    <li id='adjustAverage'><a href="#">Average</a></li>
                                    <li id='adjustSlow'><a href="#">Slow</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;