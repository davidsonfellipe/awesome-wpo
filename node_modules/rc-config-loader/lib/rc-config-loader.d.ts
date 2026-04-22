export interface rcConfigLoaderOption {
    packageJSON?: boolean | {
        fieldName: string;
    };
    configFileName?: string;
    defaultExtension?: string | string[];
    cwd?: string;
}
/**
 * Find and load rcfile, return { config, filePath }
 * If not found any rcfile, throw an Error.
 * @param {string} pkgName
 * @param {rcConfigLoaderOption} [opts]
 * @returns {{ config: Object, filePath:string } | undefined}
 */
export declare function rcFile<R extends {}>(pkgName: string, opts?: rcConfigLoaderOption): {
    config: R;
    filePath: string;
} | undefined;
