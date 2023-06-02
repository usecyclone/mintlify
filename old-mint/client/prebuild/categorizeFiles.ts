import { getFileList } from '@mintlify/prebuild';
import path from 'path';

import { OpenApiFile } from '@/types/openApi.js';

import { getFileExtension, openApiCheck } from './utils.js';

const categorizeFiles = async (contentDirectoryPath: string) => {
  const allFilesInCmdExecutionPath = getFileList(contentDirectoryPath);
  const contentFilenames: string[] = [];
  const staticFilenames: string[] = [];
  const promises: Promise<void>[] = [];
  const openApiFiles: OpenApiFile[] = [];
  const snippets: string[] = [];
  allFilesInCmdExecutionPath.forEach((filename: string) => {
    promises.push(
      (async () => {
        const extension = getFileExtension(filename);
        let isOpenApi = false;
        if (extension && (extension === 'mdx' || extension === 'md')) {
          if (filename.startsWith('/_snippets')) {
            snippets.push(filename);
          } else {
            contentFilenames.push(filename);
          }
        } else if (
          extension &&
          (extension === 'json' || extension === 'yaml' || extension === 'yml')
        ) {
          const openApiInfo = await openApiCheck(path.join(contentDirectoryPath, filename));
          isOpenApi = openApiInfo.isOpenApi;
          if (isOpenApi && openApiInfo.spec) {
            const fileName = path.parse(filename).base;
            openApiFiles.push({
              filename: fileName.substring(0, fileName.lastIndexOf('.')),
              spec: openApiInfo.spec,
            });
          }
        } else if (!filename.endsWith('mint.json') && !isOpenApi) {
          // all other files
          staticFilenames.push(filename);
        }
      })()
    );
  });
  await Promise.all(promises);

  return { contentFilenames, staticFilenames, openApiFiles, snippets };
};

export default categorizeFiles;
