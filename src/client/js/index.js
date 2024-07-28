/*
 * pwix:app-pages/src/client/js/index.js
 */

import '../../common/js/index.js';

// provides base classes in AppPages global object
import { DisplaySet } from '../classes/display-set.class';
import { DisplayUnit } from '../classes/display-unit.class';

AppPages.DisplaySet = DisplaySet;
AppPages.DisplayUnit = DisplayUnit;
