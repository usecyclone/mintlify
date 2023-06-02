var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// TODO - add types
import { generateDecoratedMintNavigationFromPages } from '@mintlify/prebuild';
import { promises as _promises } from 'fs';
import { outputFile } from 'fs-extra';
import path from 'path';
import { CMD_EXEC_PATH } from '../../constants.js';
import { categorizeFiles } from './categorize.js';
import createPage from './utils/createPage.js';
import { getConfigObj } from './utils/mintConfigFile.js';
var readFile = _promises.readFile;
var pageMetadataKeys = [
    'title',
    'description',
    'sidebarTitle',
    'href',
    'api',
    'openapi',
    'contentType',
    'auth',
    'version',
    'mode',
    'hideFooterPagination',
    'authors',
    'lastUpdatedDate',
    'createdDate',
    'size',
];
var createFilenamePageMetadataMap = function (contentDirectoryPath, contentFilenames, openApiFiles, clientPath, writeFiles) {
    if (writeFiles === void 0) { writeFiles = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pagesAcc, contentPromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pagesAcc = {};
                    contentPromises = [];
                    contentFilenames.forEach(function (filename) {
                        contentPromises.push((function () { return __awaiter(void 0, void 0, void 0, function () {
                            var sourcePath, contentStr, _a, slug, pageMetadata, pageContent, targetPath;
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        sourcePath = path.join(contentDirectoryPath, filename);
                                        return [4 /*yield*/, readFile(sourcePath)];
                                    case 1:
                                        contentStr = (_c.sent()).toString();
                                        return [4 /*yield*/, createPage(filename, contentStr, contentDirectoryPath, openApiFiles)];
                                    case 2:
                                        _a = _c.sent(), slug = _a.slug, pageMetadata = _a.pageMetadata, pageContent = _a.pageContent;
                                        if (!(clientPath && writeFiles)) return [3 /*break*/, 4];
                                        targetPath = path.join(clientPath, 'src', '_props', filename);
                                        return [4 /*yield*/, outputFile(targetPath, pageContent, {
                                                flag: 'w',
                                            })];
                                    case 3:
                                        _c.sent();
                                        _c.label = 4;
                                    case 4:
                                        pagesAcc = __assign(__assign({}, pagesAcc), (_b = {}, _b[slug] = pageMetadata, _b));
                                        return [2 /*return*/];
                                }
                            });
                        }); })());
                    });
                    return [4 /*yield*/, Promise.all(contentPromises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, pagesAcc];
            }
        });
    });
};
export var generateNav = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, contentFilenames, openApiFiles, _b, filenamePageMetadataMap, configObj;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, categorizeFiles(CMD_EXEC_PATH)];
            case 1:
                _a = _c.sent(), contentFilenames = _a.contentFilenames, openApiFiles = _a.openApiFiles;
                return [4 /*yield*/, Promise.all([
                        createFilenamePageMetadataMap(CMD_EXEC_PATH, contentFilenames, openApiFiles),
                        getConfigObj(CMD_EXEC_PATH),
                    ])];
            case 2:
                _b = _c.sent(), filenamePageMetadataMap = _b[0], configObj = _b[1];
                return [2 /*return*/, generateDecoratedMintNavigationFromPages(filenamePageMetadataMap, configObj === null || configObj === void 0 ? void 0 : configObj.navigation)];
        }
    });
}); };
