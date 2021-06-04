const createEdge = (nodeA, nodeB) => {
    const xA = nodeA.centerX;
    const yA = nodeA.centerY;
    const xB = nodeB.centerX;
    const yB = nodeB.centerY;
    const edge = { xA, yA, xB, yB };
    return edge;
}

const writeText = (info, style = {}) => {
    const canvas = document.getElementById('canvas');
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

export function visitAllEdges(graph) {
    let canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    graph.forEach((node) => {
        node.isVisited = false;
        node.parent = null;
        node.costFromSource = Number.POSITIVE_INFINITY;
    });

    graph.forEach((node) => {
        writeText({ text: `${node.id}`, x: node.centerX - 35, y: node.centerY - 35 });
        if (!node.isVisited) {

            ctx.strokeStyle = "#000000";
            let { centerX, centerY } = node;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, 20, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();

            let bfsQueue = [node];
            while (bfsQueue.length) {
                const currentNode = bfsQueue.shift();
                currentNode.isVisited = true;
                currentNode.children.forEach(childObject => {
                    const child = childObject.node;
                    if (!child.isVisited) {
                        const edge = createEdge(currentNode, child);
                        const { xA, yA, xB, yB } = edge;
                        const x = (xA + xB) / 2;
                        const y = (yA + yB) / 2;
                        const weight = (childObject.weight ? childObject.weight:'');
                        writeText({text:weight,x,y});
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
        node.costFromSource = Number.POSITIVE_INFINITY;
    });
}