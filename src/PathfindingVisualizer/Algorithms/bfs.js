// BFS

export function bfs (grid,startNode,finishNode) {
    const visitedNodesInOrder = [];
    let bfsQueue = [startNode];
    startNode.isVisited = true;
    const childDirections = [[1,0],[0,1],[-1,0],[0,-1]] ;

    while(bfsQueue.length)
    {
        const currentNode = bfsQueue.shift();
        if (currentNode === finishNode) return visitedNodesInOrder;
        visitedNodesInOrder.push(currentNode);
        const {row,col} = currentNode;

        childDirections.forEach(direction => {
            let x = row + direction[0];
            let y = col + direction[1];

            if(x>=0 && y>=0 && x<grid.length && y<grid[0].length && !grid[x][y].isWall && !grid[x][y].isVisited)
            {
                bfsQueue.push(grid[x][y]);
                grid[x][y].isVisited = true;
                grid[x][y].parent = currentNode;
            }
        });
    }
    return visitedNodesInOrder;
}

