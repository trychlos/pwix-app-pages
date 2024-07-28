/*
 * pwix:app-pages/src/client/js/index.js
 */

import '../../common/js/index.js';

// provides base classes in AppPages global object
import { DisplaySet } from '../classes/display-set.class';
import { DisplayUnit } from '../classes/display-unit.class';
import { RunContext } from '../classes/run-context.class';

AppPages.DisplaySet = DisplaySet;
AppPages.DisplayUnit = DisplayUnit;

// replace the original, public and published, RunContext class
CoreApp.RunContext = RunContext;
