import React, { useRef, useState } from "react";

export const CanvasContext = React.createContext();

let index = 0;

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);

    const [nodeDrawing, setNodeDrawing] = useState(true);

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

    const startDrawing = ({ nativeEvent }) => {
        if (nodeDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            if (whichNode(offsetX, offsetY)) return;

            index = index + 1;
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
            };
            pushNode([...nodesOfGraph, node]);
        }
        else {
            if (!isDrawing) {
                const { offsetX, offsetY } = nativeEvent;

                const start = whichNode(offsetX, offsetY);
                setStartNode(start);
                // console.log(start);

                if (start) {
                    setIsDrawing(true);
                    currentCoordinates = { x: offsetX, y: offsetY };
                    contextRef.current.beginPath();
                    contextRef.current.moveTo(offsetX, offsetY);
                }
            }
        }
    };

    const finishDrawing = () => {
        if (!nodeDrawing) {

            if (isDrawing && currentCoordinates) {
                setIsDrawing(false);

                const { x, y } = currentCoordinates;
                const end = whichNode(x, y);
                // console.log(end);

                if (!end) {
                    // dont draw the edge
                    // dont push it into edges
                    console.log("end node is null");
                }
                else if (end.id === startNode.id) {
                    // dont draw the edge
                    // dont push it into edges
                    console.log("end node = start node");
                }
                else {
                    contextRef.current.moveTo(startNode.centerX, startNode.centerY);
                    contextRef.current.lineTo(end.centerX, end.centerY);
                    contextRef.current.stroke();

                    if(!startNode.children.includes(end)){
                        startNode.children.push(end);
                        end.children.push(startNode);
                    }
                }
                contextRef.current.closePath();
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
        index = 0;
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
                // addNode,
                toggleNodeDrawing,
                nodeDrawing,
                nodesOfGraph,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

