import React from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css'
import { bfs } from './Algorithms/bfs'
import { dfs } from './Algorithms/dfs'
import { dijkstra } from './Algorithms/dijkstra'
import { maze } from './Mazes/maze'
import { weightMaze } from './Mazes/weightMaze'
import { wallMaze } from './Mazes/wallMaze'
import Navbar from '../Navbar';
import {horizontalSkewMaze} from './Mazes/hSkewMaze';
import { verticalSkewMaze } from './Mazes/vSkewMaze';
import { kruskalMaze } from './Mazes/kruskalsMaze1';
import {primMaze} from './Mazes/primsMaze';
class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            ROW_COUNT: 25,
            COLUMN_COUNT: 35,
            START_NODE_ROW: 5,
            FINISH_NODE_ROW: 20,
            START_NODE_COL: 5,
            FINISH_NODE_COL: 30,
            isRunning: false,
            mouseIsPressed: false,
            startNodePressed: false,
            finishNodePressed: false,
            navbarHeight: 0,
            weightWallToggle:false,
            // isStartNode: false,
            // isFinishNode: false,
            // isWallNode: false, // xxxxxxx
            // currRow: 0,
            // currCol: 0,
            // isDesktopView: true,
        };
        // this.handleMouseLeave = this.handleMouseLeave.bind(this);

    }

    navbarHeight = (height) => {
        // console.log("Arguement passed = ",height);
        const navbarHeight = height;
        // console.log(navbarHeight);
        this.setState({ navbarHeight });
        // return navbarHeight;
    }

    toggleIsRunning = () => {
        let isRunning = !this.state.isRunning;
        this.setState({ isRunning });
    }
    toggleWeightWallToggle = () =>{
        const weightWallToggle = !this.state.weightWallToggle;
        this.setState({weightWallToggle});
    }

    getInitialGrid = (
        rowCount = this.state.ROW_COUNT,
        colCount = this.state.COLUMN_COUNT,
    ) => {
        const initialGrid = [];
        for (let row = 0; row < rowCount; row++) {
            const currentRow = [];
            for (let col = 0; col < colCount; col++) {
                currentRow.push(this.createNode(row, col));
            }
            initialGrid.push(currentRow);
        }
        return initialGrid;
    };

    createNode = (row, col) => {
        return {
            row,
            col,
            isStart:
                row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
            isFinish:
                row === this.state.FINISH_NODE_ROW &&
                col === this.state.FINISH_NODE_COL,
            isVisited: false,
            isWall: false,
            parent: null,
            isNode: true,
            weight: 1,
            costFromSource: (row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL) ? 0 : Number.POSITIVE_INFINITY,
            // extraClassName:"",
        };
    };

    clearGrid = () => {
        if (!this.state.isRunning) {
            let grid = this.state.grid;

            for (const row of grid) {
                for (const node of row) {
                    if (!node.isStart && !node.isFinish && !node.isWall) {
                        document.getElementById(
                            `node-${node.row}-${node.col}`
                        ).className = 'node';
                        node.isVisited = false;
                        node.parent = null;
                        node.costFromSource = Number.POSITIVE_INFINITY;
                        // nodeClassName = 'node';
                    }
                    else if (node.isStart || node.isFinish) {
                        node.parent = null;
                        node.isVisited = false;
                        if(node.isStart) node.costFromSource = 0;
                        else node.costFromSource = Number.POSITIVE_INFINITY;
                    }
                }
            }
            this.setState({ grid });
            // console.log(grid);
        }
    }
    clearWallsandWeights = () => {
        if (!this.state.isRunning) {
            let grid = this.state.grid;

            for (const row of grid) {
                for (const node of row) {
                    if (node.isWall ) {
                        document.getElementById(
                            `node-${node.row}-${node.col}`
                        ).className = 'node';
                        node.isVisited = false;
                        node.parent = null;
                        node.isWall = false;
                        node.costFromSource = Number.POSITIVE_INFINITY;
                        // nodeClassName = 'node';
                    }
                    if (node.weight !==1)
                    {
                        node.weight = 1;
                        node.costFromSource = node.isStart ? 0: Number.POSITIVE_INFINITY;
                    }
                }
            }
            this.setState({ grid });

            // console.log(grid);
        }
    }
    resetGrid = () => {
        if (!this.state.isRunning) {
            let grid = this.state.grid;

            for (const row of grid) {
                for (const node of row) {
                    if (!node.isStart && !node.isFinish) {
                        document.getElementById(
                            `node-${node.row}-${node.col}`
                        ).className = 'node';
                        node.isVisited = false;
                        node.parent = null;
                        node.isWall = false;
                        // nodeClassName = 'node';
                    }
                    else if (node.isStart || node.isFinish) {
                        node.parent = null;
                        node.isVisited = false;
                    }
                }
            }
            this.setState({ grid });
            // console.log(grid);
        }
    }

    onCellDown = (row, col) => {
        if (!this.state.isRunning && !this.state.weightWallToggle) {

            const grid = this.state.grid;
            if (!this.state.mouseIsPressed) {
                const mouseIsPressed = !this.state.mouseIsPressed;
                this.setState({ mouseIsPressed });
                const currentNode = grid[row][col];
                if (!currentNode.isStart && !currentNode.isFinish) {
                    if (currentNode.isWall) {
                        document.getElementById(`node-${row}-${col}`).className = 'node';
                        currentNode.isWall = false;
                    }
                    else {
                        document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
                        currentNode.isWall = true;
                        currentNode.weight=1;
                    }
                }
                else if (currentNode.isStart) {
                    const startNodePressed = !this.state.startNodePressed;
                    this.setState({ startNodePressed });
                    document.getElementById(`node-${row}-${col}`).className = 'node';
                    currentNode.isStart = false;
                }
                else if (currentNode.isFinish) {
                    const finishNodePressed = !this.state.finishNodePressed;
                    this.setState({ finishNodePressed });
                    document.getElementById(`node-${row}-${col}`).className = 'node' ;
                    currentNode.isFinish = false;
                }
            }
        }
        else if(!this.state.isRunning && this.state.weightWallToggle)
        {
            const grid = this.state.grid;
            const currentNode = grid[row][col];
            if(!currentNode.isWall){
                currentNode.weight = currentNode.weight+1;
            }
        }
    }
    onCellEnter = (row, col) => {
        if (!this.state.isRunning && this.state.mouseIsPressed) {
            const grid = this.state.grid;
            const currentNode = grid[row][col];
            if (!currentNode.isStart && !currentNode.isFinish && !this.state.startNodePressed && !this.state.finishNodePressed) {
                document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
                currentNode.isWall = true;
                currentNode.weight = 1;
            }
            else if (this.state.startNodePressed) {
                const START_NODE_ROW = row;
                const START_NODE_COL = col;
                this.setState({ START_NODE_ROW, START_NODE_COL });
                document.getElementById(`node-${row}-${col}`).className = 'node node-start';
            }
            else if (this.state.finishNodePressed) {
                const FINISH_NODE_ROW = row;
                const FINISH_NODE_COL = col;
                this.setState({ FINISH_NODE_ROW, FINISH_NODE_COL });
                document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
            }

        }
    }
    onCellLeave = (row, col) => {
        const grid = this.state.grid;
        if (this.state.startNodePressed) {
            if (!grid[row][col].isFinish && !grid[row][col].isWall) document.getElementById(`node-${row}-${col}`).className = 'node';
            else if (grid[row][col].isFinish) document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
            else if (grid[row][col].isWall) document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
        }
        else if (this.state.finishNodePressed) {
            if (!grid[row][col].isStart && !grid[row][col].isWall) document.getElementById(`node-${row}-${col}`).className = 'node';
            else if (grid[row][col].isStart) document.getElementById(`node-${row}-${col}`).className = 'node node-start';
            else if (grid[row][col].isWall) document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
        }
    }
    onCellRelease = () => {
        const mouseIsPressed = false;
        const grid = this.state.grid;
        if (this.state.startNodePressed) {
            const row = this.state.START_NODE_ROW;
            const col = this.state.START_NODE_COL;
            document.getElementById(`node-${row}-${col}`).className = 'node node-start';
            grid[row][col].isStart = true;
            grid[row][col].isWall = false;
        }
        else if (this.state.finishNodePressed) {
            const row = this.state.FINISH_NODE_ROW;
            const col = this.state.FINISH_NODE_COL;
            document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
            grid[row][col].isFinish = true;
            grid[row][col].isWall = false;
        }
        const startNodePressed = false;
        const finishNodePressed = false;
        this.setState({ mouseIsPressed, startNodePressed, finishNodePressed, grid });
    }



    componentWillMount = () => {
        const ROW_COUNT = 2 * Math.floor(Math.floor((document.documentElement.clientHeight - this.state.navbarHeight) / 25) / 2) - 3;
        const COLUMN_COUNT = 2 * Math.floor(Math.floor(document.documentElement.clientWidth / 25) / 2) - 3;
        const START_NODE_ROW = Math.floor(ROW_COUNT / 2);
        const FINISH_NODE_ROW = Math.floor(ROW_COUNT / 2);
        const START_NODE_COL = Math.floor(COLUMN_COUNT / 4);
        const FINISH_NODE_COL = Math.floor(3 * COLUMN_COUNT / 4);
        this.setState({ ROW_COUNT, COLUMN_COUNT, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL });
    }
    componentDidMount = () => {
        const grid = this.getInitialGrid();
        this.setState({ grid });
        // console.log(grid);
    }



    visualize(algo) {
        if (!this.state.isRunning) {
            this.clearGrid();
            this.toggleIsRunning();
            const { grid } = this.state;
            const startNode =
                grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode =
                grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            let visitedNodesInOrder;
            switch (algo) {
                case 'Dijkstra':
                    visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                    break;
                // case 'AStar':
                //     visitedNodesInOrder = AStar(grid, startNode, finishNode);
                //     break;
                case 'BFS':
                    visitedNodesInOrder = bfs(grid, startNode, finishNode);
                    break;
                case 'DFS':
                    visitedNodesInOrder = dfs(grid, startNode, finishNode);
                    break;
                default:
                    // should never get here
                    break;
            }

            // console.log(visitedNodesInOrder);
            // console.log(grid);
            const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(finishNode);
            nodesInShortestPathOrder.push('end');
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    }

    animate(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 2 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`,
                ).className;
                if (
                    nodeClassName !== 'node node-start' &&
                    nodeClassName !== 'node node-finish'
                ) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 
                        'node node-visited' ;
                }
            }, 2 * i);
        }
    }

    /******************** Create path from start to finish ********************/
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (nodesInShortestPathOrder[i] === 'end') {
                setTimeout(() => {
                    this.toggleIsRunning();
                    // console.log("Completed");
                }, i * 50);
            } else {
                setTimeout(() => {
                    const node = nodesInShortestPathOrder[i];
                    const nodeClassName = document.getElementById(
                        `node-${node.row}-${node.col}`,
                    ).className;
                    if (
                        nodeClassName !== 'node node-start'&&
                        nodeClassName !== 'node node-finish'
                    ) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 
                            'node node-shortest-path';
                    }
                }, i * 40);
            }
        }
    }

    getNodesInShortestPathOrder(finishNode) {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode);
            currentNode = currentNode.parent;
        }
        return nodesInShortestPathOrder;
    }

    mazify = () => {
        if (!this.state.isRunning) {
            const startNode = this.state.grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode = this.state.grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            const grid = maze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
            this.setState({ grid });
        }
    }
    hSkewMazify = ()=>{
        if(!this.state.isRunning){
            const startNode = this.state.grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode = this.state.grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            const grid = horizontalSkewMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
            this.setState({ grid });
        }
    }
    vSkewMazify = () => {
        if (!this.state.isRunning) {
            const startNode = this.state.grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode = this.state.grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            const grid = verticalSkewMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
            this.setState({ grid });
        }
    }
    kruskalMazify = () =>{
        if (!this.state.isRunning) {
            const startNode = this.state.grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode = this.state.grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            const grid = kruskalMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
            this.setState({ grid });
        }
    }
    primMazify = () => {
        if (!this.state.isRunning) {
            const startNode = this.state.grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode = this.state.grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            const grid = primMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
            this.setState({ grid });
        }
    }
    weightMazify = ()=>{
        let grid = this.state.grid;
        grid = weightMaze(grid);
        this.setState({grid});
    }
    wallMazify = ()=>{
        let grid = this.state.grid;
        grid = wallMaze(grid);
        this.setState({ grid });
    }

    render() {
        return (
            <div>
                <Navbar
                    dfs={() => this.visualize('DFS')}
                    bfs={() => this.visualize('BFS')}
                    dijkstra={() => this.visualize('Dijkstra')}
                    clearGrid={() => this.clearGrid()}
                    resetGrid={() => this.resetGrid()}
                    clearWallsandWeights={() => this.clearWallsandWeights()}
                    mazify={() => this.mazify()}
                    hmazify={() => this.hSkewMazify()}
                    vmazify={() => this.vSkewMazify()}
                    kruskalMazify={() => this.kruskalMazify()}
                    primMazify={() => this.primMazify()}
                    weightMazify={()=>this.weightMazify()}
                    wallMazify={() => this.wallMazify()}
                    navbarHeight={this.navbarHeight}
                    weightWallToggle={()=>this.toggleWeightWallToggle()}
                ></Navbar>
                <table className="center grid-container" >
                    <tbody className="grid">
                        {
                            this.state.grid.map((row, rowID) => {
                                return (
                                    <tr key={rowID} >
                                        {
                                            row.map((node, nodeID) => {
                                                const { row, col, isFinish, isStart, isWall, weight } = node;

                                                return (
                                                    <Node
                                                        key={nodeID}
                                                        row={row}
                                                        col={col}
                                                        weight={weight}
                                                        isFinish={isFinish}
                                                        isStart={isStart}
                                                        isWall={isWall}
                                                        onMouseDown={(x, y) => { this.onCellDown(x, y) }}
                                                        onMouseEnter={(x, y) => this.onCellEnter(x, y)}
                                                        onMouseUp={() => this.onCellRelease()}
                                                        onMouseLeave={(x, y) => this.onCellLeave(x, y)}
                                                    ></Node>
                                                );
                                            })
                                        }

                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                {/* <button onClick={() => this.visualize('BFS')}>BFS</button>
                <button onClick={() => this.visualize('DFS')}>DFS</button>
                <button onClick={() => this.clearGrid()}>Clear Gridd</button>
                <button onClick={() => this.resetGrid()}>Reset Grid</button>
                <button onClick={() => this.mazify()}>Maze</button> */}

            </div>
        )
    }

}

export default PathfindingVisualizer;
