import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';
import { OpenAPI } from 'openapi-types';
import pathUtil from 'path';

export const getFileExtension = (filename: string) => {
  const parsed = pathUtil.parse(filename);
  return parsed.ext ? parsed.ext.slice(1) : filename;
};

export const openApiCheck = async (path: string | OpenAPI.Document) => {
  let spec: OpenAPI.Document | undefined;
  let isOpenApi = false;
  try {
    spec = await SwaggerParser.validate(path);
    isOpenApi = true;
  } catch {
    // not valid openApi
  }
  return { spec, isOpenApi };
};

export const filterOutNullInGroup = (group: { pages: any }) => {
  const newPages = filterOutNullInPages(group.pages);
  const newGroup = {
    ...group,
    pages: newPages,
  };
  return newGroup;
};

const filterOutNullInPages = (pages: any[]) => {
  if (!Array.isArray(pages)) {
    return [];
  }
  const newPages: any[] = [];
  pages.forEach((page) => {
    if (page == null) {
      return;
    }
    if (page.hasOwnProperty('pages')) {
      const newGroup = filterOutNullInGroup(page);
      newPages.push(newGroup);
    } else {
      newPages.push(page);
    }
  });

  return newPages;
};

export const loadOpenApi = (openApiSrc: string, openApiString: string) => {
  // Load yaml
  if (openApiSrc.endsWith('.yaml') || openApiSrc.endsWith('.yml')) {
    return yaml.load(openApiString);
  }
  return JSON.parse(openApiString);
};
