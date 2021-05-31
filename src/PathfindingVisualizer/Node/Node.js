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
        const isWeight = (weight!==0);
        const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : isWall ? "node-wall" :isWeight ? "node-weight" : "";
        return (
            <td
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
                onMouseLeave={() => onMouseLeave(row,col)}
            >{weight === 1?"":weight}</td> // It is used to create the grid.
        );
    }
}
export default Node;