// jsx for each node AKA eac cel on the grid
import React from 'react';
import './Node.css'
class Node extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            row,
            col,
            weight,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            onMouseLeave,
        } = this.props;
        const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : isWall ? "node-wall" : "";
        return (
            <td
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
                onMouseLeave={() => onMouseLeave(row, col)}
            ><b>{weight === 1 ? "" : weight}</b></td> // It is used to create the grid.
        );
    }
}
export default Node;