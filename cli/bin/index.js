#!/usr/bin/env node
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { runCli } from 'cyclone-node';
import * as url from 'url';
import path from 'path';
var __dirname = url.fileURLToPath(new URL('.', import.meta.url));
runCli("mintlify", "phc_Belh475IYfPoF9bke7r9ReO3m7WIa21C5ftRvD10Pvs", __spreadArray(["node", path.join(__dirname, "_index.js")], process.argv.slice(2), true));
