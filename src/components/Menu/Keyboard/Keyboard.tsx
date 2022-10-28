import "./Keyboard.css";
import { useContext } from "react";
import { TetrisContext } from "../../TetrisContext";

const KEYS = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export default function Keyboard() {
    const { setKeyPressed } = useContext(TetrisContext);

    return (
        <div className="keyboard">
            {KEYS.map((key) => (
                <button
                    className={key}
                    key={key}
                    onMouseDown={() => setKeyPressed && setKeyPressed(key)}
                    onMouseUp={() => setKeyPressed && setKeyPressed("")}
                >
                    <i className="fa fa-arrow-up"></i>
                </button>
            ))}
        </div>
    );
}
