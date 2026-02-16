/*
 * pwix:app-pages/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
AppPages._conf = new ReactiveVar( _conf );

AppPages._defaults = {
    allowFn: null,
    classes: null,
    menuIcon: 'fa-chevron-right',
    verbosity: AppPages.C.Verbose.CONFIGURE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both by the client and the server.
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
AppPages.configure = function( o ){
    if( o && _.isObject( o )){
        // check that keys exist
        let built_conf = {};
        Object.keys( o ).forEach(( it ) => {
            if( Object.keys( AppPages._defaults ).includes( it )){
                built_conf[it] = o[it];
            } else {
                console.warn( 'pwix:app-pages configure() ignore unmanaged key \''+it+'\'' );
            }
        });
        if( Object.keys( built_conf ).length ){
            _conf = _.merge( AppPages._defaults, _conf, built_conf );
            AppPages._conf.set( _conf );
            // be verbose if asked for
            _verbose( AppPages.C.Verbose.CONFIGURE, 'configure() with', built_conf );
        }
    }
    // also acts as a getter
    return AppPages._conf.get();
}

_conf = _.merge( {}, AppPages._defaults );
AppPages._conf.set( _conf );
