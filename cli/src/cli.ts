import { dev, installDepsCommand } from '@mintlify/previewing';
import detect from 'detect-port';
import { createInterface } from 'readline';
import yargs from 'yargs';
import { ArgumentsCamelCase } from 'yargs';
import { hideBin } from 'yargs/helpers';

const confirm = async (question: string) =>
  new Promise((resolve) => {
    const cmdInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    cmdInterface.question(question, (response) => {
      cmdInterface.close();
      resolve(response.toLowerCase() === 'y');
    });
  });

const checkPortRecursive: <T>(argv: ArgumentsCamelCase<T>) => Promise<number | undefined> = async (
  argv
) => {
  const port = (argv.port || 3000) as Parameters<typeof detect>[0];
  const _port = await detect(port);

  if (port == _port) {
    return port;
  }

  const confirmed = await confirm(
    `Port ${port} is already in use. Use port ${_port} instead? [Y/n]\n`
  );

  if (confirmed) {
    return await checkPortRecursive({
      ...argv,
      port: _port,
    });
  }
  return undefined;
};

export const cli = () =>
  yargs(hideBin(process.argv))
    .command(
      'dev',
      'Runs Mintlify locally (Must run in directory with mint.json)',
      () => undefined,
      async (argv) => {
        const port = await checkPortRecursive(argv);
        if (port != undefined) {
          await dev({
            ...argv,
            port,
          });
        } else {
          console.error(`No available port found.`);
        }
      }
    )
    .command(
      'install',
      'Install dependencies for local Mintlify',
      () => undefined,
      installDepsCommand
    )
    // Print the help menu when the user enters an invalid command.
    .strictCommands()
    .demandCommand(1, 'Unknown command. See above for the list of supported commands.')

    // Alias option flags --help = -h, --version = -v
    .alias('h', 'help')
    .alias('v', 'version')

    .parse();
