import React, { useRef, useState } from "react";

export const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);

    const [nodeDrawing, setNodeDrawing] = useState(true);
    const [index,setIndex] = useState(0);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const prepareCanvas = (height, width) => {
        const canvas = canvasRef.current
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        contextRef.current = context;
    };

    const toggleNodeDrawing = () => {
        setNodeDrawing(!nodeDrawing);
    }

    const [nodesOfGraph, pushNode] = useState([]);

    const squareDistance = (node, x, y) => {
        return Math.pow(node.centerX - x, 2) + Math.pow(node.centerY - y, 2);
    }

    const [startNode, setStartNode] = useState(null);
    let currentCoordinates = null;
    const whichNode = (x, y) => {
        let node = null;
        for (let i = 0; i < nodesOfGraph.length; i++) {
            if (squareDistance(nodesOfGraph[i], x, y) <= 1600) {
                node = nodesOfGraph[i];
                return node;
            }
        }
        return node;
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

    const startDrawing = ({ nativeEvent }) => {
        if (nodeDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            if (whichNode(offsetX, offsetY)) return;

            setIndex((prevIndex)=> prevIndex + 1);
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");


            ctx.beginPath();
            ctx.arc(offsetX, offsetY, 20, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            
            const node = {
                centerX: offsetX,
                centerY: offsetY,
                id: index,
                children: [],
                isVisited:false,
                parent:null,
                costFromSource:Number.POSITIVE_INFINITY,
            };
            pushNode([...nodesOfGraph, node]);
            writeText({text : `${node.id}`,x : node.centerX-10,y : node.centerY-10});
        }
        else {
            if (!isDrawing) {
                const { offsetX, offsetY } = nativeEvent;

                const start = whichNode(offsetX, offsetY);
                setStartNode(start);

                if (start) {
                    setIsDrawing(true);
                    currentCoordinates = { x: offsetX, y: offsetY };
                    contextRef.current.beginPath();
                    contextRef.current.moveTo(offsetX, offsetY);
                }
            }
        }
    };

    const [currentEdgeWeight,setCurrentEdgeWeight] = useState(0);
    const finishDrawing = () => {
        if (!nodeDrawing) {

            if (isDrawing && currentCoordinates) {
                setIsDrawing(false);

                const { x, y } = currentCoordinates;
                const end = whichNode(x, y);

                if (!end) {
                    contextRef.current.closePath();
                }
                else if (end.id === startNode.id) {
                    contextRef.current.closePath();
                }
                else {
                    contextRef.current.moveTo(startNode.centerX, startNode.centerY);
                    contextRef.current.lineTo(end.centerX, end.centerY);
                    contextRef.current.stroke();
                    contextRef.current.closePath();
                    
                    let c =false;
                    for(let i=0;i<startNode.children.length;i++){
                        if(startNode.children[i].node === end){
                            c = true;
                            break;
                        }
                    }
                    if(!c){
                        const weight = currentEdgeWeight;
                        const x = (startNode.centerX + end.centerX) / 2;
                        const y = (startNode.centerY + end.centerY) / 2;
                        startNode.children.push({ node: end, weight });
                        end.children.push({ node: startNode, weight });
                        writeText({ text: (weight?weight:''), x, y });
                    }
                }
                currentCoordinates = null;
                setStartNode(null);
            }
        }
    };

    const draw = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        if (!nodeDrawing) {
            if (isDrawing) {
                currentCoordinates = { x: offsetX, y: offsetY };
            }
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        pushNode([]);
        setIndex(1);
    }

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                clearCanvas,
                draw,
                toggleNodeDrawing,
                nodeDrawing,
                nodesOfGraph,
                pushNode,
                setIndex,
                setCurrentEdgeWeight,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

