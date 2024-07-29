/*
 * pwix:app-pages/src/client/js/index.js
 */

import '../../common/js/index.js';

import { DisplaySet } from '../classes/display-set.class';
import { DisplayUnit } from '../classes/display-unit.class';
import { RunContext } from '../classes/run-context.class';

// provides base classes in AppPages global object
AppPages.DisplaySet = DisplaySet;
AppPages.DisplayUnit = DisplayUnit;

// replace the original, public and published, CoreApp.RunContext class after having been interfaced here
CoreApp.RunContext = RunContext;
