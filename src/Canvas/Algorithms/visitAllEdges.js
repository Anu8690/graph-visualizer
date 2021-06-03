const createEdge = (nodeA, nodeB) => {
    const xA = nodeA.centerX;
    const yA = nodeA.centerY;
    const xB = nodeB.centerX;
    const yB = nodeB.centerY;
    const edge = { xA, yA, xB, yB};
    return edge;
}

export function visitAllEdges(graph) {
    let canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    graph.forEach((node) => {
        node.isVisited = false;
        node.parent = null;
    });

    graph.forEach((node)=>{
        if(!node.isVisited){
            
            ctx.strokeStyle = "#000000";
            let { centerX, centerY } = node;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, 20, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();

            let bfsQueue = [node];
            while (bfsQueue.length) {
                const currentNode = bfsQueue.shift();
                currentNode.isVisited = true;
                currentNode.children.forEach(child => {
                    if (!child.isVisited) {
                        const edge = createEdge(currentNode, child);
                        const { xA, yA, xB, yB } = edge;
                        ctx.beginPath();
                        ctx.moveTo(xA, yA);
                        ctx.lineTo(xB, yB);
                        ctx.stroke();
                        ctx.closePath();
                        ctx.beginPath();
                        ctx.arc(xB, yB, 20, 0, Math.PI * 2, false);
                        ctx.stroke();
                        ctx.closePath();
                        bfsQueue.push(child);
                    }
                });
            }
        }
    });
    
    graph.forEach((node) => {
        node.isVisited = false;
        node.parent = null;
    });
}