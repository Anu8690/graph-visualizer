const createEdge = (nodeA, nodeB) => {
    const xA = nodeA.centerX;
    const yA = nodeA.centerY;
    const xB = nodeB.centerX;
    const yB = nodeB.centerY;
    const edge = { xA, yA, xB, yB};
    return edge;
}

export function visitAllEdges(graph, startNode) {
    graph.forEach((node) => {
        node.isVisited = false;
        node.parent = null;
    });
    const visitedEdgesInOrder = [];
    let bfsQueue = [startNode];

    while (bfsQueue.length) {
        const currentNode = bfsQueue.shift();
        currentNode.isVisited = true;
        currentNode.children.forEach(child => {
            if (!child.isVisited) {
                visitedEdgesInOrder.push(createEdge(currentNode, child));
                bfsQueue.push(child);
            }
        });
    }
    graph.forEach((node) => {
        node.isVisited = false;
        node.parent = null;
    });
    return  visitedEdgesInOrder ;
}