export declare const getFileExtension: (filename: string) => string;
export type OpenApiCheckResult = {
    spec: any;
    isOpenApi: boolean;
};
export declare const openApiCheck: (path: string) => Promise<OpenApiCheckResult>;
export declare const filterOutNullInGroup: (group: MintNavigation) => {
    pages: MintNavigationEntry[];
    group: string;
    version?: string | undefined;
};
export declare const isFileSizeValid: (path: string, maxFileSizeInMb: number) => Promise<boolean>;
export declare function isError(obj: unknown): boolean;
