var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
import Chalk from 'chalk';
import child_process from 'child_process';
import fse, { pathExists } from 'fs-extra';
import inquirer from 'inquirer';
import { isInternetAvailable } from 'is-internet-available';
import open from 'open';
import path from 'path';
import shell from 'shelljs';
import { CLIENT_PATH, HOME_DIR, DOT_MINTLIFY, CMD_EXEC_PATH, TARGET_MINT_VERSION, VERSION_PATH, MINT_PATH, } from '../constants.js';
import { buildLogger, ensureYarn } from '../util.js';
import listener from './listener/index.js';
import { getConfigPath } from './listener/utils/mintConfigFile.js';
var nodeModulesExists = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, pathExists(path.join(DOT_MINTLIFY, 'mint', 'client', 'node_modules'))];
    });
}); };
var promptForYarn = function () { return __awaiter(void 0, void 0, void 0, function () {
    var yarnInstalled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                yarnInstalled = shell.which('yarn');
                if (!!yarnInstalled) return [3 /*break*/, 2];
                return [4 /*yield*/, inquirer
                        .prompt([
                        {
                            type: 'confirm',
                            name: 'confirm',
                            message: 'yarn must be globally installed. Install yarn?',
                            default: true,
                        },
                    ])
                        .then(function (_a) {
                        var confirm = _a.confirm;
                        if (confirm) {
                            shell.exec('npm install --global yarn');
                        }
                        else {
                            console.log('Installation cancelled.');
                        }
                    })];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var downloadTargetMint = function (logger) { return __awaiter(void 0, void 0, void 0, function () {
    var downloadRes, TAR_PATH;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fse.emptyDirSync(MINT_PATH);
                logger.text = 'Downloading Mintlify framework...';
                return [4 /*yield*/, axios.get("https://mint-releases.b-cdn.net/mint-".concat(TARGET_MINT_VERSION.slice(1), ".tar.gz"), {
                        responseType: 'arraybuffer',
                    })];
            case 1:
                downloadRes = _a.sent();
                logger.text = 'Extracting Mintlify framework...';
                TAR_PATH = path.join(MINT_PATH, "mint-".concat(TARGET_MINT_VERSION.slice(1), ".tar.gz"));
                fse.writeFileSync(TAR_PATH, Buffer.from(downloadRes.data));
                fse.mkdirSync(path.join(MINT_PATH, 'mint-tmp'));
                shell.exec("tar -xzf mint-".concat(TARGET_MINT_VERSION.slice(1), ".tar.gz -C mint-tmp --strip-components 1"), {
                    silent: true,
                });
                fse.removeSync(TAR_PATH);
                fse.moveSync(path.join(MINT_PATH, 'mint-tmp', 'client'), path.join(CLIENT_PATH));
                fse.writeFileSync(VERSION_PATH, TARGET_MINT_VERSION);
                // Delete unnecessary content downloaded from GitHub
                fse.removeSync(path.join(MINT_PATH, 'mint-tmp'));
                logger.text = 'Installing dependencies...';
                ensureYarn(logger);
                shell.cd(CLIENT_PATH);
                shell.exec('yarn', { silent: true });
                return [2 /*return*/];
        }
    });
}); };
var checkForMintJson = function (logger) { return __awaiter(void 0, void 0, void 0, function () {
    var configPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getConfigPath(CMD_EXEC_PATH)];
            case 1:
                configPath = _a.sent();
                if (configPath == null) {
                    logger.fail('Must be ran in a directory where a mint.json file exists.');
                    process.exit(1);
                }
                return [2 /*return*/];
        }
    });
}); };
var dev = function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, internet, _a, mintVersionExists, needToDownloadTargetMint, currVersion, relativePath;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                shell.cd(HOME_DIR);
                return [4 /*yield*/, promptForYarn()];
            case 1:
                _b.sent();
                logger = buildLogger('Preparing local Mintlify instance...');
                return [4 /*yield*/, fse.ensureDir(MINT_PATH)];
            case 2:
                _b.sent();
                shell.cd(MINT_PATH);
                return [4 /*yield*/, isInternetAvailable()];
            case 3:
                internet = _b.sent();
                _a = !internet;
                if (!_a) return [3 /*break*/, 5];
                return [4 /*yield*/, pathExists(CLIENT_PATH)];
            case 4:
                _a = !(_b.sent());
                _b.label = 5;
            case 5:
                if (_a) {
                    logger.fail('Running mintlify dev for the first time requires an internet connection.');
                    process.exit(1);
                }
                if (!internet) return [3 /*break*/, 8];
                return [4 /*yield*/, pathExists(VERSION_PATH)];
            case 6:
                mintVersionExists = _b.sent();
                needToDownloadTargetMint = !mintVersionExists;
                if (mintVersionExists) {
                    currVersion = fse.readFileSync(VERSION_PATH, 'utf8');
                    if (currVersion !== TARGET_MINT_VERSION) {
                        needToDownloadTargetMint = true;
                    }
                }
                if (!needToDownloadTargetMint) return [3 /*break*/, 8];
                return [4 /*yield*/, downloadTargetMint(logger)];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: return [4 /*yield*/, nodeModulesExists()];
            case 9:
                if (!(_b.sent())) {
                    if (!internet) {
                        logger.fail("Dependencies are missing and you are offline. Connect to the internet and run\n  \n      mintlify install\n      \n      ");
                    }
                    else {
                        logger.fail("Dependencies were not installed correctly, run\n  \n      mintlify install\n      \n      ");
                    }
                    process.exit(1);
                }
                return [4 /*yield*/, checkForMintJson(logger)];
            case 10:
                _b.sent();
                shell.cd(CLIENT_PATH);
                relativePath = path.relative(CLIENT_PATH, CMD_EXEC_PATH);
                child_process.spawnSync('yarn prebuild', [relativePath], { shell: true });
                logger.succeed('Local Mintlify instance is ready. Launching your site...');
                run((argv === null || argv === void 0 ? void 0 : argv.port) || '3000');
                return [2 /*return*/];
        }
    });
}); };
var run = function (port) {
    shell.cd(CLIENT_PATH);
    // next-remote-watch can only receive ports as env variables
    // https://github.com/hashicorp/next-remote-watch/issues/23
    var mintlifyDevProcess = child_process.spawn('npm run dev-watch', {
        env: __assign(__assign({}, process.env), { PORT: port }),
        cwd: CLIENT_PATH,
        stdio: 'pipe',
        shell: true,
    });
    mintlifyDevProcess.stdout.on('data', function (data) {
        var output = data.toString();
        console.log(output);
        if (output.startsWith('> Ready on http://localhost:')) {
            console.log("\uD83C\uDF3F ".concat(Chalk.green("Your local preview is available at http://localhost:".concat(port))));
            console.log("\uD83C\uDF3F ".concat(Chalk.green('Press Ctrl+C any time to stop the local preview.')));
            open("http://localhost:".concat(port));
        }
    });
    var onExit = function () {
        mintlifyDevProcess.kill('SIGINT');
        process.exit(0);
    };
    process.on('SIGINT', onExit);
    process.on('SIGTERM', onExit);
    listener();
};
export default dev;
