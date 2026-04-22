/**
 * Remove `prefix` from `text`.
 */
export const removePrefixFromPackageName = (prefixList: string[], packageName: string) => {
    for (let i = 0; i < prefixList.length; i++) {
        const prefix = prefixList[i];
        // @scope/name -> @scope/name
        // @scope/textlint-rule-name -> @scope/name
        if (packageName.charAt(0) === "@") {
            const [namespace, name] = packageName.split("/");
            if (name.startsWith(prefix)) {
                return `${namespace}/${name.slice(prefix.length)}`;
            }
        }
        // name -> name
        // textlint-rule-name -> name
        else if (packageName.startsWith(prefix)) {
            return packageName.slice(prefix.length);
        }
    }
    // No match
    return packageName;
};

/**
 * Create full package name and return
 * @param {string} prefix
 * @param {string} name
 * @returns {string}
 */
export const createFullPackageName = (prefix: string, name: string): string => {
    if (name.charAt(0) === "@") {
        const scopedPackageNameRegex = new RegExp(`^${prefix}(-|$)`);
        // if @scope/<name> -> @scope/<prefix><name>
        if (!scopedPackageNameRegex.test(name.split("/")[1])) {
            /*
             * for scoped packages, insert the textlint-rule after the first / unless
             * the path is already @scope/<name> or @scope/textlint-rule-<name>
             */
            return name.replace(/^@([^/]+)\/(.*)$/, `@$1/${prefix}$2`);
        }
    }
    return `${prefix}${name}`;
};
