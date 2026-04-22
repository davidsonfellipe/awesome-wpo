export function moduleInterop<T>(moduleExports: T): T {
    return moduleExports && (moduleExports as any).__esModule ? (moduleExports as any).default! : moduleExports;
}
