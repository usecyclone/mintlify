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
import axios from 'axios';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import path from 'path';
import { SUPPORTED_MEDIA_EXTENSIONS } from './constants.js';
import { getFileExtension } from './util.js';
function writeImageToFile(imageSrc, writePath, overwrite) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Avoid unnecessary downloads
                    if (existsSync(writePath) && !overwrite) {
                        return [2 /*return*/, Promise.reject({
                                code: 'EEXIST',
                            })];
                    }
                    // Create the folders needed if they're missing
                    mkdirSync(path.dirname(writePath), { recursive: true });
                    writer = createWriteStream(writePath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get(imageSrc, {
                            responseType: 'stream',
                        })];
                case 2:
                    response = _a.sent();
                    // wx prevents overwriting an image with the exact same name
                    // being created in the time we were downloading
                    response.data.pipe(writer, {
                        flag: 'wx',
                    });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            writer.on('finish', resolve);
                            writer.on('error', reject);
                        })];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject({
                            code: 'ENOTFOUND',
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function isValidImageSrc(src) {
    if (!src) {
        return false;
    }
    // We do not support downloading base64 in-line images.
    if (src.startsWith('data:')) {
        return false;
    }
    var imageHref = removeMetadataFromImageSrc(src);
    var ext = getFileExtension(imageHref);
    if (ext && !SUPPORTED_MEDIA_EXTENSIONS.includes(ext)) {
        console.error('🚨 We do not support the file extension: ' + ext);
        return false;
    }
    return true;
}
export function removeMetadataFromImageSrc(src) {
    // Part of the URL standard
    var metadataSymbols = ['?', '#'];
    metadataSymbols.forEach(function (dividerSymbol) {
        // Some frameworks add metadata after the file extension, we need to remove that.
        src = src.split(dividerSymbol)[0];
    });
    return src;
}
export function cleanImageSrc(src, origin) {
    // Add origin if the image tags are using relative sources
    return src.startsWith('http') ? src : new URL(src, origin).href;
}
export default function downloadImage(imageSrc, writePath, overwrite) {
    if (overwrite === void 0) { overwrite = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, writeImageToFile(imageSrc, writePath, overwrite)
                        .then(function () {
                        console.log('🖼️ - ' + writePath);
                    })
                        .catch(function (e) {
                        if (e.code === 'EEXIST') {
                            console.log("\u274C Skipping existing image ".concat(writePath));
                        }
                        else if (e.code === 'ENOTFOUND') {
                            console.error("\uD83D\uDEA8 Cannot download the image, address not found ".concat(imageSrc));
                        }
                        else {
                            console.error(e);
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
