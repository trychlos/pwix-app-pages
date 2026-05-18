/*
 * pwix:app-pages/src/common/classes/display-set.class.js
 *
 * This class manages the list of individual DisplayUnit's to be managed by the application.
 * 
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Logger } from 'meteor/pwix:logger';

import { AppPagesBase } from './app-pages-base.class.js';

const logger = Logger.get();

export class DisplaySet extends AppPagesBase {

    // static data

    static Singleton = null;

    // static methods

    // private data

    #set = {};

    // private methods

    // public data

    /**
     * @locus Anywhere
     * @constructor
     * @param {Object} set the application-provided definition of displayable units, as a keyed object where:
     *  - the key is the name of the display unit, must obviously be unique
     *  - the value is an object which describes the properties of the display unit
     * @returns {DisplaySet} this set
     * @throws {Exception} if the provided set is not valid
     */
    constructor( set ){
        super( ...arguments );

        if( DisplaySet.Singleton ){
            logger.debug( 'returning alreadyn instanciated singleton' );
            return DisplaySet.Singleton;
        }

        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.FUNCTIONS }, 'DisplaySet.DisplaySet() set='+set );
        assert( set && _.isObject( set ), 'pwix:app-pages DisplaySet() expects an object, got '+set );

        Object.keys( set ).forEach(( k ) => {
            this.#set[k] = new AppPages.DisplayUnit( k, set[k] );
        });

        // force a singleton
        DisplaySet.Singleton = this;

        // and keep anyway this unique instance at the package level as a ReactiveVar
        AppPages.displaySet.set( this );

        return this;
    }

    /**
     * @locus Anywhere
     * @access public
     * @summary Find a unit definition by name
     * @param {String} name
     * @returns {DisplayUnit} the found definition, or null
     */
    byName( name ){
        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.FUNCTIONS }, 'DisplaySet.byName() name='+name );
        return this.#set[name] || null;
    }

    /**
     * @locus Anywhere
     * @access public
     * @summary Enumerate the registered DisplayUnit's definitions as provided by the application
     * @param {Function} cb a callback triggered for each unit definition as `cb( name<String>, def<DisplayUnit>, arg<Any> )`
     *  the `cb()` function must return true to continue the enumeration, false to stop it
     * @param {Any} arg an optional argument to be provided to the cb() callback
     */
    async enumerate( cb, arg=null ){
        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.FUNCTIONS }, 'DisplaySet.enumerate()' );
        const self = this;
        assert( cb && _.isFunction( cb ), 'expected a function, found '+cb );
        const keys = Object.keys( self.#set ).sort();
        for ( const key of keys ){
            const goon = await cb( key, self.#set[key], arg );
            if( !goon ){
                break;
            }
        }
    }
}
