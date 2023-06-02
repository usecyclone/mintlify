export var extractMethodAndEndpoint = function (api) {
    var methodRegex = /(get|post|put|delete|patch)\s/i;
    var trimmed = api.trim();
    var foundMethod = trimmed.match(methodRegex);
    var startIndexOfMethod = foundMethod ? api.indexOf(foundMethod[0]) : 0;
    var endIndexOfMethod = foundMethod ? startIndexOfMethod + foundMethod[0].length - 1 : 0;
    var filename = api.substring(0, startIndexOfMethod).trim();
    return {
        method: foundMethod ? foundMethod[0].slice(0, -1).toUpperCase() : undefined,
        endpoint: api.substring(endIndexOfMethod).trim(),
        filename: filename ? filename : undefined,
    };
};
export var getOpenApiOperationMethodAndEndpoint = function (openApi, openApiMetaField) {
    var _a;
    var _b = extractMethodAndEndpoint(openApiMetaField), endpoint = _b.endpoint, method = _b.method, filename = _b.filename;
    var path;
    (_a = openApi.files) === null || _a === void 0 ? void 0 : _a.forEach(function (file) {
        var openApiFile = file.openapi;
        var openApiPath = openApiFile.paths && openApiFile.paths[endpoint];
        var isFilenameOrNone = !filename || filename === file.name;
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
export var getOpenApiTitleAndDescription = function (openApi, openApiMetaField) {
    if (openApi == null || !openApiMetaField || openApiMetaField == null) {
        return {};
    }
    var operation = getOpenApiOperationMethodAndEndpoint(openApi, openApiMetaField).operation;
    if (operation == null) {
        return {};
    }
    return {
        title: operation.summary,
        description: operation.description,
    };
};
