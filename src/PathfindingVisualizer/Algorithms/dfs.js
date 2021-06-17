// DFS

function getChildren(node, grid) {
    const { row, col } = node;
    const childElements = [];
    const childDirections = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    childDirections.forEach(direction => {
        const childRow = row + direction[0];
        const childCol = col + direction[1];
        if (childRow >= 0 && childCol >= 0 && childRow < grid.length && childCol < grid[0].length) {
            const child = grid[childRow][childCol];
            if (!child.isVisited && !child.isWall) {
                childElements.push(child);
            }
        }
    })

    return childElements;
}


export function dfs(grid,startNode,finishNode){
    const visitedNodesInOrder = [startNode];
    startNode.isVisited= true;
    let currentNode = startNode;
    let dfsStack = [currentNode];
    while (dfsStack.length) {
        if(currentNode.isFinish) return visitedNodesInOrder;
        const childElements = getChildren(currentNode, grid);
        if (childElements.length) {
            childElements[0].parent = currentNode;
            currentNode = childElements[0];
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
            dfsStack.push(currentNode);
        }
        else { 
            dfsStack.pop();
            currentNode = dfsStack[dfsStack.length-1];
        }
    }
    return visitedNodesInOrder;
}
