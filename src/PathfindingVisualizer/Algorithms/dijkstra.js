// Dijkstra

function getChildren (grid,node){
    const childDirections = [[1,0],[0,1],[-1,0],[0,-1]];
    const childNodes = [];
    const {row,col} = node;
    childDirections.forEach(direction=>{
        const childRow = row + direction[0];
        const childCol = col + direction[1];

        if(childRow >=0&& childCol>=0 && childCol<grid[0].length && childRow<grid.length)
        {
            const childNode = grid[childRow][childCol];
            if(!childNode.isVisited && !childNode.isWall)
            {
                childNodes.push(childNode);
                if(childNode.costFromSource > node.costFromSource + childNode.weight)
                {
                    childNode.parent = node;
                }
                childNode.costFromSource = Math.min(childNode.costFromSource, node.costFromSource + childNode.weight);
            }
            else if(childNode.isVisited)
            {
                if (childNode.costFromSource > node.costFromSource + childNode.weight) {
                    childNode.parent = node;
                }
                childNode.costFromSource = Math.min(childNode.costFromSource, node.costFromSource + childNode.weight);
            }
        }
    })
    return childNodes;
}

function extractMinIndex (dijkstraPQ){
    let minNode = dijkstraPQ[0];
    let minNodeIndex=0;
    for(let i=1;i<dijkstraPQ.length;i++)
    {
        let currentNode = dijkstraPQ[i];
        if(minNode.costFromSource > currentNode.costFromSource)
        {
            minNode = currentNode;
            minNodeIndex = i;
        }
    }
    return minNodeIndex;
}

export function dijkstra(grid,startNode,finishNode){
    const visitedNodesInOrder = [];

    let currentNode;
    let dijkstraPQ = [startNode];
    startNode.isVisited=true;
    while(dijkstraPQ.length)
    {
        const minIndex = extractMinIndex(dijkstraPQ);
        currentNode = dijkstraPQ[minIndex];
        if(currentNode.isFinish) return visitedNodesInOrder;

        visitedNodesInOrder.push(currentNode);
        const childNodes = getChildren(grid,currentNode);
        childNodes.forEach(node => {
            dijkstraPQ.push(node);
            node.isVisited=true;
        });
        dijkstraPQ.splice(minIndex,1);
    }
    return visitedNodesInOrder;
}

