export declare const extractMethodAndEndpoint: (api: string) => {
    method?: string | undefined;
    endpoint: string;
    filename?: string | undefined;
};
export declare const getOpenApiOperationMethodAndEndpoint: (openApi: any, openApiMetaField: string) => {
    operation?: undefined;
    method?: undefined;
    endpoint?: undefined;
} | {
    operation: any;
    method: string | undefined;
    endpoint: string;
};
export declare const getOpenApiTitleAndDescription: (openApi: any, openApiMetaField: any) => {
    title?: undefined;
    description?: undefined;
} | {
    title: any;
    description: any;
};
