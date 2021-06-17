import DisjointSet from '../../Data Structures/disjointSet';

const getEdgeWeight = (nodeA, nodeB) => {
    for (let i = 0; i < nodeA.children.length; i++) {
        const { node, weight } = nodeA.children[i];
        if (node === nodeB) {
            return weight;
        }
    }
    return null;
}
const createEdge = (nodeA, nodeB) => {
    const edgeWeight = getEdgeWeight(nodeA, nodeB);
    const edge = { nodeA, nodeB, edgeWeight };
    return edge;
}

function compare(edgeA, edgeB) {
    return edgeA.edgeWeight - edgeB.edgeWeight;
}

export function kruskalsMST(graph) {
    let disjointSet = new DisjointSet((node) => {
        return node.id;
    });
    graph.forEach((node) => {
        node.isVisited = false;
        node.parent = null;
        node.costFromSource = Number.POSITIVE_INFINITY;
        disjointSet.makeSet(node);
    });
    const graphEdges = [];
    graph.forEach((node) => {
        if (!node.isVisited) {
            let bfsQueue = [node];
            while (bfsQueue.length) {
                const currentNode = bfsQueue.shift();
                currentNode.isVisited = true;
                currentNode.children.forEach(childObject => {
                    const child = childObject.node;
                    if (!child.isVisited) {
                        const edge = createEdge(currentNode, child);
                        graphEdges.push(edge);
                        bfsQueue.push(child);
                    }
                });
            }
        }
    });
    graphEdges.sort(compare);

    const kruskalSelectedEdges = [];
    graphEdges.forEach((edge) => {
        const {nodeA,nodeB} = edge;
        if(!disjointSet.inSameSet(nodeA,nodeB)){
            kruskalSelectedEdges.push(edge);
            disjointSet.union(nodeA,nodeB);
        }
    });

    return kruskalSelectedEdges;

}