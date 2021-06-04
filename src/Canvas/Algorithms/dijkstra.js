// Dijkstra
// still raw

const createEdge = (nodeA, nodeB) => {
    const xA = nodeA.centerX;
    const yA = nodeA.centerY;
    const xB = nodeB.centerX;
    const yB = nodeB.centerY;
    const edge = { xA, yA, xB, yB };
    return edge;
}

function getChildren(currentNode,visitedEdgesInOrder) {
    const childNodes = [];
    currentNode.children.forEach(childObject => {
        const { node, weight } = childObject;
        if (!node.isVisited) {
            childNodes.push(node);
            if (node.costFromSource > currentNode.costFromSource + weight) {
                node.parent = currentNode;
                visitedEdgesInOrder.push(createEdge(currentNode,node));
            }
            node.costFromSource = Math.min(node.costFromSource, currentNode.costFromSource + weight);
        }
        else if (node.isVisited) {
            if (node.costFromSource > currentNode.costFromSource + weight) {
                node.parent = currentNode;
                visitedEdgesInOrder.push(createEdge(currentNode, node));
            }
            node.costFromSource = Math.min(node.costFromSource, currentNode.costFromSource + weight);
        }
    })
    return childNodes;
}

function extractMinIndex(dijkstraPQ) {
    let minNode = dijkstraPQ[0];
    let minNodeIndex = 0;
    for (let i = 1; i < dijkstraPQ.length; i++) {
        let currentNode = dijkstraPQ[i];
        if (minNode.costFromSource > currentNode.costFromSource) {
            minNode = currentNode;
            minNodeIndex = i;
        }
    }
    return minNodeIndex;
}

export function dijkstra(graph, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const visitedEdgesInOrder = [];

    let currentNode;
    let dijkstraPQ = [startNode];
    startNode.costFromSource = 0;
    startNode.isVisited = true;
    while (dijkstraPQ.length) {

        const minIndex = extractMinIndex(dijkstraPQ);
        currentNode = dijkstraPQ[minIndex];
        if (currentNode === finishNode) {
            visitedNodesInOrder.push(currentNode);
            return { visitedNodesInOrder, visitedEdgesInOrder };
        }

        visitedNodesInOrder.push(currentNode);
        const childNodes = getChildren(currentNode,visitedEdgesInOrder);
        childNodes.forEach(node => {
            dijkstraPQ.push(node);
            node.isVisited = true;
        });
        dijkstraPQ.splice(minIndex, 1);
    }
    return {visitedNodesInOrder,visitedEdgesInOrder};
}

