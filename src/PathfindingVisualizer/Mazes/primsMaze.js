import DisjointSet from '../../Data Structures/disjointSet';
let disjointSet = new DisjointSet((node) => {
    return node.index;
});

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
        index: -1,
    };
}
function initialGrid(rowNum, colNum, startNode, finishNode) {
    disjointSet = new DisjointSet((node) => {
        return node.index;
    });
    const grid = [];
    let i = 0;
    for (let r = 0; r < rowNum; r++) {
        const row = [];
        for (let c = 0; c < colNum; c++) {
            const newNode = createNode(r, c, finishNode, startNode);
            if ((r % 2 == 0 || c % 2 == 0)) {
                newNode.isWall = true;
            }
            else {
                newNode.index = i;
                i++;
                disjointSet.makeSet(newNode);
            }
            if (newNode.isFinish || newNode.isStart) newNode.isWall = false;
            row.push(newNode);
        }
        grid.push(row);
    }
    return grid;
}

function getChildren(node, grid) {
    const childDirection = [[2, 0], [0, 2], [-2, 0], [0, -2]];
    const children = [];
    const { row, col } = node;
    childDirection.forEach(direction => {
        const childRow = row + direction[0];
        const childCol = col + direction[1];
        if (childRow > 0 && childCol > 0 && childRow < grid.length && childCol < grid[0].length) {
            const childNode = grid[childRow][childCol];
            children.push(childNode);
        }
    });
    return children;
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
function unionJoint(node, currentNode, grid) {
    const children = getChildren(node, grid);
    children.forEach(child => {
        if (disjointSet.inSameSet(child, currentNode) && !disjointSet.inSameSet(currentNode, node)) {
            removeWall(child, node, grid);
            disjointSet.union(currentNode, node);
        }
    });
    return;
}
export function primMaze(rowNum, colNum, startNode, finishNode) {
    const grid = initialGrid(rowNum, colNum, startNode, finishNode);

    let currentNode = grid[1][1];
    const edgeQueue = [grid[3][1], grid[1][3]];
    grid[3][1].isVisited = true;
    grid[1][3].isVisited = true;
    while (edgeQueue.length) {
        const random = Math.floor(Math.random() * edgeQueue.length);
        unionJoint(edgeQueue[random], currentNode, grid);
        currentNode = edgeQueue[random];
        const children = getChildren(currentNode, grid);
        if (children.length) {
            children.forEach(child => {
                if (!child.isVisited) {
                    edgeQueue.push(child);
                    child.isVisited = true;
                }
            });
        }
        edgeQueue.splice(random, 1);
    }
    grid.forEach(row => {
        row.forEach(node => {
            node.isVisited = false;
        });
    });
    return grid;
}