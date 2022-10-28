import "./Shape.css";
import Block, { BLOCK_WIDTH } from "../Blocks/Block";
import ShapeTypes from "../ShapeTypes";

interface ShapeProp {
    x?: number;
    y?: number;
    shapeType: number;
    rotVariation: number;
}

export default function Shape(props: ShapeProp) {
    const { x, y, shapeType, rotVariation } = props;

    if (x === undefined || y === undefined)
        return (
            <div className="tetris-shape" data-shape-type={shapeType}>
                {Object.entries(ShapeTypes[shapeType][rotVariation]).map(
                    ([key, value]) => {
                        const left = +key;
                        const map = [];

                        for (let i = value.start; i <= value.end; i++) {
                            const top = +i;
                            map.push(
                                <Block
                                    key={`${key}-${i}`}
                                    top={top}
                                    left={left}
                                />
                            );
                        }
                        return map;
                    }
                )}
            </div>
        );

    return (
        <div
            className="tetris-shape"
            style={{
                top: y * BLOCK_WIDTH + "rem",
                left: x * BLOCK_WIDTH + "rem",
            }}
            data-shape-type={shapeType}
        >
            {Object.entries(ShapeTypes[shapeType][rotVariation]).map(
                ([key, value]) => {
                    const left = +key;
                    const map = [];

                    for (let i = value.start; i <= value.end; i++) {
                        const top = +i;
                        map.push(
                            <Block key={`${key}-${i}`} top={top} left={left} />
                        );
                    }
                    return map;
                }
            )}
        </div>
    );
}
