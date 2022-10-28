import React from "react";

export const TetrisContext = React.createContext<{
    nextShape: number;
    handleInput: Function | null;
    fullRows: number[];
    score: number;
    line: number;
    setKeyPressed: Function | null;
}>({
    nextShape: 0,
    handleInput: null,
    fullRows: [],
    score: 0,
    line: 0,
    setKeyPressed: null,
});
