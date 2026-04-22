import * as url from "url";

/**
 * Return URL origin string from `urlString`.
 * If origin is not found, return null
 * @param {string} urlString
 * @returns {string | null}
 * @see https://url.spec.whatwg.org/#origin
 */
export const getURLOrigin = (urlString: string): string | null => {
    if (!urlString) {
        return null;
    }
    const obj = url.parse(urlString);
    if (!obj.protocol && !obj.hostname) {
        return null;
    }
    return `${obj.protocol}//${obj.hostname}${obj.port ? `:${obj.port}` : ""}`;
};
