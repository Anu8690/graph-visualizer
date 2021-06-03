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
    } = useContext(CanvasContext);

    const emptyTheGraph = ()=>{
        pushNode([]);
    }

    useEffect(() => {
        prepareCanvas(props.height, props.width);
        clearCanvas();
    }, []);
    useEffect(() => {
        props.settingGraph(nodesOfGraph);
        if(props.emptyGraphCall){
            emptyTheGraph();
            props.toggleEmptyTheGraph();
        }
    }, [nodesOfGraph,props.emptyGraphCall]);

    return (
        <>
            {/* <section id="canvas-container"> */}
                <canvas id='canvas'
                    className = "centercanvas"
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                ></canvas>
            <button onClick={toggleNodeDrawing}>Add {nodeDrawing ? 'Edge' : 'Node'}</button>
                <br></br>
            {/* </section> */}
        </>
    )
}

export default CanvasBoard;