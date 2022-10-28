import { useEffect, useState } from "react";
import "./OverlayMenu.css";

export default function OverlayMenu(props: {
    screenType: string;
    playGame: Function;
    score: number;
    line: number;
    replay: Function;
}) {
    const { screenType, playGame, score, line, replay } = props;
    return screenType !== "game" ? (
        <div className="overlay">
            <div className="overlay-menu">
                {screenType === "game-paused" && (
                    <GamePaused playGame={playGame} replay={replay} />
                )}
                {screenType === "game-over" && (
                    <GameOver score={score} line={line} replay={replay} />
                )}
            </div>
        </div>
    ) : (
        <></>
    );
}

function GameOver(props: { line: number; score: number; replay: Function }) {
    const { score, line, replay } = props;
    const [record, setRecord] = useState({ name: "", score: 0 });
    const [recordBroken, setRecordBroken] = useState(false);
    const [name, setName] = useState("");

    const checkRecord = () => {
        const recScore = localStorage.getItem("tetris-score");
        if (recScore) {
            const parsed = JSON.parse(recScore);
            if (score > +parsed.score) {
                setRecordBroken(true);
                setRecord({ name: parsed.name, score: +parsed.score });
            }
        } else if (score) setRecordBroken(true);
    };

    const registerRecord = () => {
        const record = { name, score };
        localStorage.setItem("tetris-score", JSON.stringify(record));
        setRecordBroken(false);
    };

    useEffect(() => {
        checkRecord();
    }, []);

    return (
        <>
            <h2 className="title">Game Over</h2>
            <div className="score-container">
                <h3 className="score">
                    Score: <span>{score}</span>
                </h3>
                <h3 className="score">
                    Line: <span>{line}</span>
                </h3>
            </div>
            {recordBroken && (
                <div className="record-broken">
                    <h2 className="title">Congratulations!!!</h2>
                    <h3>
                        You have broken the record of score{" "}
                        <span className="numbers">{record.score}</span> held by{" "}
                        <span className="numbers">
                            {record.name === "" ? "Someone" : record.name}
                        </span>
                    </h3>
                    <input
                        className="record-name"
                        type="text"
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={registerRecord}>Enter</button>
                </div>
            )}
            {!recordBroken && <button onClick={() => replay()}>Replay</button>}
        </>
    );
}

function GamePaused(props: { playGame: Function; replay: Function }) {
    const { playGame, replay } = props;
    return (
        <>
            <h2 className="title">Game Paused</h2>
            <button onClick={() => playGame()} className="btn">
                Continue
            </button>
            <button onClick={() => replay()} className="btn">
                Restart Game
            </button>
        </>
    );
}
