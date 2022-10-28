const ShapeTypes: Record<
    string,
    Record<string, { start: number; end: number }>
>[] = [
    /**
     *     *
     *     *
     *     *
     *     *
     */ {
        "0": {
            "0": { start: -1, end: 2 },
        },
        "1": {
            "-2": { start: 0, end: 0 },
            "-1": { start: 0, end: 0 },
            "0": { start: 0, end: 0 },
            "1": { start: 0, end: 0 },
        },
        "2": {
            "0": { start: -1, end: 2 },
        },
        "3": {
            "-2": { start: 0, end: 0 },
            "-1": { start: 0, end: 0 },
            "0": { start: 0, end: 0 },
            "1": { start: 0, end: 0 },
        },
    },
    /**
     *     *
     *     * * *
     */ {
        "0": {
            "-1": { start: -1, end: 0 },
            "0": { start: 0, end: 0 },
            "1": { start: 0, end: 0 },
        },
        "1": {
            "0": { start: -1, end: 1 },
            "1": { start: -1, end: -1 },
        },
        "2": {
            "-1": { start: 0, end: 0 },
            "0": { start: 0, end: 0 },
            "1": { start: 0, end: 1 },
        },
        "3": {
            "0": { start: -1, end: 1 },
            "-1": { start: 1, end: 1 },
        },
    },
    /**
     *         *
     *     * * *
     */ {
        "0": {
            "-1": { start: 0, end: 0 },
            "0": { start: 0, end: 0 },
            "1": { start: -1, end: 0 },
        },
        "1": {
            "0": { start: -1, end: 1 },
            "1": { start: 1, end: 1 },
        },
        "2": {
            "-1": { start: 0, end: 1 },
            "0": { start: 0, end: 0 },
            "1": { start: 0, end: 0 },
        },
        "3": {
            "0": { start: -1, end: 1 },
            "-1": { start: -1, end: -1 },
        },
    },
    /**
     *     * *
     *     * *
     */ {
        "0": {
            "0": { start: 0, end: 1 },
            "1": { start: 0, end: 1 },
        },
        "1": {
            "0": { start: 0, end: 1 },
            "1": { start: 0, end: 1 },
        },
        "2": {
            "0": { start: 0, end: 1 },
            "1": { start: 0, end: 1 },
        },
        "3": {
            "0": { start: 0, end: 1 },
            "1": { start: 0, end: 1 },
        },
    },
    /**
     *     * *
     *   * *
     */
    {
        "0": {
            "-1": { start: 0, end: 0 },
            "0": { start: -1, end: 0 },
            "1": { start: -1, end: -1 },
        },
        "1": {
            "0": { start: -1, end: 0 },
            "1": { start: 0, end: 1 },
        },
        "2": {
            "-1": { start: 0, end: 0 },
            "0": { start: -1, end: 0 },
            "1": { start: -1, end: -1 },
        },
        "3": {
            "0": { start: -1, end: 0 },
            "1": { start: 0, end: 1 },
        },
    },
    /**
     *   * *
     *     * *
     */
    {
        "0": {
            "-1": { start: -1, end: -1 },
            "0": { start: -1, end: 0 },
            "1": { start: 0, end: 0 },
        },
        "1": {
            "0": { start: 0, end: 1 },
            "1": { start: -1, end: 0 },
        },
        "2": {
            "-1": { start: -1, end: -1 },
            "0": { start: -1, end: 0 },
            "1": { start: 0, end: 0 },
        },
        "3": {
            "0": { start: 0, end: 1 },
            "1": { start: -1, end: 0 },
        },
    },
    /**
     *     *
     *   * * *
     */
    {
        "0": {
            "-1": { start: 0, end: 0 },
            "0": { start: -1, end: 0 },
            "1": { start: 0, end: 0 },
        },
        "1": {
            "0": { start: -1, end: 1 },
            "1": { start: 0, end: 0 },
        },
        "2": {
            "-1": { start: 0, end: 0 },
            "0": { start: 0, end: 1 },
            "1": { start: 0, end: 0 },
        },
        "3": {
            "-1": { start: 0, end: 0 },
            "0": { start: -1, end: 1 },
        },
    },
];

export default ShapeTypes;
