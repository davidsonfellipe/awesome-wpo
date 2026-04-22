export type CompareFunction = (v1: number, v2: number) => Boolean;
declare function compare(v1: number, v2: number): boolean;
declare function upperBound(array: number[], value: number, comp?: CompareFunction): number;
declare function lowerBound(array: number[], value: number, comp?: CompareFunction): number;
declare function binarySearch(array: number[], value: number, comp?: CompareFunction): false;
export { compare, lowerBound, upperBound, binarySearch, };
//# sourceMappingURL=index.d.ts.map