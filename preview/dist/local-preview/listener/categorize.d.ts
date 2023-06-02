import { PotentialFileCategory } from './utils/types.js';
export declare const categorizeFiles: (contentDirectoryPath: string) => Promise<{
    contentFilenames: string[];
    staticFilenames: string[];
    openApiFiles: OpenApiFile[];
    snippets: string[];
}>;
export declare const getCategory: (filePath: string) => PotentialFileCategory;
