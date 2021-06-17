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
    const hChildDirections = [[2, 0], [-2, 0]];
    const vChildDirections = [[0, 2], [0, -2]];

    const hChildElements = [];
    hChildDirections.forEach(direction => {
        const childRow = row + direction[0];
        const childCol = col + direction[1];
        if (childRow >= 0 && childCol >= 0 && childRow < grid.length && childCol < grid[0].length) {
            const child = grid[childRow][childCol];
            if (!child.isVisited) {
                hChildElements.push(child);
            }
        }
    });
    childElements.push(hChildElements);

    const vChildElements = [];
    vChildDirections.forEach(direction => {
        const childRow = row + direction[0];
        const childCol = col + direction[1];
        if (childRow >= 0 && childCol >= 0 && childRow < grid.length && childCol < grid[0].length) {
            const child = grid[childRow][childCol];
            if (!child.isVisited) {
                vChildElements.push(child);
            }
        }
    });
    childElements.push(vChildElements);
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

export function verticalSkewMaze(rowNum, colNum, startNode, finishNode) {
    const grid = initialGrid(rowNum, colNum, startNode, finishNode);

    let currentNode = grid[1][1];
    let dfsStack = [currentNode];

    while (dfsStack.length) {
        const childElements = getChildren(currentNode, grid);
        if (childElements[0].length || childElements[1].length) {
            const random1 = Math.floor(Math.random() * 4);
            if (random1 !== 3 && childElements[0].length) {
                const random = Math.floor(Math.random() * childElements[0].length);
                removeWall(currentNode, childElements[0][random], grid);
                currentNode = childElements[0][random];
                currentNode.isVisited = true;
                dfsStack.push(currentNode);
            }
            else if (random1 === 3 && childElements[1].length) {
                const random = Math.floor(Math.random() * childElements[1].length);
                removeWall(currentNode, childElements[1][random], grid);
                currentNode = childElements[1][random];
                currentNode.isVisited = true;
                dfsStack.push(currentNode);
            }
            else if (childElements[1].length) {
                const random = Math.floor(Math.random() * childElements[1].length);
                removeWall(currentNode, childElements[1][random], grid);
                currentNode = childElements[1][random];
                currentNode.isVisited = true;
                dfsStack.push(currentNode);
            }
            else {
                const random = Math.floor(Math.random() * childElements[0].length);
                removeWall(currentNode, childElements[0][random], grid);
                currentNode = childElements[0][random];
                currentNode.isVisited = true;
                dfsStack.push(currentNode);
            }
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

