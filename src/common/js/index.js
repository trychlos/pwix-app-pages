/*
 * pwix:app-pages/src/common/js/index.js
 */

import { DisplaySet } from '../classes/display-set.class.js';
import { DisplayUnit } from '../classes/display-unit.class.js';
import { MenuItem } from '../classes/menu-item.class.js';
import { RunContext } from '../classes/run-context.class.js';

import './global.js';
import './constants.js';
import './configure.js';

// provides base classes in AppPages global object
AppPages.DisplaySet = DisplaySet;
AppPages.DisplayUnit = DisplayUnit;
AppPages.MenuItem = MenuItem;
AppPages.RunContext = RunContext;
