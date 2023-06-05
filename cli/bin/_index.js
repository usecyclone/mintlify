#!/usr/bin/env node
import { cli } from './cli.js';
import { NodeClient } from 'cyclone-node';
export { cli };
var cyclone = new NodeClient("mintlify", "phc_Belh475IYfPoF9bke7r9ReO3m7WIa21C5ftRvD10Pvs");
cli();
