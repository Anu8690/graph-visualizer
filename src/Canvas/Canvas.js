import React, { useContext } from 'react';
import './Canvas.css';
import Navbar from '../Navbar';
import CanvasBoard from './CanvasBoard';
import { CanvasProvider } from './CanvasContext';
import { bfs } from './Algorithms/bfs';
import { dfs } from './Algorithms/dfs';
import { dijkstra } from './Algorithms/dijkstra';
import { visitAllEdges } from "./Algorithms/visitAllEdges";
import { kruskalsMST } from './Algorithms/kruskals';
import { primsMST } from './Algorithms/prims';

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
    // for togling b/w grid and canvas
    toggleCanvas = () => {
        const canvasOrGrid = !this.state.canvasOrGrid;
        this.setState({ canvasOrGrid });
        this.props.toggleCanvas();
    }

    toggleEmptyTheGraph = () => {
        const emptyGraphCall = !this.state.emptyGraphCall;
        this.setState({ emptyGraphCall });
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
    clearCanvas = () => {
        this.setState({ emptyGraphCall: true });
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
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
            visitedNodesInOrder1.forEach(node => {
                console.log(node.id, node.costFromSource);
            });
            this.animate(visitedNodesInOrder1, visitedEdgesInOrder1, algo, finishNode);
        }
    }


    animate = (visitedNodesInOrder, visitedEdgesInOrder, algo, finishNode) => {
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
        if (visitedNodesInOrder[visitedNodesInOrder.length - 1] === finishNode) {
            setTimeout(() => {
                this.animateShortestPath(finishNode, visitedNodesInOrder);
            }, 1000 * (visitedEdgesInOrder.length + 1) + 100);
        }
        else {
            setTimeout(() => {
                ctx.fillStyle = "#ffffff";
                ctx.strokeStyle = '#000000';
                this.setState({ isRunning: false });
                alert('node not reachable');
            }, 1000 * visitedNodesInOrder.length + 100);
        }

    }
    animateShortestPath = (endNode, visitedNodesInOrder) => {
        let shortestPathNodes = [];
        let currentNode = endNode;
        while (currentNode) {
            shortestPathNodes.push(currentNode);
            currentNode = currentNode.parent;
        }
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "yellow";

        for (let i = shortestPathNodes.length - 1; i >= 0; i--) {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                const { centerX, centerY } = node;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 20, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            }, (shortestPathNodes.length - 1 - i) * 500);
        }
        setTimeout(() => {
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = '#000000';
            this.setState({ isRunning: false });
            shortestPathNodes = [];
        }, 500 * (shortestPathNodes.length) + 1000);
    }

    visualizeMST = (algo) => {
        if (!this.state.isRunning) {
            const graphOfNodes = this.state.graphOfNodes;
            if (!graphOfNodes.length) {
                alert('Canvas is empty');
                return;
            }
            this.setState({ isRunning: true });
            this.redrawGraph();
            let MSTedges = [];
            switch (algo) {
                case 'Kruskal':
                    {
                        MSTedges = kruskalsMST(graphOfNodes);
                        break;
                    }
                case 'Prims':
                    {
                        MSTedges = primsMST(graphOfNodes);
                        break;
                    }
                default:
                    // do nothing
                    break;
            }
            if (MSTedges.length) this.animateMST(MSTedges);
            else {
                // some error occurred
                this.setState({ isRunning: false });
            }
        }
    }
    animateMST = (MSTedges) => {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 5;

        for (let i = 0; i < MSTedges.length; i++) {
            setTimeout(() => {
                const { nodeA, nodeB } = MSTedges[i];
                const xA = nodeA.centerX;
                const yA = nodeA.centerY;
                const xB = nodeB.centerX;
                const yB = nodeB.centerY;
                ctx.beginPath();
                ctx.moveTo(xA, yA);
                ctx.lineTo(xB, yB);
                ctx.stroke();
                ctx.closePath();
            }, i * 500);
        }
        setTimeout(() => {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            this.setState({ isRunning: false });
        }, MSTedges.length * 500 + 100);
    }


    render() {
        const height = document.documentElement.clientHeight - 50;
        const width = document.documentElement.clientWidth - 30;
        return (
            <div>
                <CanvasProvider>
                    <Navbar
                        isCanvas={this.props.isCanvas}
                        toggleCanvas={() => this.toggleCanvas()}
                        bfs={() => this.visualize('BFS')}
                        dfs={() => this.visualize('DFS')}
                        dijkstra={() => this.visualize('Dijkstra')}
                        clearGrid={() => this.redrawGraph()}
                        resetGrid={() => this.clearCanvas()}
                        kruskalMST={() => this.visualizeMST('Kruskal')}
                        primMST={() => this.visualizeMST('Prims')}
                    ></Navbar>
                    <CanvasBoard
                        height={height}
                        width={width}
                        settingGraph={this.settingGraph}
                        settingStartNode={this.settingStartNode}
                        settingEndNode={this.settingEndNode}
                        emptyGraphCall={this.state.emptyGraphCall}
                        toggleEmptyTheGraph={this.toggleEmptyTheGraph}
                        isRunning={this.state.isRunning}
                    ></CanvasBoard>
                </CanvasProvider>
            </div>
        )
    }
}

export default Canvas;