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
import { horizontalSkewMaze } from './Mazes/hSkewMaze';
import { verticalSkewMaze } from './Mazes/vSkewMaze';
import { kruskalMaze } from './Mazes/kruskalsMaze1';
import { primMaze } from './Mazes/primsMaze';

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
            isRunning: false,                    // to check if any process is running at any instant
            mouseIsPressed: false,               // to check if mouse is pressed at any instant
            startNodePressed: false,             // to check if startnode is being dragged
            finishNodePressed: false,            // to check if endnode is being dragged
            weightWallToggle: false,
        };

    }

    // Toggle state functions
    toggleIsRunning = () => {
        let isRunning = !this.state.isRunning;
        this.setState({ isRunning });
    }
    toggleWeightWallToggle = () => {
        const weightWallToggle = !this.state.weightWallToggle;
        this.setState({ weightWallToggle });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Function to create Node object
    createNode = (row, col) => {
        // returns a javascript object denoting a node
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
        };
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // grid related functions
    // creates initial grid
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

    // clear all animations from the grid
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
                    }
                    else if (node.isStart || node.isFinish) {
                        node.parent = null;
                        node.isVisited = false;
                        if (node.isStart) node.costFromSource = 0;
                        else node.costFromSource = Number.POSITIVE_INFINITY;
                    }
                }
            }
            this.setState({ grid });
        }
    }
    
    // clear all walls and weights from the grid
    clearWallsandWeights = () => {
        if (!this.state.isRunning) {
            let grid = this.state.grid;

            for (const row of grid) {
                for (const node of row) {
                    if (node.isWall) {
                        document.getElementById(
                            `node-${node.row}-${node.col}`
                        ).className = 'node';
                        node.isVisited = false;
                        node.parent = null;
                        node.isWall = false;
                        node.costFromSource = Number.POSITIVE_INFINITY;
                    }
                    if (node.weight !== 1) {
                        node.weight = 1;
                        node.costFromSource = node.isStart ? 0 : Number.POSITIVE_INFINITY;
                    }
                }
            }
            this.setState({ grid });
        }
    }

    // reset the grid
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
                        node.weight = 1;
                    }
                    else if (node.isStart || node.isFinish) {
                        node.parent = null;
                        node.isVisited = false;
                        node.weight = 1;
                    }
                }
            }
            this.setState({ grid });
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // mouse event handlers
    // fires on onMouseDown
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
                        currentNode.weight = 1;
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
                    document.getElementById(`node-${row}-${col}`).className = 'node';
                    currentNode.isFinish = false;
                }
            }
        }
        else if (!this.state.isRunning && this.state.weightWallToggle) {
            const grid = this.state.grid;
            const currentNode = grid[row][col];
            if (!currentNode.isWall) {
                currentNode.weight = currentNode.weight + 1;
            }
        }
    }

    // fires on onMouseEnter
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

    // fires on onMouseLeave
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

    // fires on onMouseUp
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // animation functions
    // backtraces shortest path from finishNode to startNode
    getNodesInShortestPathOrder(finishNode) {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode);
            currentNode = currentNode.parent;
        }
        return nodesInShortestPathOrder;
    }

    // resposible for animating the grid
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
                        'node node-visited';
                }
            }, 2 * i);
        }
    }

    // responsible for animating shortest path
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (nodesInShortestPathOrder[i] === 'end') {
                setTimeout(() => {
                    this.toggleIsRunning();
                }, i * 50);
            } else {
                setTimeout(() => {
                    const node = nodesInShortestPathOrder[i];
                    const nodeClassName = document.getElementById(
                        `node-${node.row}-${node.col}`,
                    ).className;
                    if (
                        nodeClassName !== 'node node-start' &&
                        nodeClassName !== 'node node-finish'
                    ) {
                        document.getElementById(`node-${node.row}-${node.col}`).className =
                            'node node-shortest-path';
                    }
                }, i * 40);
            }
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // maze handler
    mazes = (mazeType) => {
        if (!this.state.isRunning) {
            const startNode = this.state.grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode = this.state.grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            let grid = this.state.grid;
            switch (mazeType) {
                case 'maze':
                    grid = maze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
                    break;
                case 'hSkew':
                    grid = horizontalSkewMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
                    break;
                case 'vSkew':
                    grid = verticalSkewMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
                    break;
                case 'kruskals':
                    grid = kruskalMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
                    break;
                case 'prims':
                    grid = primMaze(this.state.ROW_COUNT, this.state.COLUMN_COUNT, startNode, finishNode);
                    break;
                case 'weightMaze':
                    grid = weightMaze(grid);
                    break;
                case 'wallMaze':
                    grid = wallMaze(grid);
                    break;
            }
            this.setState({ grid });
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // lifecycle functions
    componentWillMount = () => {
        const ROW_COUNT = 2 * Math.floor(Math.floor((document.documentElement.clientHeight) / 25) / 2) - 3;
        const COLUMN_COUNT = 2 * Math.floor(Math.floor(document.documentElement.clientWidth / 25) / 2) - 1;
        const START_NODE_ROW = Math.floor(ROW_COUNT / 2);
        const FINISH_NODE_ROW = Math.floor(ROW_COUNT / 2);
        const START_NODE_COL = Math.floor(COLUMN_COUNT / 4);
        const FINISH_NODE_COL = Math.floor(3 * COLUMN_COUNT / 4);
        this.setState({ ROW_COUNT, COLUMN_COUNT, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL });
    }
    componentDidMount = () => {
        const grid = this.getInitialGrid();
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
                    mazify={() => this.mazes('maze')}
                    hmazify={() => this.mazes('hSkew')}
                    vmazify={() => this.mazes('vSkew')}
                    kruskalMazify={() => this.mazes('kruskals')}
                    primMazify={() => this.mazes('prims')}
                    weightMazify={() => this.mazes('weightMaze')}
                    wallMazify={() => this.mazes('wallMaze')}
                    navbarHeight={this.navbarHeight}
                    weightWallToggle={() => this.toggleWeightWallToggle()}
                    toggleCanvas={() => this.props.toggleCanvas()}
                    isCanvas={this.props.isCanvas}
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
            </div>
        )
    }
}

export default PathfindingVisualizer;
