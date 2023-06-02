import os from 'os';
import path from 'path';
import * as url from 'url';
// Change this to bump to a newer version of mint's client
export var TARGET_MINT_VERSION = 'v0.0.21';
// package installation location
export var INSTALL_PATH = url.fileURLToPath(new URL('.', import.meta.url));
export var HOME_DIR = os.homedir();
export var DOT_MINTLIFY = path.join(HOME_DIR, '.mintlify');
export var VERSION_PATH = path.join(DOT_MINTLIFY, 'mint', 'mint-version.txt');
export var CLIENT_PATH = path.join(DOT_MINTLIFY, 'mint', 'client');
export var MINT_PATH = path.join(DOT_MINTLIFY, 'mint');
// command execution location
export var CMD_EXEC_PATH = process.cwd();
export var SUPPORTED_MEDIA_EXTENSIONS = [
    'jpeg',
    'jpg',
    'jfif',
    'pjpeg',
    'pjp',
    'png',
    'svg',
    'svgz',
    'ico',
    'webp',
    'gif',
    'apng',
    'avif',
    'bmp',
    'mp4',
];
