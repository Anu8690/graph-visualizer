function createNode(row, col, finishNode, startNode) {
    const srow = startNode.row;
    const scol = startNode.col;
    const frow = finishNode.row;
    const fcol = finishNode.col;
    return {
        row: row,
        col: col,
        isVisited: false,
        isWall: false,
        parent: null,
        isNode: true,
        isStart:
            row === srow && col === scol,
        isFinish:
            row === frow && col === fcol,
        weight: 1,
        costFromSource: (row === srow && col === scol) ? 0 : Number.POSITIVE_INFINITY,
    };
}

// assumed rowNum ans colNum are odd

function initialGrid(rowNum, colNum, startNode, finishNode) {
    const grid = [];
    for (let r = 0; r < rowNum; r++) {
        const row = [];
        for (let c = 0; c < colNum; c++) {
            const newNode = createNode(r, c, finishNode, startNode);
            if ((r % 2 == 0 || c % 2 == 0)) newNode.isWall = true;
            if (newNode.isFinish || newNode.isStart) newNode.isWall = false;
            row.push(newNode);
        }
        grid.push(row);
    }
    return grid;
}

function getChildren(node, grid) {
    const { row, col } = node;
    const childElements = [];
    const childDirections = [[2, 0], [0, 2], [-2, 0], [0, -2]];

    childDirections.forEach(direction => {
        const childRow = row + direction[0];
        const childCol = col + direction[1];
        if (childRow >= 0 && childCol >= 0 && childRow < grid.length && childCol < grid[0].length) {
            const child = grid[childRow][childCol];
            if (!child.isVisited) {
                // child.isVisited = true;
                childElements.push(child);
            }
        }
    })

    return childElements;
}

function removeWall(nodeA, nodeB, grid) {

    const rowA = nodeA.row;
    const colA = nodeA.col;
    const rowB = nodeB.row;
    const colB = nodeB.col;

    const r = Math.floor((rowA + rowB) / 2);
    const c = Math.floor((colA + colB) / 2);

    grid[r][c].isWall = false;
    return;
}

export function maze(rowNum, colNum, startNode, finishNode) {
    const grid = initialGrid(rowNum, colNum, startNode, finishNode);

    let currentNode = grid[1][1];
    let dfsStack = [currentNode];

    while (dfsStack.length) {
        const childElements = getChildren(currentNode, grid);
        if (childElements.length) {
            const random = Math.floor(Math.random() * childElements.length);
            removeWall(currentNode, childElements[random], grid);
            currentNode = childElements[random];
            currentNode.isVisited = true;
            dfsStack.push(currentNode);
        }
        else {
            currentNode = dfsStack.pop();
        }
    }
    grid.forEach(row => {
        row.forEach(node => {
            node.isVisited = false;
        });
    });
    return grid;
}

