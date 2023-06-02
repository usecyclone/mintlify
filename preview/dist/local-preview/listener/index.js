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
import mintValidation from '@mintlify/validation';
import Chalk from 'chalk';
import chokidar from 'chokidar';
import { promises as _promises } from 'fs';
import fse from 'fs-extra';
import pathUtil from 'path';
import { CLIENT_PATH, CMD_EXEC_PATH } from '../../constants.js';
import { getCategory } from './categorize.js';
import { updateGeneratedNav, updateOpenApiFiles } from './update.js';
import { isFileSizeValid, openApiCheck } from './utils.js';
import createPage from './utils/createPage.js';
var readFile = _promises.readFile;
var listener = function () {
    chokidar
        .watch(CMD_EXEC_PATH, {
        ignoreInitial: true,
        ignored: ['node_modules', '.git', '.idea'],
        cwd: CMD_EXEC_PATH,
    })
        .on('add', function (filename) { return __awaiter(void 0, void 0, void 0, function () {
        var category, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, onUpdateEvent(filename)];
                case 1:
                    category = _a.sent();
                    switch (category) {
                        case 'page':
                            console.log('New page detected: ', filename);
                            break;
                        case 'snippet':
                            console.log('New snippet detected: ', filename);
                            break;
                        case 'mintConfig':
                            console.log('Config added');
                            break;
                        case 'openApi':
                            console.log('OpenApi spec added: ', filename);
                            break;
                        case 'staticFile':
                            console.log('Static file added: ', filename);
                            break;
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })
        .on('change', function (filename) { return __awaiter(void 0, void 0, void 0, function () {
        var category, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, onUpdateEvent(filename)];
                case 1:
                    category = _a.sent();
                    switch (category) {
                        case 'page':
                            console.log('Page edited: ', filename);
                            break;
                        case 'snippet':
                            console.log('Snippet edited: ', filename);
                            break;
                        case 'mintConfig':
                            console.log('Config edited');
                            break;
                        case 'openApi':
                            console.log('OpenApi spec edited: ', filename);
                            break;
                        case 'staticFile':
                            console.log('Static file edited: ', filename);
                            break;
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })
        .on('unlink', function (filename) { return __awaiter(void 0, void 0, void 0, function () {
        var potentialCategory, targetPath, _a, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    potentialCategory = getCategory(filename);
                    targetPath = getTargetPath(potentialCategory, filename);
                    if (!(potentialCategory === 'page' ||
                        potentialCategory === 'snippet' ||
                        potentialCategory === 'mintConfig' ||
                        potentialCategory === 'staticFile')) return [3 /*break*/, 2];
                    return [4 /*yield*/, fse.remove(targetPath)];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    _a = potentialCategory;
                    switch (_a) {
                        case 'page': return [3 /*break*/, 3];
                        case 'snippet': return [3 /*break*/, 4];
                        case 'mintConfig': return [3 /*break*/, 5];
                        case 'potentialJsonOpenApiSpec': return [3 /*break*/, 6];
                        case 'potentialYamlOpenApiSpec': return [3 /*break*/, 6];
                        case 'staticFile': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 10];
                case 3:
                    console.log("Page deleted: ".concat(filename));
                    return [3 /*break*/, 10];
                case 4:
                    console.log("Snippet deleted: ".concat(filename));
                    return [3 /*break*/, 10];
                case 5:
                    console.log('⚠️ mint.json deleted. Please create a new mint.json file as it is mandatory.');
                    process.exit(1);
                    _b.label = 6;
                case 6: return [4 /*yield*/, updateOpenApiFiles()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, updateGeneratedNav()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    console.log('Static file deleted: ', filename);
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_3 = _b.sent();
                    console.error(error_3.message);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); });
};
var getTargetPath = function (potentialCategory, filePath) {
    switch (potentialCategory) {
        case 'page':
        case 'snippet':
            return pathUtil.join(CLIENT_PATH, 'src', '_props', filePath);
        case 'mintConfig':
            return pathUtil.join(CLIENT_PATH, 'src', '_props', 'mint.json');
        case 'potentialYamlOpenApiSpec':
        case 'potentialJsonOpenApiSpec':
            return pathUtil.join(CLIENT_PATH, 'src', '_props', 'openApiFiles.json');
        case 'staticFile':
            return pathUtil.join(CLIENT_PATH, 'public', filePath);
        default:
            throw new Error('Invalid category');
    }
};
/**
 * This function is called when a file is added or changed
 * @param filename
 * @returns FileCategory
 */
var onUpdateEvent = function (filename) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, potentialCategory, targetPath, regenerateNav, category, _a, contentStr, pageContent, mintJsonFileContent, mintConfig, _b, status_1, errors, warnings, e_1, error, isOpenApi, openApiInfo;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                filePath = pathUtil.join(CMD_EXEC_PATH, filename);
                potentialCategory = getCategory(filename);
                targetPath = getTargetPath(potentialCategory, filename);
                regenerateNav = false;
                category = potentialCategory === 'potentialYamlOpenApiSpec' ||
                    potentialCategory === 'potentialJsonOpenApiSpec'
                    ? 'staticFile'
                    : potentialCategory;
                _a = potentialCategory;
                switch (_a) {
                    case 'page': return [3 /*break*/, 1];
                    case 'snippet': return [3 /*break*/, 5];
                    case 'mintConfig': return [3 /*break*/, 7];
                    case 'potentialYamlOpenApiSpec': return [3 /*break*/, 14];
                    case 'potentialJsonOpenApiSpec': return [3 /*break*/, 14];
                    case 'staticFile': return [3 /*break*/, 18];
                }
                return [3 /*break*/, 23];
            case 1:
                regenerateNav = true;
                return [4 /*yield*/, readFile(filePath)];
            case 2:
                contentStr = (_c.sent()).toString();
                return [4 /*yield*/, createPage(filename, contentStr, CMD_EXEC_PATH, [])];
            case 3:
                pageContent = (_c.sent()).pageContent;
                return [4 /*yield*/, fse.outputFile(targetPath, pageContent, {
                        flag: 'w',
                    })];
            case 4:
                _c.sent();
                return [3 /*break*/, 23];
            case 5: return [4 /*yield*/, fse.copy(filePath, targetPath)];
            case 6:
                _c.sent();
                return [3 /*break*/, 23];
            case 7:
                regenerateNav = true;
                return [4 /*yield*/, readFile(filePath)];
            case 8:
                mintJsonFileContent = (_c.sent()).toString();
                _c.label = 9;
            case 9:
                _c.trys.push([9, 12, , 13]);
                mintConfig = JSON.parse(mintJsonFileContent);
                _b = mintValidation.validateMintConfig(mintConfig), status_1 = _b.status, errors = _b.errors, warnings = _b.warnings;
                errors.forEach(function (error) {
                    console.error("\uD83D\uDEA8 ".concat(Chalk.red(error)));
                });
                warnings.forEach(function (warning) {
                    console.warn("\u26A0\uFE0F ".concat(Chalk.yellow(warning)));
                });
                if (!(status_1 === 'success')) return [3 /*break*/, 11];
                return [4 /*yield*/, fse.copy(filePath, targetPath)];
            case 10:
                _c.sent();
                _c.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                e_1 = _c.sent();
                error = e_1;
                if (error.name === 'SyntaxError') {
                    console.error("\uD83D\uDEA8 ".concat(Chalk.red('mint.json has invalid JSON. You are likely missing a comma or a bracket. You can paste your mint.json file into https://jsonlint.com/ to get a more specific error message.')));
                }
                else {
                    console.error("\uD83D\uDEA8 ".concat(Chalk.red(error.message)));
                }
                return [3 /*break*/, 13];
            case 13: return [3 /*break*/, 23];
            case 14:
                isOpenApi = false;
                return [4 /*yield*/, openApiCheck(filePath)];
            case 15:
                openApiInfo = _c.sent();
                isOpenApi = openApiInfo.isOpenApi;
                if (!isOpenApi) return [3 /*break*/, 17];
                // TODO: Instead of re-generating all openApi files, optimize by just updating the specific file that changed.
                return [4 /*yield*/, updateOpenApiFiles()];
            case 16:
                // TODO: Instead of re-generating all openApi files, optimize by just updating the specific file that changed.
                _c.sent();
                regenerateNav = true;
                category = 'openApi';
                _c.label = 17;
            case 17: return [3 /*break*/, 23];
            case 18: return [4 /*yield*/, isFileSizeValid(filePath, 5)];
            case 19:
                if (!_c.sent()) return [3 /*break*/, 21];
                return [4 /*yield*/, fse.copy(filePath, targetPath)];
            case 20:
                _c.sent();
                return [3 /*break*/, 22];
            case 21:
                console.error(Chalk.red("\uD83D\uDEA8 The file at ".concat(filename, " is too big. The maximum file size is 5 mb.")));
                _c.label = 22;
            case 22: return [3 /*break*/, 23];
            case 23:
                if (!regenerateNav) return [3 /*break*/, 25];
                // TODO: Instead of re-generating the entire nav, optimize by just updating the specific page that changed.
                return [4 /*yield*/, updateGeneratedNav()];
            case 24:
                // TODO: Instead of re-generating the entire nav, optimize by just updating the specific page that changed.
                _c.sent();
                _c.label = 25;
            case 25: return [2 /*return*/, category];
        }
    });
}); };
export default listener;
