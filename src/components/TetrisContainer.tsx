import React, { Component } from "react";
import Menu from "./Menu/Menu";
import OverlayMenu from "./OverlayMenu/OverlayMenu";
import ShapeTypes from "./ShapeTypes";
import Tetris from "./Tetris";
import { TetrisContext } from "./TetrisContext";

const STARTING_LEFT = 4;
export const STARTING_ROTATION = 0;

interface State {
    rot: number;
    blocks: number[][];
    currentShape: number;
    currTop: number;
    currLeft: number;
    currRot: number;
    nextShape: number;
    fullRows: number[];
    score: number;
    line: number;
    screenType: string;
}

export default class TetrisContainerextends extends Component<{}, State> {
    delay = 500;
    interval!: number;
    keyPressed: string = "";

    constructor(props: {}) {
        super(props);
        let blocks = new Array(20);
        for (let i = 0; i < 20; i++) blocks[i] = new Array(10);

        const currentShape = this.getRandomShape();

        this.state = {
            rot: STARTING_ROTATION,
            blocks: blocks,
            currTop: this.getStartingPos(currentShape),
            currLeft: STARTING_LEFT,
            currRot: STARTING_ROTATION,
            currentShape: currentShape,
            nextShape: this.getRandomShape(),
            fullRows: [],
            score: 0,
            line: 0,
            screenType: "game",
        };

        this.nextShape = this.nextShape.bind(this);
        this.animate = this.animate.bind(this);
        this.checkFullRows = this.checkFullRows.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);
        this.setKeyPressed = this.setKeyPressed.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.playGame = this.playGame.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.replay = this.replay.bind(this);
    }

    gameOver() {
        clearInterval(this.interval);
        this.setState({ ...this.state, screenType: "game-over" });
    }

    pauseGame() {
        clearInterval(this.interval);
        this.setState({ ...this.state, screenType: "game-paused" });
    }

    playGame() {
        this.interval = window.setInterval(this.animate, this.delay);
        this.setState({ ...this.state, screenType: "game" });
    }

    replay() {
        let blocks = new Array(20);
        for (let i = 0; i < 20; i++) blocks[i] = new Array(10);

        const currentShape = this.getRandomShape();

        this.setState({
            rot: STARTING_ROTATION,
            blocks,
            currTop: this.getStartingPos(currentShape),
            currLeft: STARTING_LEFT,
            currRot: STARTING_ROTATION,
            currentShape: currentShape,
            nextShape: this.getRandomShape(),
            fullRows: [],
            score: 0,
            line: 0,
            screenType: "game",
        });

        this.interval = window.setInterval(this.animate, this.delay);
    }

    setKeyPressed(key: string) {
        if (this.keyPressed === "" && key === "long-press") return;
        if (key !== "long-press") this.keyPressed = key;
        this.handleInput(this.keyPressed);
        setTimeout(() => this.setKeyPressed("long-press"), 150);
    }

    handleKeyboard(e: KeyboardEvent) {
        e.stopImmediatePropagation();
        if (e.key === " ") {
            this.state.screenType === "game"
                ? this.pauseGame()
                : this.playGame();
        } else if (this.keyPressed === "") this.setKeyPressed(e.key);
    }

    handleInput(type: string) {
        let { blocks, currRot, currLeft, currTop, currentShape } = this.state;

        switch (type) {
            case "ArrowUp":
                currRot = (currRot + 1) % 4;
                break;
            case "ArrowLeft":
                currLeft--;
                break;
            case "ArrowRight":
                currLeft++;
                break;
            case "ArrowDown":
                currTop++;
                break;
        }

        if (this.checkMove(blocks, currentShape, currLeft, currTop, currRot))
            this.setState({ ...this.state, currLeft, currRot, currTop });
    }

    componentDidMount() {
        this.interval = window.setInterval(this.animate, this.delay);
        window.addEventListener("keydown", this.handleKeyboard.bind(this));
        window.addEventListener("keyup", () => this.setKeyPressed(""));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        window.removeEventListener("keydown", this.handleKeyboard);
    }

    changeSpeed() {
        this.delay > 50 && (this.delay -= 10);
        clearInterval(this.interval);
        this.interval = window.setInterval(this.animate, this.delay);
    }

    checkMove(
        blocks: number[][],
        currentShape: number,
        left: number,
        top: number,
        rot: number
    ) {
        const shapeObj = ShapeTypes[currentShape][rot];

        const canMove = Object.entries(shapeObj).every(([key, value]) => {
            let resp = true;

            for (let i = value.start; i <= value.end; i++)
                if (
                    top + i >= 0 &&
                    !(
                        top + i < 20 &&
                        left + +key >= 0 &&
                        left + +key < 10 &&
                        !Number.isInteger(blocks[top + i][+key + left])
                    )
                ) {
                    resp = false;
                    break;
                }
            return resp;
        });

        return canMove;
    }

    getRandomShape() {
        const noOfShapes = 7;
        return Math.floor(Math.random() * noOfShapes);
    }

    getStartingPos(shapeType: number) {
        const shapeObj = ShapeTypes[shapeType][STARTING_ROTATION];
        const max = Object.values(shapeObj).reduce(
            (prev, value) => (value.end > prev ? value.end : prev),
            0
        );
        return -max;
    }

    checkFullRows(blocks: number[][], top: number, bottom: number): number[] {
        const fullRows: number[] = [];
        for (let i = top; i <= bottom; i++) {
            let rowIsFull = true;
            for (let j = 0; j < 10; j++) {
                if (!Number.isInteger(blocks[i][j])) {
                    rowIsFull = false;
                    break;
                }
            }
            if (rowIsFull) fullRows.push(i);
        }

        if (fullRows.length) {
            this.changeSpeed();
            setTimeout(() => {
                const newBlocksArr: number[][] = [new Array(10)];
                let noRows = fullRows.length;
                for (let i = 1; i < 20; i++) {
                    newBlocksArr.push(
                        i - noRows >= 0
                            ? [...blocks[i - noRows]]
                            : new Array(10)
                    );
                    if (fullRows.includes(i - noRows + 1)) {
                        noRows--;
                        let row = i - noRows + 1;
                        while (fullRows.includes(row)) {
                            noRows--;
                            row++;
                        }
                    }
                }
                const line = this.state.line + fullRows.length;
                let score = this.state.score;
                switch (fullRows.length) {
                    case 1:
                        score += 100;
                        break;
                    case 2:
                        score += 250;
                        break;
                    case 3:
                        score += 450;
                        break;
                    case 4:
                        score += 800;
                        break;
                }

                this.setState({
                    ...this.state,
                    fullRows: [],
                    blocks: newBlocksArr,
                    line: line,
                    score: score,
                });
            }, 800);
        }
        return fullRows;
    }

    nextShape() {
        const { currentShape, currRot, currLeft, currTop, blocks } = this.state;
        // update blocks[][]
        const shapeObj = ShapeTypes[currentShape][currRot];
        const blocksArr = JSON.parse(JSON.stringify(blocks));
        let isGameOver = false;
        Object.entries(shapeObj).forEach(([key, value]) => {
            for (let i = value.start; i <= value.end; i++) {
                if (currTop + i <= 0) isGameOver = true;
                currTop + i >= 0 &&
                    (blocksArr[currTop + i][currLeft + +key] = currentShape);
            }
        });
        if (isGameOver) {
            this.gameOver();
            return;
        }

        //Check full rows
        let top = 0,
            bottom = 0;
        Object.values(shapeObj).forEach((value) => {
            top = Math.min(top, value.start);
            bottom = Math.max(bottom, value.end);
        });
        const fullRows = this.checkFullRows(
            blocksArr,
            top + currTop,
            bottom + currTop
        );

        // next shape
        const nextShape = this.getRandomShape();

        const newPos = this.getStartingPos(this.state.nextShape);

        this.setState({
            ...this.state,
            blocks: blocksArr,
            currentShape: this.state.nextShape,
            nextShape: nextShape,
            currLeft: STARTING_LEFT,
            currTop: newPos,
            currRot: 0,
            fullRows,
        });
    }

    animate() {
        const { currentShape, currRot, currLeft, currTop, blocks } = this.state;

        const canMove = this.checkMove(
            blocks,
            currentShape,
            currLeft,
            currTop + 1,
            currRot
        );

        if (canMove) {
            this.setState({
                ...this.state,
                currTop: this.state.currTop + 1,
            });
        } else {
            this.nextShape();
        }
    }

    render() {
        const {
            blocks,
            currentShape,
            currTop,
            currLeft,
            currRot,
            screenType,
            score,
            line,
        } = this.state;

        return (
            <div className="tetris-container">
                <OverlayMenu
                    screenType={screenType}
                    playGame={this.playGame}
                    score={score}
                    line={line}
                    replay={this.replay}
                />
                <TetrisContext.Provider
                    value={{
                        nextShape: this.state.nextShape,
                        handleInput: this.handleInput.bind(this),
                        fullRows: this.state.fullRows,
                        score: this.state.score,
                        line: this.state.line,
                        setKeyPressed: this.setKeyPressed,
                    }}
                >
                    <Tetris
                        blocks={blocks}
                        currLeft={currLeft}
                        currRot={currRot}
                        currentShape={currentShape}
                        currTop={currTop}
                    />

                    <Menu pauseGame={this.pauseGame} />
                </TetrisContext.Provider>
            </div>
        );
    }
}
