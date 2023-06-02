// noinspection ES6PreferShortImport
import { cli } from "../src/cli";

jest.mock("@mintlify/previewing", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dev: (args: any) => console.log(`dev --port=${args.port}`),
    installDepsCommand: () => console.log(`install`),
  }
});

jest.mock("readline", () =>{
  return {
    createInterface: () => {
      return {
        close: () => undefined,
        question: (question: string, responseHandler: (response: string) => void) =>  {
          console.log(question)
          responseHandler('y')
        }
      }
    }
  }
});

const allowedPorts = [3000,5002]

jest.mock("detect-port", () => (port: number) => allowedPorts.includes(port) ? port : port + 1);

describe("cli", () => {
  let originalArgv: string[];

  beforeEach(() => {
    // Remove all cached modules, otherwise the same results are shown in subsequent tests.
    jest.resetModules();

    // Keep track of original process arguments.
    originalArgv = process.argv;
  });

  afterEach(() => {
    jest.resetAllMocks();

    // Set process arguments back to the original value.
    process.argv = originalArgv;
  });

  it("should run install command", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    await runCommand("install");

    expect(consoleSpy).toBeCalledWith("install");
  });

  it("should run dev command", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    await runCommand("dev");

    expect(consoleSpy).toBeCalledWith("dev --port=3000");
  });

  it("port 5000 and 5001 should be taken and 5002 should be accepted by the user and available.", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    await runCommand("dev", "--port=5000");
    expect(consoleSpy).toHaveBeenCalledTimes(3)
    expect(consoleSpy).toHaveBeenCalledWith(`Port 5000 is already in use. Use port 5001 instead? [Y/n]\n`)
    expect(consoleSpy).toHaveBeenCalledWith(`Port 5001 is already in use. Use port 5002 instead? [Y/n]\n`)
    expect(consoleSpy).toBeCalledWith("dev --port=5002");
  });
});

/**
 * Programmatically set arguments and execute the CLI script
 *
 * @param {...string} args - Additional command arguments.
 */
async function runCommand(...args: string[]) {
  process.argv = [
    "node",
    "cli.js",
    ...args,
  ];
  return cli();
}
