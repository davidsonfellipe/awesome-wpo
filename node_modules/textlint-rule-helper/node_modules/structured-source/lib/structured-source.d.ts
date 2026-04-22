export type SourceRange = readonly [number, number];
export type SourcePosition = {
    readonly line: number;
    readonly column: number;
};
export type SourceLocation = {
    readonly end: SourcePosition;
    readonly start: SourcePosition;
};
/**
 * StructuredSource
 */
export declare class StructuredSource {
    private readonly indice;
    /**
     * @constructs StructuredSource
     * @param {string} source - source code text.
     */
    constructor(source: string);
    get line(): number;
    /**
     * @param {SourceLocation} loc - location indicator.
     * @return {[ number, number ]} range.
     */
    locationToRange(loc: SourceLocation): SourceRange;
    /**
     * @param {[ number, number ]} range - pair of indice.
     * @return {SourceLocation} location.
     */
    rangeToLocation(range: SourceRange): SourceLocation;
    /**
     * @param {SourcePosition} pos - position indicator.
     * @return {number} index.
     */
    positionToIndex(pos: SourcePosition): number;
    /**
     * @param {number} index - index to the source code.
     * @return {SourcePosition} position.
     */
    indexToPosition(index: number): SourcePosition;
}
//# sourceMappingURL=structured-source.d.ts.map