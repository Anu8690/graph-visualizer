function distribution() {
    const random1 = Math.random();
    if (random1 < 0.5) {
        const random2 = Math.floor(Math.random() * 10 + 1);
        return random2;
    }
    return 1;
}
export function weightMaze(grid) {
    grid.forEach(row => {
        row.forEach(node => {
            if (!node.isWall) {
                node.weight = distribution();
            }
        });
    });
    return grid;
}