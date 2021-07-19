export function wallMaze(grid) {
    grid.forEach(row => {
        row.forEach(node => {
            node.isWall = false;
            if (!node.isStart && !node.isFinish) {
                const random = Math.floor(Math.random() * 4);
                if (random === 0) {
                    node.isWall = true;
                    node.weight = 1;
                }
            }
        });
    });
    return grid;
}