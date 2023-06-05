#!/usr/bin/env node
import { runCli } from 'cyclone-node'
import * as url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

runCli(
    "mintlify",
    "phc_Belh475IYfPoF9bke7r9ReO3m7WIa21C5ftRvD10Pvs",
    ["node", path.join(__dirname, "_index.js"), ...process.argv.slice(2)]
)