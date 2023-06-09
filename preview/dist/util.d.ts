import { Ora as OraType } from 'ora';
export declare const buildLogger: (startText?: string) => OraType;
export declare const getFileExtension: (filename: string) => string | undefined;
export declare const ensureYarn: (logger: OraType) => void;
