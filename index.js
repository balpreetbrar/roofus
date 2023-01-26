/**
 * Created by Angad on 24 January 2023.
 */

"use strict";

process.env.NODE_CONFIG_DIR       = 'config/';
const express                     = require('express');
const router                      = express.Router();
const app                         = express();

global.app                        = app;
global.router                     = router;

require('./middlewares');
require('./modules');
require('./startup').initializeServer();