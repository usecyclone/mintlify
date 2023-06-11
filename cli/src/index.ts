#!/usr/bin/env node
import { runCli } from 'cyclone-node'
import * as url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

runCli(
    "mintlify",
    "phc_7X9WiM8Nk6Cc21OTQsgEBLPR0YS3sFLAh2u4xaDoA0h",
    ["node", path.join(__dirname, "_index.js"), ...process.argv.slice(2)]
)