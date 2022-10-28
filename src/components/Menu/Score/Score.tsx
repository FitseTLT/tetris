import { useContext } from "react";
import { TetrisContext } from "../../TetrisContext";
import "./Score.css";

export default function Score() {
    const { score, line } = useContext(TetrisContext);

    return (
        <div className="score">
            <h2>
                Score: <span>{score}</span>
            </h2>
            <h2>
                Line: <span>{line}</span>
            </h2>
        </div>
    );
}
