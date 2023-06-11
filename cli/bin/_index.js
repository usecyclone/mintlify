#!/usr/bin/env node
import { cli } from './cli.js';
import { NodeClient } from 'cyclone-node';
export { cli };
var cyclone = new NodeClient("mintlify", "phc_7X9WiM8Nk6Cc21OTQsgEBLPR0YS3sFLAh2u4xaDoA0h");
cli();
