import React, { useEffect,useContext,useLayoutEffect,useState } from "react";
import { CanvasContext } from "./CanvasContext";
import rough from "roughjs/bundled/rough.esm";


function CanvasBoard(props){
    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        // addNode,
        toggleNodeDrawing,
        nodeDrawing,
        nodesOfGraph,
        clearCanvas,
    } = useContext(CanvasContext);

    useEffect(() => {
        prepareCanvas(props.height,props.width);
        clearCanvas();
    }, []);
    useEffect(()=>{
        // console.log(nodesOfGraph);
        props.settingGraph(nodesOfGraph);
    },[nodesOfGraph]);

    return(
        <section id="canvas-container">
            <canvas id='canvas'
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                // onClick = {addNode}
                ref={canvasRef}
            ></canvas>
            <br></br>
            <button onClick = {toggleNodeDrawing}>Add {nodeDrawing ? 'Edge':'Node'}</button>
        </section>
    )
}

export default CanvasBoard;