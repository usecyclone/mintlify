import matter from 'gray-matter';
import isAbsoluteUrl from 'is-absolute-url';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { Node } from 'unist';
import visit from 'unist-util-visit';
import { Compatible } from 'vfile';

import { OpenApiFile } from '@/types/openApi';

export const getPageMetadataAndSlug = (
  pagePath: string,
  pageContent: string,
  openApiFiles: OpenApiFile[]
) => {
  const { data: metadata } = matter(pageContent);

  // Replace .mdx so we can pass file paths into this function
  const slug = pagePath.replace(/\.mdx?$/, '');
  let defaultTitle = slugToTitle(slug);
  // Append data from OpenAPI if it exists
  const { title, description } = getOpenApiTitleAndDescription(openApiFiles, metadata?.openapi);

  if (title) {
    defaultTitle = title;
  }

  const pageMetadata = {
    title: defaultTitle,
    description,
    ...metadata,
    href: optionallyAddLeadingSlash(slug),
  };

  return {
    pageMetadata,
    slug: removeLeadingSlash(slug),
  };
};

export const preParseMdx = async (fileContent: string, contentDirectoryPath: string) => {
  try {
    fileContent = await preParseMdxHelper(fileContent, contentDirectoryPath);
  } catch (error) {
    fileContent = `🚧 A parsing error occured. Please contact the owner of this website.`;
  }
  return fileContent;
};

const preParseMdxHelper = async (fileContent: Compatible, contentDirectoryPath: string) => {
  const removeContentDirectoryPath = (filePath: string) => {
    const pathArr = createPathArr(filePath);
    const contentDirectoryPathArr = createPathArr(contentDirectoryPath);
    contentDirectoryPathArr.reverse().forEach((dir: string, index: number) => {
      if (pathArr[index] === dir) {
        pathArr.pop();
      }
    });
    return '/' + pathArr.join('/');
  };

  const removeContentDirectoryPaths = () => {
    return (tree: Node) => {
      visit(tree, (node) => {
        if (node == null) {
          return;
        }
        const n = node as Node & {
          name: string;
          url: string;
          attributes: { name: string; value: string }[];
        };
        if (n.name === 'img' || n.name === 'source') {
          const srcAttrIndex = n.attributes.findIndex(
            (attr: { name: string }) => attr?.name === 'src'
          );
          const nodeUrl = n.attributes[srcAttrIndex].value;
          if (
            // <img/> component
            srcAttrIndex !== -1 &&
            !isAbsoluteUrl(nodeUrl) &&
            !isDataString(nodeUrl)
          ) {
            n.attributes[srcAttrIndex].value = removeContentDirectoryPath(nodeUrl);
          }
        } else if (
          // ![]() format
          n.type === 'image' &&
          n.url &&
          !isAbsoluteUrl(n.url) &&
          !isDataString(n.url)
        ) {
          n.url = removeContentDirectoryPath(n.url);
        }
      });
      return tree;
    };
  };

  const file = await remark()
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(removeContentDirectoryPaths)
    .process(fileContent);
  return String(file);
};

const removeLeadingSlash = (str: string) => {
  const path = createPathArr(str);
  return path.join('/');
};

const createPathArr = (path: string) => {
  return path.split('/').filter((dir: string) => dir !== '');
};

const isDataString = (str: string) => str.startsWith('data:');

const getOpenApiTitleAndDescription = (openApiFiles: OpenApiFile[], openApiMetaField: null) => {
  if (openApiFiles == null || !openApiMetaField) {
    return {};
  }

  const { operation } = getOpenApiOperationMethodAndEndpoint(openApiFiles, openApiMetaField);

  if (operation == null) {
    return {};
  }

  return {
    title: operation.summary,
    description: operation.description,
  };
};

const getOpenApiOperationMethodAndEndpoint = (
  openApiFiles: OpenApiFile[],
  openApiMetaField: string
) => {
  const { endpoint, method, filename } = extractMethodAndEndpoint(openApiMetaField);

  let path;

  openApiFiles?.forEach((file) => {
    const openApiFile = file.spec;
    const openApiPath = openApiFile?.paths && openApiFile?.paths[endpoint];
    const isFilenameOrNone = !filename || filename === file.filename;
    if (openApiPath && isFilenameOrNone) {
      path = openApiPath;
    }
  });

  if (path == null) {
    return {};
  }

  let operation: { summary: string; description: string };
  if (method) {
    operation = path[method.toLowerCase()];
  } else {
    const firstOperationKey = Object.keys(path)[0];
    operation = path[firstOperationKey];
  }
  return {
    operation,
    method,
    endpoint,
  };
};

const extractMethodAndEndpoint = (openApiMetaField: string) => {
  const methodRegex = /(get|post|put|delete|patch)\s/i;
  const trimmed = openApiMetaField.trim();
  const foundMethod = trimmed.match(methodRegex);

  const startIndexOfMethod = foundMethod ? openApiMetaField.indexOf(foundMethod[0]) : 0;
  const endIndexOfMethod = foundMethod ? startIndexOfMethod + foundMethod[0].length - 1 : 0;

  const filename = openApiMetaField.substring(0, startIndexOfMethod).trim();

  return {
    method: foundMethod ? foundMethod[0].slice(0, -1).toUpperCase() : undefined,
    endpoint: openApiMetaField.substring(endIndexOfMethod).trim(),
    filename: filename ? filename : undefined,
  };
};

function optionallyAddLeadingSlash(path: string) {
  if (!path || path.startsWith('/')) {
    return path;
  }
  return '/' + path;
}

export const slugToTitle = (slug: string) => {
  const slugArr = slug.split('/');
  let defaultTitle = slugArr[slugArr.length - 1].split('-').join(' '); //replace all dashes
  defaultTitle = defaultTitle.split('_').join(' '); //replace all underscores
  defaultTitle = defaultTitle.charAt(0).toUpperCase() + defaultTitle.slice(1); //capitalize first letter
  return defaultTitle;
};
