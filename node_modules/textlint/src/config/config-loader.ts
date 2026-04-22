import { TextLintModuleResolver } from "../engine/textlint-module-resolver";
import { moduleInterop } from "@textlint/module-interop";

import { rcFile } from "rc-config-loader";

/**
 * @param configFileName "textlint" for .textlinrc
 * @param cwd current working dir
 * @param configFilePath it is preferred than configFileName
 * @param moduleResolver
 */
export function loadConfig({
    cwd,
    configFileName,
    configFilePath,
    moduleResolver
}: {
    cwd?: string;
    configFileName: string;
    configFilePath?: string;
    moduleResolver: TextLintModuleResolver;
}): {
    config: { [index: string]: any };
    filePath: string | undefined;
} {
    // if specify Config module, use it
    if (configFilePath) {
        try {
            const modulePath = moduleResolver.resolveConfigPackageName(configFilePath);
            return {
                config: moduleInterop(require(modulePath)),
                filePath: modulePath
            };
        } catch (error) {
            // not found config module
        }
    }
    // auto or specify path to config file
    const result = rcFile(configFileName, {
        configFileName: configFilePath,
        defaultExtension: [".json", ".js", ".yml"],
        packageJSON: {
            fieldName: "textlint"
        },
        cwd
    });
    if (result === undefined) {
        return {
            config: {},
            filePath: undefined
        };
    }
    return {
        config: result.config,
        filePath: result.filePath
    };
}
