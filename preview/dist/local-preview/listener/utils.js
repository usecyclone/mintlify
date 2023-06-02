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
import SwaggerParser from '@apidevtools/swagger-parser';
import { promises as _promises } from 'fs';
var readdir = _promises.readdir, stat = _promises.stat;
export var getFileExtension = function (filename) {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
};
export var openApiCheck = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var spec, isOpenApi, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                isOpenApi = false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, SwaggerParser.validate(path)];
            case 2:
                spec = _b.sent();
                isOpenApi = true;
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, { spec: spec, isOpenApi: isOpenApi }];
        }
    });
}); };
export var filterOutNullInGroup = function (group) {
    var newPages = filterOutNullInPages(group.pages);
    var newGroup = __assign(__assign({}, group), { pages: newPages });
    return newGroup;
};
var filterOutNullInPages = function (pages) {
    var newPages = [];
    pages.forEach(function (page) {
        if (page == null) {
            return;
        }
        if (page.hasOwnProperty('pages')) {
            var group = page;
            var newGroup = filterOutNullInGroup(group);
            newPages.push(newGroup);
        }
        else {
            newPages.push(page);
        }
    });
    return newPages;
};
export var isFileSizeValid = function (path, maxFileSizeInMb) { return __awaiter(void 0, void 0, void 0, function () {
    var maxFileSizeBytes, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                maxFileSizeBytes = maxFileSizeInMb * 1000000;
                return [4 /*yield*/, stat(path)];
            case 1:
                stats = _a.sent();
                return [2 /*return*/, stats.size <= maxFileSizeBytes];
        }
    });
}); };
export function isError(obj) {
    return Object.prototype.toString.call(obj) === '[object Error]';
}
