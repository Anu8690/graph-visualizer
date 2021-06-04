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

export function primsMST(graph) {
    let disjointSet = new DisjointSet((node) => {
        return node.id;
    });
    graph.forEach((node) => {
        node.isVisited = false;
        node.parent = null;
        node.costFromSource = Number.POSITIVE_INFINITY;
        disjointSet.makeSet(node);
    });
    const primSelectedEdges = [];

    let currentNode = graph[0];
    const graphEdgesQueue = [];
    for(let i=0;i<currentNode.children.length;i++){
        const {node,weight} = currentNode.children[i];
        graphEdgesQueue.push(createEdge(currentNode,node));
    }
    graphEdgesQueue.sort(compare);
    
    while(graphEdgesQueue.length){
        const { nodeA, nodeB} = graphEdgesQueue[0];
        if(!disjointSet.inSameSet(nodeA,nodeB)){
            disjointSet.union(nodeA,nodeB);
            currentNode = graphEdgesQueue[0].nodeB;
            primSelectedEdges.push(graphEdgesQueue.shift());
            for (let i = 0; i < currentNode.children.length; i++) {
                const { node } = currentNode.children[i];
                graphEdgesQueue.push(createEdge(currentNode, node));
            }
            graphEdgesQueue.sort(compare);
        }
        else graphEdgesQueue.shift();
    }

    return primSelectedEdges;
}