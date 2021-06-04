// DFS
const createEdge = (nodeA, nodeB) => {
    const xA = nodeA.centerX;
    const yA = nodeA.centerY;
    const xB = nodeB.centerX;
    const yB = nodeB.centerY;
    const edge = { xA, yA, xB, yB };
    return edge;
}

function getChildren(node) {
    const childElements = [];

    node.children.forEach((childObject) => {
        const child = childObject.node;
        if (!child.isVisited) {
            childElements.push(child);
        }
    });

    return childElements;
}

export function dfs(graph, startNode, finishNode) {
    const visitedNodesInOrder = [startNode];
    const visitedEdgesInOrder = [];
    startNode.isVisited = true;
    let currentNode = startNode;
    let dfsStack = [currentNode];
    while (dfsStack.length) {
        if (currentNode === finishNode) { 
            return { visitedNodesInOrder, visitedEdgesInOrder }; 
        }
        const childElements = getChildren(currentNode);
        if (childElements.length) {
            childElements[0].parent = currentNode;
            visitedEdgesInOrder.push(createEdge(currentNode, childElements[0]));
            currentNode = childElements[0];
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
            dfsStack.push(currentNode);
        }
        else {
            dfsStack.pop();
            currentNode = dfsStack[dfsStack.length - 1];
        }
    }
    return { visitedNodesInOrder, visitedEdgesInOrder };
}