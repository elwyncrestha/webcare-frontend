export function throwIfAlreadyLoaded(parentModule: any, moduleName: string, msg?: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. ${msg}`);
    }
}
