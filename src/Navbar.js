import React from 'react';
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visualize: '',
            weightOrWall: false,
            isCanvas: this.props.isCanvas,
        }
    }
    onVisualizeClick = () => {
        const visualize = this.state.visualize;
        switch (visualize) {
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
    }
    toggleCanvas = () => {
        this.props.toggleCanvas();
    }
    bfsClick = () => {
        this.setState({ visualize: 'BFS' });
    }
    dfsClick = () => {
        this.setState({ visualize: 'DFS' });
    }
    dijkstraClick = () => {
        this.setState({ visualize: 'Dijkstra' });
    }
    onWeightWallToggleClick = () => {
        const weightOrWall = !this.state.weightOrWall;
        this.setState({ weightOrWall });
        this.props.weightWallToggle();
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
            kruskalMST,
            primMST,
        } = this.props;

        let mazeOptions = <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Mazes &amp; Patterns
             <span className="caret"></span></a>
            <ul className="dropdown-menu">
                <li id='startButtonCreateMazeTwo'><a href="#" onClick={mazify}>Recursive Division</a></li>
                <li id='startButtonCreateMazeThree'><a href="#" onClick={vmazify}>Recursive Division (vertical skew)</a></li>
                <li id='startButtonCreateMazeFour'><a href="#" onClick={hmazify}>Recursive Division (horizontal skew)</a></li>
                <li id='startButtonCreateMazeFour'><a href="#" onClick={kruskalMazify}>Kruskal's Maze</a></li>
                <li id='startButtonCreateMazeFour'><a href="#" onClick={primMazify}>Prims's Maze</a></li>
                <li id='startButtonCreateMazeOne'><a href="#" onClick={wallMazify}>Basic Random Maze</a></li>
                <li id='startButtonCreateMazeWeights'><a href="#" onClick={weightMazify}>Basic Weight Maze</a></li>
            </ul>
        </li>;
        let weightAndWallOption = <li id='startButtonClearWalls'><a href="#" onClick={clearWallsandWeights}>Clear Walls &amp; Weights</a></li>;
        let addWeightOption = <li id='startButtonAddObject'><a href="#" onClick={this.onWeightWallToggleClick}>Add {this.state.weightOrWall ? 'Wall' : 'Weight'}</a></li>;
        if(this.state.isCanvas){
            mazeOptions = <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Minimum Spanning Tree
             <span className="caret"></span></a>
                <ul className="dropdown-menu">
                    <li id='startButtonCreateMazeFour'><a href="#" onClick={kruskalMST}>Kruskal's Algorithm</a></li>
                    <li id='startButtonCreateMazeFour'><a href="#" onClick={primMST}>Prims's Algorithm</a></li>
                </ul>
            </li>;
            weightAndWallOption = <li></li>;
            addWeightOption = <li></li>;
        }

        return (
            <div id='navbarDiv'>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a id="refreshButton" className="navbar-brand" href="#">Graph Visualizer</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Algorithms
             <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li id='startButtonDijkstra'><a href="#" onClick={this.dijkstraClick}>Dijkstra's Algorithm</a></li>
                                    <li id='startButtonBFS'><a href="#" onClick={this.bfsClick}>Breadth-first Search</a></li>
                                    <li id='startButtonDFS'><a href="#" onClick={this.dfsClick}>Depth-first Search</a></li>
                                </ul>
                            </li>
                            {mazeOptions}
                            {addWeightOption}
                            <li id='startButtonStart'><button id="actualStartButton" className="btn btn-default navbar-btn" type="button" onClick={this.onVisualizeClick}>Visualize {this.state.visualize}!</button></li>
                            <li id='startButtonClearBoard'><a href="#" onClick={resetGrid}>Clear Board</a></li>
                            {weightAndWallOption}
                            <li id='startButtonClearPath'><a href="#" onClick={clearGrid}>Clear Path</a></li>
                            <li id='startButtonAddObject'><a href="#" onClick={this.toggleCanvas}>Switch to {this.state.isCanvas ? 'Grid' : 'Canvas'}</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;