import "./Block.css";

export const BLOCK_WIDTH = 10;

export default function Block(props: {
    top: number;
    left: number;
    blockType?: number;
    className?: string;
}) {
    const { top, left, blockType } = props;
    return (
        <div
            className={"tetris-block " + (props.className ?? "")}
            data-shape-type={blockType}
            style={{
                top: `${top * BLOCK_WIDTH}rem`,
                left: `${left * BLOCK_WIDTH}rem`,
            }}
        ></div>
    );
}
