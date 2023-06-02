import { pathExists } from 'fs-extra';

import { getFileList, getPathsByExtension, removeExtension } from './utils';

export const getPaths = async (
  dirName: string
): Promise<
  {
    params: {
      slug: string[];
    };
  }[]
> => {
  if (!(await pathExists(dirName))) {
    return [];
  }
  const files = await getFileList(dirName);
  const mdxFiles = getPathsByExtension(files, 'mdx', 'md');
  const extensionsRemoved = mdxFiles.map((file) => removeExtension(file));
  return formatStaticPaths(extensionsRemoved);
};

type StaticPath = {
  params: {
    slug: string[];
  };
};

export const formatStaticPaths = (paths: string[]): StaticPath[] =>
  paths.reduce((acc: StaticPath[], path: string) => {
    const pathArr = path.split('/').filter((dir) => dir !== '');
    return acc.concat({
      params: {
        slug: pathArr,
      },
    });
  }, []);
