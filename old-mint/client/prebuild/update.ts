import SwaggerParser from '@apidevtools/swagger-parser';
import { generateDecoratedMintNavigationFromPages } from '@mintlify/prebuild';
import axios from 'axios';
import { promises as _promises } from 'fs';
import fse, { pathExists, outputFile } from 'fs-extra';
import path from 'path';

import { OpenApiFile } from '@/types/openApi';
import { PageType } from '@/types/pageType';

import { getPageMetadataAndSlug, preParseMdx } from './createPage.js';
import { generateFavicons } from './generate.js';
import { loadOpenApi } from './utils.js';

const { readFile } = _promises;

export const getConfigPath = async (contentDirectoryPath: string) => {
  let configPath = null;
  if (await pathExists(path.join(contentDirectoryPath, 'mint.json'))) {
    configPath = path.join(contentDirectoryPath, 'mint.json');
  }
  return configPath;
};

export const updateConfigFile = async (contentDirectoryPath: string) => {
  const configTargetPath = 'src/_props/mint.json';
  await fse.remove(configTargetPath);
  let configObj = null;
  const configPath = await getConfigPath(contentDirectoryPath);

  if (configPath) {
    await fse.remove(configTargetPath);
    await fse.copy(configPath, configTargetPath);
    const configContents = await readFile(configPath);
    configObj = JSON.parse(configContents.toString());
  } else {
    process.exit(1);
  }
  return configObj;
};

export const updateOpenApiFiles = async (openApiFiles: OpenApiFile[]) => {
  const openApiTargetPath = 'src/_props/openApiFiles.json';
  await fse.remove(openApiTargetPath);
  await fse.outputFile(openApiTargetPath, JSON.stringify(openApiFiles), {
    flag: 'w',
  });
};

export const updateFiles = (
  contentDirectoryPath: string,
  targetDirectoryPath: string,
  filenames: string[]
) => {
  const filePromises: Promise<void>[] = [];
  filenames.forEach((filename: string) => {
    filePromises.push(
      (async () => {
        const sourcePath = path.join(contentDirectoryPath, filename);
        const targetPath = path.join(targetDirectoryPath, filename);
        await fse.remove(targetPath);
        await fse.copy(sourcePath, targetPath);
      })()
    );
  });
  return filePromises;
};

export const updateFavicons = async (
  mintConfig: { favicon: string | null; name: string },
  contentDirectoryPath: string
) => {
  const generatedFavicons = await generateFavicons(mintConfig, contentDirectoryPath);
  if (!generatedFavicons) return;
  const promises: Promise<void>[] = [];
  generatedFavicons.images.forEach((img) => {
    promises.push(
      (async () => {
        const targetPath = path.join('public', 'favicons', img.name);
        await outputFile(targetPath, Buffer.from(img.contents), {
          flag: 'w',
        });
      })()
    );
  });
  generatedFavicons.files.forEach((file) => {
    promises.push(
      (async () => {
        const targetPath = path.join('public', 'favicons', file.name);
        await outputFile(targetPath, file.contents, { flag: 'w' });
      })()
    );
  });
  await Promise.all(promises);
};

export const updateGeneratedNav = async (
  pages: Record<string, PageType>,
  mintConfigNav: unknown[]
) => {
  const generatedNav = await generateDecoratedMintNavigationFromPages(pages, mintConfigNav);
  const targetPath = path.join('src', '_props', 'generatedNav.json');
  await outputFile(targetPath, JSON.stringify(generatedNav, null, 2), {
    flag: 'w',
  });
};

export const update = async (
  contentDirectoryPath: string,
  staticFilenames: string[],
  openApiFiles: OpenApiFile[],
  contentFilenames: string[],
  snippets: string[]
) => {
  let pagesAcc: Record<string, PageType> = {};
  const contentPromises: Promise<void>[] = [];
  contentFilenames.forEach((filename: string) => {
    contentPromises.push(
      (async () => {
        const sourcePath = path.join(contentDirectoryPath, filename);
        const targetPath = path.join('src', '_props', filename);

        const contentStr = (await readFile(sourcePath)).toString();
        const fileContent = await preParseMdx(contentStr, contentDirectoryPath);
        const { slug, pageMetadata } = getPageMetadataAndSlug(filename, contentStr, openApiFiles);
        await outputFile(targetPath, fileContent, {
          flag: 'w',
        });
        pagesAcc = {
          ...pagesAcc,
          [slug]: pageMetadata,
        };
      })()
    );
  });
  const initialFileUploadResponses = await Promise.all([
    updateConfigFile(contentDirectoryPath),
    ...contentPromises,
    ...updateFiles(contentDirectoryPath, 'public', staticFilenames),
    ...updateFiles(contentDirectoryPath, 'src/_props', snippets),
  ]);

  const mintConfig = initialFileUploadResponses[0];

  // Download OpenApi file if url is provided
  if (mintConfig.openapi) {
    try {
      const { data } = await axios.get(mintConfig.openapi, {
        responseType: 'text',
        transformResponse: (res) => {
          // Disable automatic JSON parsing
          return res;
        },
      });
      const specFromUrl = await SwaggerParser.validate(loadOpenApi(mintConfig.openapi, data));
      openApiFiles.push({
        filename: 'openapi-from-url',
        spec: specFromUrl,
      });
    } catch (e: unknown) {
      console.error("OpenApi file couldn't be downloaded from url.", e);
    }
  }

  await Promise.all([
    updateOpenApiFiles(openApiFiles),
    mintConfig?.navigation && updateGeneratedNav(pagesAcc, mintConfig?.navigation),
    updateFavicons(mintConfig, contentDirectoryPath),
  ]);
  return mintConfig;
};
