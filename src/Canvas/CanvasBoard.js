import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import { CanvasContext } from "./CanvasContext";

function CanvasBoard(props) {
    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        toggleNodeDrawing,
        nodeDrawing,
        nodesOfGraph,
        clearCanvas,
        pushNode,
        setIndex,
        setCurrentEdgeWeight,
    } = useContext(CanvasContext);

    const emptyTheGraph = () => {
        pushNode([]);
        setIndex(1);
    }

    useEffect(() => {
        prepareCanvas(props.height, props.width);
        clearCanvas();
        props.settingStartNode(null);
        props.settingEndNode(null);
    }, []);
    const [startNode, setStartNode] = useState(0);
    const [endNode, setEndNode] = useState(0);
    useEffect(() => {
        props.settingGraph(nodesOfGraph);
        if (!startNode) props.settingStartNode((nodesOfGraph.length ? nodesOfGraph[0] : null));
        if (!endNode) props.settingEndNode(nodesOfGraph.length ? nodesOfGraph[nodesOfGraph.length - 1] : null);
        if (props.emptyGraphCall) {
            emptyTheGraph();
            props.toggleEmptyTheGraph();
        }
    }, [nodesOfGraph, props.emptyGraphCall]);



    const startNodeUpdate = (event) => {
        const startIndex = event.target.value;
        setStartNode(startIndex);
        if (startIndex != 0 && startIndex <= nodesOfGraph.length) props.settingStartNode(nodesOfGraph[startIndex - 1]);
        else alert('Not a valid start node');
    }
    const endNodeUpdate = (event) => {
        const endIndex = event.target.value;
        setEndNode(endIndex);
        if (endIndex != 0 && endIndex <= nodesOfGraph.length) props.settingEndNode(nodesOfGraph[endIndex - 1]);
        else alert('Not a valid start node');
    }

///////////////////////////////////////// try doing without usingStates
    const [weightNodeA,setWeightNodeA] = useState(0);
    const [weightNodeB, setWeightNodeB] = useState(0);
    const [weight,setWeight] = useState(0);
    const weightNodeAUpdate = (event)=>{
        const nodeIndex = event.target.value;
        setWeightNodeA(nodeIndex);
    }
    const weightNodeBUpdate = (event) => {
        const nodeIndex = event.target.value;
        setWeightNodeB(nodeIndex);
    }
    const weightUpdate=(event)=>{
        const weight=parseInt(event.target.value);
        setWeight(weight);
        setCurrentEdgeWeight(weight);
    }
    const writeText = (info, style = {}) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { text, x, y } = info;
        const { fontSize = 20, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top' } = style;

        ctx.beginPath();
        ctx.font = fontSize + 'px ' + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.stroke();
    }
    const addWeightToEdge = () => {
        const startId = weightNodeA;
        const endId = weightNodeB;
        const weightFinal = weight;
        if(startId > 0 && endId>0 && startId<=nodesOfGraph.length && endId<=nodesOfGraph.length){
            const startNode = nodesOfGraph[startId - 1];
            const endNode = nodesOfGraph[endId - 1];
            for (let i = 0; i < startNode.children.length; i++) {
                let { node } = startNode.children[i];
                if (node === endNode) {
                    startNode.children[i].weight = weightFinal;
                    for (let j = 0; j < endNode.children.length; j++) {
                        let { node, weight } = endNode.children[j];
                        if (node === startNode) {
                            endNode.children[j].weight = weightFinal;
                            const x = (startNode.centerX + endNode.centerX)/2;
                            const y = (startNode.centerY + endNode.centerY)/2;
                            writeText({text:weightFinal,x,y});
                            return;
                        }
                    }
                }
            }
        }
        alert('No such edge exists');
    }
/////////////////////////////////////////////////////////////////////////
    let edgeWeightInput = <div><a>Current edge weight</a>
        <input id="edgeWeight" onChange={weightUpdate} type="number" value={weight} /></div>;
    if(nodeDrawing){
        edgeWeightInput = <div></div>
    }
    return (
        <>
            {/* <section id="canvas-container"> */}
            <div id="wrapper" class="toggled">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand"> <a href="#"> Control Panel </a> </li>
                        <li> 
                            <a href="#" onClick={toggleNodeDrawing}>Add {nodeDrawing ? 'Edge' : 'Node'}</a> 
                            {edgeWeightInput}
                        </li>
                        <li>
                            <a>Start Node</a>
                            <input id="startValue" type = "number" placeholder={nodesOfGraph.length ? '1' : '0'} onChange={startNodeUpdate} />
                            <a>End Node</a>
                            <input id="endValue" type="number" placeholder={nodesOfGraph.length} onChange={endNodeUpdate} />
                        </li>
                        {/* <li>
                            <a>Add Weight</a>
                            <a>Start Node</a>
                            <input onChange={weightNodeAUpdate} type="number" value ={weightNodeA}/>
                            <a>End Node</a>
                            <input onChange={weightNodeBUpdate} type="number" value = {weightNodeB}/>
                            <a>Weight</a>
                            <input id="edgeWeight" onChange={weightUpdate} type="number" value = {weight}/>
                            <button onClick = {addWeightToEdge}>Submit</button>
                        </li> */}
                    </ul>
                </div>
            </div>
            <canvas id='canvas'
                className="centercanvas"
                onMouseDown={props.isRunning?()=>{}:startDrawing}
                onMouseUp={props.isRunning ? () => { } :finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            ></canvas>

            <button ></button>
            <br></br>
            {/* </section> */}
        </>
    )
}

export default CanvasBoard;