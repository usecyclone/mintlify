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
import { slugToTitle, optionallyAddLeadingSlash } from '@mintlify/prebuild';
import matter from 'gray-matter';
import isAbsoluteUrl from 'is-absolute-url';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';
var createPage = function (pagePath, pageContent, contentDirectoryPath, openApiFiles) { return __awaiter(void 0, void 0, void 0, function () {
    var metadata, error_1, slug, defaultTitle, description, _a, title, openApiDescription, pageMetadata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                metadata = matter(pageContent).data;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, preParseMdx(pageContent, contentDirectoryPath)];
            case 2:
                pageContent = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                pageContent = "\uD83D\uDEA7 A parsing error occured. Please contact the owner of this website.";
                return [3 /*break*/, 4];
            case 4:
                slug = pagePath.replace(/\.mdx?$/, '');
                defaultTitle = slugToTitle(slug);
                // Append data from OpenAPI if it exists
                if (metadata === null || metadata === void 0 ? void 0 : metadata.openapi) {
                    _a = getOpenApiTitleAndDescription(openApiFiles, metadata === null || metadata === void 0 ? void 0 : metadata.openapi), title = _a.title, openApiDescription = _a.description;
                    if (title) {
                        defaultTitle = title;
                    }
                    if (openApiDescription) {
                        description = openApiDescription;
                    }
                }
                pageMetadata = __assign(__assign({ title: defaultTitle, description: description }, metadata), { href: optionallyAddLeadingSlash(slug) });
                return [2 /*return*/, {
                        pageMetadata: pageMetadata,
                        pageContent: pageContent,
                        slug: removeLeadingSlash(slug),
                    }];
        }
    });
}); };
var preParseMdx = function (fileContent, contentDirectoryPath) { return __awaiter(void 0, void 0, void 0, function () {
    var removeContentDirectoryPath, removeContentDirectoryPaths, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                removeContentDirectoryPath = function (filePath) {
                    var pathArr = createPathArr(filePath);
                    var contentDirectoryPathArr = createPathArr(contentDirectoryPath);
                    contentDirectoryPathArr.reverse().forEach(function (dir, index) {
                        if (pathArr[index] === dir) {
                            pathArr.pop();
                        }
                    });
                    return '/' + pathArr.join('/');
                };
                removeContentDirectoryPaths = function () {
                    return function (tree) {
                        visit(tree, function (node) {
                            if (node == null) {
                                return;
                            }
                            if (node.name === 'img' || node.name === 'source') {
                                var srcAttrIndex = node.attributes.findIndex(function (attr) { return (attr === null || attr === void 0 ? void 0 : attr.name) === 'src'; });
                                var nodeUrl = node.attributes[srcAttrIndex].value;
                                if (
                                // <img/> component
                                srcAttrIndex !== -1 &&
                                    !isAbsoluteUrl(nodeUrl) &&
                                    !isDataString(nodeUrl)) {
                                    node.attributes[srcAttrIndex].value = removeContentDirectoryPath(nodeUrl);
                                }
                            }
                            else if (
                            // ![]() format
                            node.type === 'image' &&
                                node.url &&
                                !isAbsoluteUrl(node.url) &&
                                !isDataString(node.url)) {
                                node.url = removeContentDirectoryPath(node.url);
                            }
                        });
                        return tree;
                    };
                };
                return [4 /*yield*/, remark()
                        .use(remarkMdx)
                        .use(remarkGfm)
                        .use(remarkFrontmatter, ['yaml', 'toml'])
                        .use(removeContentDirectoryPaths)
                        .process(fileContent)];
            case 1:
                file = _a.sent();
                return [2 /*return*/, String(file)];
        }
    });
}); };
var removeLeadingSlash = function (str) {
    var path = createPathArr(str);
    return path.join('/');
};
var createPathArr = function (path) {
    return path.split('/').filter(function (dir) { return dir !== ''; });
};
var isDataString = function (str) { return str.startsWith('data:'); };
var getOpenApiTitleAndDescription = function (openApiFiles, openApiMetaField) {
    var operation = getOpenApiOperationMethodAndEndpoint(openApiFiles, openApiMetaField).operation;
    if (operation == null) {
        return {};
    }
    return {
        title: operation.summary,
        description: operation.description,
    };
};
var getOpenApiOperationMethodAndEndpoint = function (openApiFiles, openApiMetaField) {
    var _a = extractMethodAndEndpoint(openApiMetaField), endpoint = _a.endpoint, method = _a.method, filename = _a.filename;
    var path;
    openApiFiles === null || openApiFiles === void 0 ? void 0 : openApiFiles.forEach(function (file) {
        var openApiFile = file.spec;
        var openApiPath = openApiFile.paths && openApiFile.paths[endpoint];
        var isFilenameOrNone = !filename || filename === file.filename;
        if (openApiPath && isFilenameOrNone) {
            path = openApiPath;
        }
    });
    if (path == null) {
        return {};
    }
    var operation;
    if (method) {
        operation = path[method.toLowerCase()];
    }
    else {
        var firstOperationKey = Object.keys(path)[0];
        operation = path[firstOperationKey];
    }
    return {
        operation: operation,
        method: method,
        endpoint: endpoint,
    };
};
var extractMethodAndEndpoint = function (openApiMetaField) {
    var methodRegex = /(get|post|put|delete|patch)\s/i;
    var trimmed = openApiMetaField.trim();
    var foundMethod = trimmed.match(methodRegex);
    var startIndexOfMethod = foundMethod ? openApiMetaField.indexOf(foundMethod[0]) : 0;
    var endIndexOfMethod = foundMethod ? startIndexOfMethod + foundMethod[0].length - 1 : 0;
    var filename = openApiMetaField.substring(0, startIndexOfMethod).trim();
    return {
        method: foundMethod ? foundMethod[0].slice(0, -1).toUpperCase() : undefined,
        endpoint: openApiMetaField.substring(endIndexOfMethod).trim(),
        filename: filename ? filename : undefined,
    };
};
export default createPage;
