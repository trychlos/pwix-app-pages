/*
 * pwix:app-pages/src/common/js/index.js
 */

import { DisplaySet } from '../classes/display-set.class.js';
import { DisplayUnit } from '../classes/display-unit.class.js';
import { RunContext } from '../classes/run-context.class.js';

import './global.js';
import './constants.js';
import './configure.js';
import './trace.js';

// provides base classes in AppPages global object
AppPages.DisplaySet = DisplaySet;
AppPages.DisplayUnit = DisplayUnit;
AppPages.RunContext = RunContext;
