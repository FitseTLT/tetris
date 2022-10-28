import React from "react";
import Blocks from "./Blocks/Blocks";
import Shape from "./Shape/Shape";

interface Prop {
    blocks: number[][];
    currentShape: number;
    currTop: number;
    currLeft: number;
    currRot: number;
}

export default function Tetris(props: Prop) {
    const { blocks, currentShape, currTop, currLeft, currRot } = props;

    return (
        <div className="tetris">
            <Shape
                shapeType={currentShape}
                x={currLeft}
                y={currTop}
                rotVariation={currRot}
            />
            <Blocks blocks={blocks} />
        </div>
    );
}
