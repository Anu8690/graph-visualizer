import React, {useContext} from 'react'
import { CanvasContext } from "./CanvasContext";

export const ClearCanvasButton = () => {
    const { clearCanvas } = useContext(CanvasContext);

    return <button onClick={clearCanvas}>Clear</button>
}