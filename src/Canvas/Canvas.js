import React, { useContext } from 'react';
import './Canvas.css'
import Navbar from '../Navbar';
import CanvasBoard from './CanvasBoard'
import { CanvasProvider } from './CanvasContext'
import { ClearCanvasButton } from './clearCanvasButton'
import { bfs } from './Algorithms/bfs'
import { dfs } from './Algorithms/dfs'
import { visitAllEdges } from "./Algorithms/visitAllEdges";
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarHeight: 0,
            height: 0,
            width: 0,
            graphOfNodes: [],
            isRunning: false,
        }
    }
    navbarHeight = (height) => {
        const navbarHeight = height;
        this.setState({ navbarHeight });
    }

    settingGraph = (graphOfNodes) => {
        this.setState({ graphOfNodes });
    }

    redrawGraph = () =>{
        let canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const graphOfNodes = this.state.graphOfNodes;
        let startNode = graphOfNodes[0];
        const  visitedEdgesInOrder  = visitAllEdges(graphOfNodes, startNode);

        ctx.strokeStyle = "#000000";
        let { xA, yA } = visitedEdgesInOrder[0];
        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.arc(xA, yA, 20, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
        
        for (let i = 0; i < visitedEdgesInOrder.length; i++) {
            const { xA, yA, xB, yB } = visitedEdgesInOrder[i];            
            ctx.beginPath();
            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(xB, yB, 20, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }
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
            let startNode = graphOfNodes[0], finishNode = graphOfNodes[graphOfNodes.length - 1];

            let visitedNodesInOrder1;
            let visitedEdgesInOrder1;
            switch (algo) {
                // case 'Dijkstra':
                //     visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                //     break;
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

            this.animate(visitedNodesInOrder1, visitedEdgesInOrder1, algo);
        }
    }


    animate = (visitedNodesInOrder, visitedEdgesInOrder, algo) => {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "green";
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 1;
        
        if (algo === 'BFS') {
            for (let i = 0; i < visitedNodesInOrder.length; i++) {
                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    const { centerX, centerY } = node;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.closePath();

                    for (let j = 0; j < node.children.length; j++) {
                        setTimeout(() => {
                            const xB = node.children[j].centerX;
                            const yB = node.children[j].centerY;
                            ctx.beginPath();
                            ctx.moveTo(centerX, centerY);
                            visitedEdgesInOrder.shift();
                            ctx.lineTo(xB, yB);
                            ctx.stroke();
                            ctx.closePath();
                        }, i + j * (500 / node.children.length));
                    }
                }, i * 500);
            }
            setTimeout(() => {
                ctx.fillStyle = "#ffffff";
                ctx.strokeStyle = '#000000';
            }, 500 * visitedNodesInOrder.length);
        }
        else if (algo === 'DFS') {
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
            setTimeout(()=>{
                ctx.fillStyle = "#ffffff";
                ctx.strokeStyle = '#000000';
            },1000*visitedNodesInOrder.length);

        }
        this.setState({ isRunning: false });
    }

    toggleCanvas = () => {
        const canvasOrGrid = !this.state.canvasOrGrid;
        this.setState({ canvasOrGrid });
        this.props.toggleCanvas();
    }
    componentWillMount = () => {
        const height = document.documentElement.clientHeight - this.state.navbarHeight;
        const width = document.documentElement.clientWidth - 100;
        this.setState({ height, width });
    }

    render() {

        return (
            <div>
                <CanvasProvider>
                    <Navbar
                        navbarHeight={this.navbarHeight}
                        isCanvas={this.props.isCanvas}
                        toggleCanvas={() => this.toggleCanvas()}
                        bfs={() => this.visualize('BFS')}
                        dfs={() => this.visualize('DFS')}
                    ></Navbar>
                    <CanvasBoard
                        height={this.state.height}
                        width={this.state.width}
                        settingGraph={this.settingGraph}

                    ></CanvasBoard>
                    <ClearCanvasButton />
                </CanvasProvider>
            </div>
        )
    }
}

export default Canvas;