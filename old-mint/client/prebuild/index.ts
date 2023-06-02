import categorizeFiles from './categorizeFiles.js';
import { getConfigPath, update } from './update.js';

const contentDirectoryPath = process.argv[2];

const prebuild = async () => {
  const { contentFilenames, staticFilenames, openApiFiles, snippets } = await categorizeFiles(
    contentDirectoryPath
  );
  await update(contentDirectoryPath, staticFilenames, openApiFiles, contentFilenames, snippets);
};

(async function () {
  if (contentDirectoryPath == null) {
    console.log(
      '⚠️ prebuild step requires the path to the content as an argument (e.g. `yarn prebuild ../path/to/docs`)'
    );
    return;
  }
  if (process.env.IS_MULTI_TENANT === 'true') {
    console.log('Skipping prebuild in multi-tenant mode.');
  }
  try {
    const configPath = await getConfigPath(contentDirectoryPath);
    if (configPath == null) {
      console.error('⚠️ Must be ran in a directory where a mint.json file exists.');
      return;
    }
    await prebuild();
  } catch (error) {
    console.log(error);
    console.error('⚠️   Error while fetching config settings');
  }
})();
