import "./Next.css";
import React from "react";
import Shape from "../../Shape/Shape";
import { TetrisContext } from "../../TetrisContext";

export default function Next() {
    const { nextShape } = React.useContext(TetrisContext);

    return (
        <div className="next">
            <h2>Next:</h2>
            <Shape shapeType={nextShape} rotVariation={0} />
        </div>
    );
}
