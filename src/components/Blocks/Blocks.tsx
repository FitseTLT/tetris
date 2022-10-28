import { useContext } from "react";
import { TetrisContext } from "../TetrisContext";
import Block from "./Block";

export default function Blocks(props: { blocks: number[][] }) {
    const { blocks } = props;
    const { fullRows } = useContext(TetrisContext);
    let noFullRows = fullRows.length;

    return (
        <>
            {blocks.map((row, top) => {
                if (fullRows.includes(top)) noFullRows--;
                return row.map(
                    (block, left) =>
                        block !== null && (
                            <Block
                                className={
                                    fullRows.includes(top)
                                        ? " full-row blink-animation"
                                        : noFullRows
                                        ? ` go-down-${noFullRows}`
                                        : ""
                                }
                                blockType={block}
                                top={top}
                                left={left}
                                key={`${top}-${left}-`}
                            />
                        )
                );
            })}
        </>
    );
}
