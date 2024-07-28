/*
 * pwix:app-pages/src/common/js/env-settings.js
 */

import _ from 'lodash';

import { Tracker } from 'meteor/tracker';
import { EnvSettings } from 'meteor/pwix:env-settings';

/**
 * @summary When the pwix:env-settings is ready, take two actions:
 *  - have a copy of the environment available to the client
 *  - maybe reconfigure packages if these environment settings are configured for
 * This is called by the application because the EnvSettings.onReady() function is a configuration option,
 * and only the application should configure a package (unless the exception above).
 */
AppPages.onEnvSettingsReady = function(){
    // this AppPages must have been configured with the application name
    check( AppPages.configure().appName, String );

    const env = Meteor.settings.public.runtime.env;
    const settings = Meteor.settings[AppPages.configure().appName].environments[env];
    // copy to the client the environment context
    Meteor.settings.public[AppPages.configure().appName].environment = settings;
    console.debug( 'pwix:app-pages.onEnvSettingsReady() environment settings copied to public object' );

    // let the environment settings override part of the default package configuration provided by the application for this particular environment
    // it expects the following hierarchy:
    //      "packages": {
    //          "pwix:accounts-ui": {               the name of the package
    //              "global": "AccountsUI",         the name of the exported global which holds the configure() function
    //              "conf": {                       the list of overriden keys for this environment
    //                  "passwordLength": 4,            as either a value or a constant
    //                  "passwordStrength": {
    //                      "constant": "AccountsUI.C.Password.VERYWEAK"
    //                  }
    //              }
    //          }
    //      }
    if( settings.packages ){
        Object.keys( settings.packages ).every(( pck ) => {
            if( Object.keys( settings.packages[pck] ).includes( 'global' )){
                const global = settings.packages[pck].global;
                if( Object.keys( settings.packages[pck] ).includes( 'conf' )){
                    let conf = {};
                    Object.keys( settings.packages[pck].conf ).every(( key ) => {
                        let val = settings.packages[pck].conf[key];
                        if( val ){
                            if( _.isString( val )){
                                conf[key] = val;
                            } else if( _.isNumber( val )){
                                conf[key] = val;
                            } else if( _.isObject( val )){
                                if( val.constant ){
                                    let words = val.constant.split( '.' );
                                    let val2 = Package[pck];
                                    for( let i=0 ; i<words.length ; ++i ){
                                        val2 = val2[words[i]];
                                    }
                                    conf[key] = val2;
                                } else {
                                    console.warn( 'unmanaged key', val );
                                }
                            } else {
                                console.warn( 'unmanaged object', val );
                            }
                        }
                        return true;
                    });
                    console.debug( 'pwix:app-pages is calling', pck, 'configure() with', conf );
                    Package[pck][global].configure( conf );
                }
            }
            return true;
        });
    }
}
