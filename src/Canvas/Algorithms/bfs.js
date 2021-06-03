// BFS
const createEdge = (nodeA,nodeB)=>{
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
        if (currentNode === finishNode) {
            // console.log(visitedEdgesInOrder);
            return { visitedNodesInOrder, visitedEdgesInOrder }
        };
        currentNode.children.forEach(childObject => {
            const child = childObject.node;
            if(!child.isVisited){
                child.isVisited = true;
                child.parent = currentNode;
                // console.log(child);
                visitedEdgesInOrder.push(createEdge(currentNode,child));
                bfsQueue.push(child);
            }
        });
    }
    return { visitedNodesInOrder, visitedEdgesInOrder };
}