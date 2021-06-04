import React, { useContext } from 'react';
import './Canvas.css';
import Navbar from '../Navbar';
import CanvasBoard from './CanvasBoard';
import { CanvasProvider } from './CanvasContext';
import { bfs } from './Algorithms/bfs';
import { dfs } from './Algorithms/dfs';
import { dijkstra } from './Algorithms/dijkstra';
import { visitAllEdges } from "./Algorithms/visitAllEdges";

let nheight = 0;
let swidth = 0;
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarHeight: 0,
            height: 0,
            width: 0,
            graphOfNodes: [],
            isRunning: false,
            emptyGraphCall: false,
            startNode: null,
            endNode: null,
        }
    }

    navbarHeight = (height) => {
        console.log("height = ", height);
        nheight = height;
        // console.log(nheight ," = nheight");
    }
    toggleEmptyTheGraph = () => {
        const emptyGraphCall = !this.state.emptyGraphCall;
        this.setState({ emptyGraphCall });
    }
    clearCanvas = () => {
        this.setState({ emptyGraphCall: true });
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    settingStartNode = (startNode) => {
        this.setState({ startNode });
    }
    settingEndNode = (endNode) => {
        this.setState({ endNode });
    }
    settingGraph = (graphOfNodes) => {
        this.setState({ graphOfNodes });
    }

    redrawGraph = () => {
        const graphOfNodes = this.state.graphOfNodes;
        visitAllEdges(graphOfNodes);
    }

    visualize(algo) {
        if (!this.state.isRunning) {
            const graphOfNodes = this.state.graphOfNodes;
            if (!graphOfNodes.length) {
                alert('Canvas is empty');
                return;
            }
            this.setState({ isRunning: true });
            this.redrawGraph();
            let startNode = this.state.startNode, finishNode = this.state.endNode;

            let visitedNodesInOrder1;
            let visitedEdgesInOrder1;
            switch (algo) {
                case 'Dijkstra':
                    {
                        // currently dijstra is taking cost from source as string
                        // have to fix this bug
                        const { visitedNodesInOrder, visitedEdgesInOrder } = dijkstra(graphOfNodes, startNode, finishNode);
                        visitedNodesInOrder1 = visitedNodesInOrder;
                        visitedEdgesInOrder1 = visitedEdgesInOrder;
                        break;
                    }
                case 'BFS':
                    {
                        const { visitedNodesInOrder, visitedEdgesInOrder } = bfs(graphOfNodes, startNode, finishNode);
                        visitedNodesInOrder1 = visitedNodesInOrder;
                        visitedEdgesInOrder1 = visitedEdgesInOrder;
                        break;
                    }
                case 'DFS':
                    {
                        const { visitedNodesInOrder, visitedEdgesInOrder } = dfs(graphOfNodes, startNode, finishNode);
                        visitedNodesInOrder1 = visitedNodesInOrder;
                        visitedEdgesInOrder1 = visitedEdgesInOrder;
                        break;
                    }
                default:
                    // should never get here
                    break;
            }

            // visitedNodesInOrder1.forEach(node=>{
            //     console.log(node.id,node.costFromSource);
            // });
            // this.setState({ isRunning: false });

            // return;

            this.animate(visitedNodesInOrder1, visitedEdgesInOrder1, algo);
        }
    }


    animate = (visitedNodesInOrder, visitedEdgesInOrder, algo) => {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "green";
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 1;

        let { centerX, centerY } = visitedNodesInOrder[0];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        for (let i = 0; i < visitedEdgesInOrder.length; i++) {
            const { xA, yA, xB, yB } = visitedEdgesInOrder[i];

            setTimeout(() => {
                setTimeout(() => {
                    ctx.beginPath();
                    ctx.moveTo(xA, yA);
                    ctx.lineTo(xB, yB);
                    ctx.stroke();
                    ctx.closePath();
                }, 500);

                setTimeout(() => {
                    ctx.beginPath();
                    ctx.arc(xB, yB, 20, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.closePath();
                }, 1000);
            }, i * 1000);

        }
        setTimeout(() => {
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = '#000000';
        }, 1000 * visitedNodesInOrder.length + 1000);

        this.setState({ isRunning: false });
    }

    toggleCanvas = () => {
        const canvasOrGrid = !this.state.canvasOrGrid;
        this.setState({ canvasOrGrid });
        this.props.toggleCanvas();
    }
    componentWillMount = () => {
        // console.log("required",nheight,swidth);
        // const height = document.documentElement.clientHeight - nheight;
        // const width = document.documentElement.clientWidth - 100 - swidth;
        // this.setState({ height, width });
    }

    render() {
        const height = document.documentElement.clientHeight - nheight - 50;
        const width = document.documentElement.clientWidth - swidth - 30;
        return (
            <div>
                <CanvasProvider>
                    <Navbar
                        navbarHeight={this.navbarHeight}
                        isCanvas={this.props.isCanvas}
                        toggleCanvas={() => this.toggleCanvas()}
                        bfs={() => this.visualize('BFS')}
                        dfs={() => this.visualize('DFS')}
                        dijkstra={() => this.visualize('Dijkstra')}
                        clearGrid={() => this.redrawGraph()}
                        resetGrid={() => this.clearCanvas()}
                    ></Navbar>
                    <CanvasBoard
                        height={height}
                        width={width}
                        settingGraph={this.settingGraph}
                        settingStartNode={this.settingStartNode}
                        settingEndNode={this.settingEndNode}
                        emptyGraphCall={this.state.emptyGraphCall}
                        toggleEmptyTheGraph={this.toggleEmptyTheGraph}
                    ></CanvasBoard>
                </CanvasProvider>
            </div>
        )
    }
}

export default Canvas;