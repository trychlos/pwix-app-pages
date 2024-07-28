/*
 * pwix:app-pages/src/client/classes/display-set.class.js
 *
 * This class manages the individual DisplayUnit's.
 * This is a singleton instanciated once on client-side at application initialization time.
 * 
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;

import { check } from 'meteor/check';

import { Base } from '../../common/classes/base.class';

import { DisplayUnit } from './display-unit.class';

export class DisplaySet extends Base {

    // static data

    static Singleton = null;

    // static methods

    // private data

    #set = {};

    // private methods

    // public data

    /**
     * Constructor
     * @locus Client
     * @param {Object} set the application-provided definition of displayable units, as a keyed object where:
     *  - the key is the name of the display unit, must obviously be unique
     *  - the value is an object which describes the properties of the display unit
     * @param {Function} unitFn an optional constructor, defaulting to AppPages.DisplayUnit
     *  the prototype must be unitFn( key<String>, properties<Object> ): <DisplayUnit>-derived instance
     * @returns {DisplaySet} this set
     * @throws {Exception} if the provided definition is not valid
     */
    constructor( set, unitFn ){
        assert( set && _.isObject( set ), 'pwix:app-pages DisplaySet() expect an object, got '+set );
        assert( !unitFn || _.isFunction( unitFn ), 'pwix:app-pages DisplaySet() expect an optional function, got '+unitFn );
        super( ...arguments );

        if( DisplaySet.Singleton ){
            console.log( 'pwix:app-pages DisplaySet() trying to instanciates a new instance of an already existing singleton, returning the singleton' );
            return DisplaySet.Singleton;
        }

        DisplaySet.Singleton = this;

        unitFn = unitFn || DisplayUnit;

        Object.keys( set ).forEach(( k ) => {
            this.#set[k] = new unitFn( k, set[k] );
        });

        return this;
    }

    /**
     * @summary build a list of the display units which are planned to appear in the specified menu
     * @param {String} menu the name of the menu
     * @param {Function} isAllowed an optional (async) permission function
     *  When null, the user is considered allowed to
     * @returns {Array<DisplayUnit>} the ordered list of the allowed display units
     */
    async buildMenu( menu, isAllowed ){
        check( menu, String );
        check( isAllowed, Match.OneOf( Function, null ));
        let pages = [];
        let promises = [];
        this.enumerate( async ( name, page ) => {
            if( page.get( 'inMenus' ).includes( menu )){
                const wantPermission = page.get( 'wantPermission' );
                const p = Promise.resolve( !wantPermission || isAllowed( wantPermission ));
                pages.push( page );
                promises.push( p );
            }
            return true;
        });
        let allowed = [];
        return Promise.allSettled( promises ).then(( res ) => {
            assert( res.length === pages.length, 'expect res.length === pages.length' );
            for( let i=0 ; i<pages.length ; ++i ){
                if( res[i].value ){
                    allowed.push( pages[i] );
                }
            }
            //console.debug( 'returning', allowed );
            return allowed;
        });
    }

    /**
     * @summary Find a unit definition by name
     * @param {String} name
     * @returns {DisplayUnit} the found definition, or null
     */
    byName( name ){
        return this.#set[name] || null;
    }

    /**
     * @summary Enumerate the registered DisplayUnit's definitions as provided by the application
     * @param {Function} cb a callback triggered for each unit definition as `cb( name<String>, def<DisplayUnit>, arg<Any> )`
     *  the `cb()` function must return true to continue the enumeration, false to stop it
     * @param {Any} arg an optional argument to be provided to the cb() callback
     */
    enumerate( cb, arg=null ){
        const self = this;
        if( !cb || !_.isFunction( cb )){
            console.error( 'expected a function, found', cb );
        } else {
            Object.keys( self.#set ).sort().every(( key ) => {
                return cb( key, self.#set[key], arg );
            });
        }
    }
}
