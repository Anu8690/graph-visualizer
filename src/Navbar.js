import React from 'react';

class Navbar extends React.Component {
    render() {
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
                                    <li id='startButtonDijkstra'><a href="#">Dijkstra's Algorithm</a></li>
                                    <li id='startButtonAStar2'><a href="#">A* Search</a></li>
                                    <li id='startButtonGreedy'><a href="#">Greedy Best-first Search</a></li>
                                    <li id='startButtonAStar'><a href="#">Swarm Algorithm</a></li>
                                    <li id='startButtonAStar3'><a href="#">Convergent Swarm Algorithm</a></li>
                                    <li id='startButtonBidirectional'><a href="#">Bidirectional Swarm Algorithm</a></li>
                                    <li id='startButtonBFS'><a href="#">Breadth-first Search</a></li>
                                    <li id='startButtonDFS'><a href="#">Depth-first Search</a></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Mazes &amp; Patterns
             <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li id='startButtonCreateMazeTwo'><a href="#">Recursive Division</a></li>
                                    <li id='startButtonCreateMazeThree'><a href="#">Recursive Division (vertical skew)</a></li>
                                    <li id='startButtonCreateMazeFour'><a href="#">Recursive Division (horizontal skew)</a></li>
                                    <li id='startButtonCreateMazeOne'><a href="#">Basic Random Maze</a></li>
                                    <li id='startButtonCreateMazeWeights'><a href="#">Basic Weight Maze</a></li>
                                    <li id='startStairDemonstration'><a href="#">Simple Stair Pattern</a></li>
                                </ul>
                            </li>
                            <li id='startButtonAddObject'><a href="#">Add Bomb</a></li>
                            <li id='startButtonStart'><button id="actualStartButton" className="btn btn-default navbar-btn" type="button">Visualize!</button></li>
                            <li id='startButtonClearBoard'><a href="#">Clear Board</a></li>
                            <li id='startButtonClearWalls'><a href="#">Clear Walls &amp; Weights</a></li>
                            <li id='startButtonClearPath'><a href="#">Clear Path</a></li>
                            <li className="dropdown">
                                <a id="adjustSpeed" className="dropdown-toggle" data-toggle="dropdown" href="#">Speed: Fast
             <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li id='adjustFast'><a href="#">Fast</a></li>
                                    <li id='adjustAverage'><a href="#">Average</a></li>
                                    <li id='adjustSlow'><a href="#">Slow</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;