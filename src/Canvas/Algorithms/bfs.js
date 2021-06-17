// BFS
const createEdge = (nodeA,nodeB)=>{
    if(nodeA === null){
        const xB = nodeB.centerX;
        const yB = nodeB.centerY;
        return {xB,yB,xB,yB};
    }
    const xA = nodeA.centerX;
    const yA = nodeA.centerY;
    const xB = nodeB.centerX;
    const yB = nodeB.centerY;
    const edge = {xA,yA,xB,yB};
    return edge;
}

export function bfs(graph, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const visitedEdgesInOrder = [];
    let bfsQueue = [startNode];
    startNode.isVisited = true;

    while (bfsQueue.length) {
        const currentNode = bfsQueue.shift();
        visitedNodesInOrder.push(currentNode);
        visitedEdgesInOrder.push(createEdge(currentNode.parent, currentNode));
        if (currentNode === finishNode) {
            return { visitedNodesInOrder, visitedEdgesInOrder }
        };
        currentNode.children.forEach(childObject => {
            const child = childObject.node;
            if(!child.isVisited){
                child.isVisited = true;
                child.parent = currentNode;
                bfsQueue.push(child);
            }
        });
    }
    return { visitedNodesInOrder, visitedEdgesInOrder };
}