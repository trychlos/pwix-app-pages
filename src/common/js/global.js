/*
 * pwix:app-pages/src/common/js/global.js
 */

import { ReactiveVar } from 'meteor/reactive-var';

AppPages = {
    // the last AppPages.DisplaySet instance
    displaySet: new ReactiveVar( null ),
    // the last AppPages.RunContext instance
    runContext: new ReactiveVar( null ),
    // a placeholder for list unit definitions, settable by all packages
    displayUnitDefs: {}
};
