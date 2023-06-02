declare const createPage: (pagePath: string, pageContent: string, contentDirectoryPath: string, openApiFiles: OpenApiFile[]) => Promise<{
    pageMetadata: {
        href: string;
        title: string;
        description: string | undefined;
    };
    pageContent: string;
    slug: string;
}>;
export default createPage;
