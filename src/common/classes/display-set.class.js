/*
 * pwix:app-pages/src/common/classes/display-set.class.js
 *
 * This class manages the list of individual DisplayUnit's to be managed by the application.
 * 
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

export class DisplaySet {

    // static data

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
        _trace( 'DisplaySet::constructor() set='+set );
        assert( set && _.isObject( set ), 'pwix:app-pages DisplaySet() expects an object, got '+set );

        Object.keys( set ).forEach(( k ) => {
            this.#set[k] = new AppPages.DisplayUnit( k, set[k] );
        });

        // without forcing a singleton, we nonetheless keep a unique instance at the package level as a ReactiveVar
        AppPages.displaySet.set( this );

        return this;
    }

    /**
     * @locus Anywhere
     * @access public
     * @summary Find allowed display units
     * @param {String} menu the target menu
     * @param {String} user
     * @returns {Array<DisplayUnit>} the list of DisplayUnit's allowed for this user
     */
    async allowedInMenu( menu, user ){
        _trace( 'DisplaySet::allowedList() menu='+menu+' user='+user );
        let result = [];
        await this.enumerate( async ( name, unit, args ) => {
            const menus = unit.get( 'inMenus' );
            if( menus.includes( args.menu )){
                const allowed = await unit.accessAllowed( args.user );
                if( allowed ){
                    args.result.push({ name, unit });
                }
            }
            return true;
        }, { menu: menu, user: user, result: result });
        return result;
    }

    /**
     * @locus Anywhere
     * @access public
     * @summary Find a unit definition by name
     * @param {String} name
     * @returns {DisplayUnit} the found definition, or null
     */
    byName( name ){
        _trace( 'DisplaySet::byName() name='+name );
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
        _trace( 'DisplaySet::enumerate()' );
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
