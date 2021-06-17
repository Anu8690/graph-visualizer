// with data structure
// working fine
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
let hWallSet = [];
let vWallSet = [];
let rootNodeIndex = [];
function initialGrid(rowNum, colNum, startNode, finishNode) {
    disjointSet = new DisjointSet((node) => {
        return node.index;
    });
    hWallSet = [];
    vWallSet = [];
    const grid = [];
    let i = 0;
    for (let r = 0; r < rowNum; r++) {
        const row = [];
        for (let c = 0; c < colNum; c++) {
            const newNode = createNode(r, c, finishNode, startNode);
            if ((r % 2 == 0 || c % 2 == 0)) {
                newNode.isWall = true;
                if (c % 2 === 0 && r % 2 === 1 && c > 0 && c < colNum - 1) {
                    hWallSet.push(newNode);
                }
                else if (r % 2 === 0 && c % 2 === 1 && r > 0 && r < rowNum - 1) {
                    vWallSet.push(newNode);
                }
            }
            else {
                newNode.index = i;
                // rootNodeIndex.push(i);
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
export function kruskalMaze(rowNum, colNum, startNode, finishNode) {
    const grid = initialGrid(rowNum, colNum, startNode, finishNode);
    while (hWallSet.length || vWallSet.length) {
        const random1 = Math.floor(Math.random() * 2);
        if (random1 && hWallSet.length) {
            const random2 = Math.floor(Math.random() * hWallSet.length);
            const node = hWallSet[random2];
            const { row, col } = node;
            const neighborNodeRight = grid[row][col + 1];
            const neighborNodeLeft = grid[row][col - 1];
            if (!disjointSet.inSameSet(neighborNodeLeft, neighborNodeRight)) {
                node.isWall = false;
                disjointSet.union(neighborNodeLeft, neighborNodeRight);
            }
            hWallSet.splice(random2, 1);
        }
        else if (!random1 && vWallSet.length) {
            const random2 = Math.floor(Math.random() * vWallSet.length);
            const node = vWallSet[random2];
            const { row, col } = node;
            const neighborNodeRight = grid[row + 1][col];
            const neighborNodeLeft = grid[row - 1][col];
            if (!disjointSet.inSameSet(neighborNodeLeft, neighborNodeRight)) {
                node.isWall = false;
                disjointSet.union(neighborNodeLeft, neighborNodeRight);
            }
            vWallSet.splice(random2, 1);
        }
        else if (hWallSet.length) {
            const random2 = Math.floor(Math.random() * hWallSet.length);
            const node = hWallSet[random2];
            const { row, col } = node;
            const neighborNodeRight = grid[row][col + 1];
            const neighborNodeLeft = grid[row][col - 1];
            if (!disjointSet.inSameSet(neighborNodeLeft, neighborNodeRight)) {
                node.isWall = false;
                disjointSet.union(neighborNodeLeft, neighborNodeRight);
            }
            hWallSet.splice(random2, 1);
        }
        else if (vWallSet.length) {
            const random2 = Math.floor(Math.random() * vWallSet.length);
            const node = vWallSet[random2];
            const { row, col } = node;
            const neighborNodeRight = grid[row + 1][col];
            const neighborNodeLeft = grid[row - 1][col];
            if (!disjointSet.inSameSet(neighborNodeLeft, neighborNodeRight)) {
                node.isWall = false;
                disjointSet.union(neighborNodeLeft, neighborNodeRight);
            }
            vWallSet.splice(random2, 1);
        }
    }
    return grid;
}