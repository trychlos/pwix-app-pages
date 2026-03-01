/*
 * pwix:app-pages/src/common/classes/display-unit.class.js
 *
 * This class manages a display unit, which may be either a page or a modal.
 * A page display unit has its own route, while a modal doesn't.
 * Also, anything which can goes into a menu should be described here.
 *
 * Only a non-empty name is mandatory. All other fields are optional.
 *
 * Keys known of this package are:
 *
 *  - name
 *                      Type: String
 *                      MANDATORY (no default).
 *
 *  - classes
 *  - inMenus
 *  - menuIcon
 *  - menuLabel
 *  - route
 *  - template
 *  - templateParms
 *  - wantPermission
 *
 * Please note that - after a try - we have decided to NOT use SimpleSchema to validate the provided definition.
 * Main reason is that it is difficult (or at least not documented) to use a longhand definition when type is either a string or an array of strings.
 *
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

export class DisplayUnit {

    // static data

    // static methods

    // private data
    #name = null;

    // private methods

    // protected data
    //  these check methods are underscore_prefixed to mark them private along a common usage in javascript
    //  but we can consider them as only protected, and so useable by derived classes (and so not easily updatable)
    _def = null;

    // protected methods
    //  these check methods are underscore_prefixed to mark them private along a common usage in javascript
    //  but we can consider them as only protected, and so useable by derived classes (and so not easily updatable)

    // check that the (optional) value is a boolean
    //  set the default value if provided
    _checkBoolean( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            if( !Match.test( o[key], Boolean )){
                throw new Error( key+' is not a boolean' );
            }
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // check that the (optional) value is an object or a function
    //  set the default value if provided
    _checkObjectOrFunction( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            if( !Match.test( o[key], Object ) && !Match.test( o[key], Function )){
                throw new Error( key+' is not an object nor a function' );
            }
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // check that the (optional) value is a string
    //  set the default value if provided
    _checkString( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            assert( o[key] && _.isString( o[key] ), 'pwix:app-pages DisplayUnit() expects a string, got '+o[key] );
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // check that the (optional) value is a string or an array of string(s)
    // update the provided object to have an array of string(s)
    //  set the default value if provided
    _checkStringOrArray( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            if( !Match.test( o[key], String ) && !Match.test( o[key], [String] )){
                throw new Error( key+' is not a string nor an array of string(s)' );
            }
            if( !_.isArray( o[key] )){
                o[key] = [ o[key] ];
            }
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // public data

    /**
     * @locus Anywhere
     * @constructor
     * @param {String} name the unit name
     * @param {Object} def the unit definition as a javascript object
     * @returns {DisplayUnit} this instance
     * @throws {Exception} if the provided definition is not valid
     */
    constructor( name, def ){
        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.FUNCTIONS }, 'DisplayUnit.DisplayUnit() name='+name, 'def', def );
        assert( name && _.isString( name ), 'pwix:app-pages DisplayUnit() expects a string, got '+name );

        this._checkStringOrArray( def, 'classes', AppPages.configure().classes );
        this._checkStringOrArray( def, 'inMenus', [] );
        this._checkString( def, 'menuIcon', AppPages.configure().menuIcon );
        this._checkString( def, 'menuLabel', name );
        this._checkString( def, 'route' );
        this._checkString( def, 'template' );
        this._checkObjectOrFunction( def, 'templateParms' );
        this._checkString( def, 'wantPermission' );

        this.#name = name;
        this._def = { ...def };

        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.DISPLAY_UNIT }, 'DisplayUnit instanciation', name );

        return this;
    }

    /**
     * @locus Anywhere
     * @access public
     * @param {String|Object} user the identifier or document object, defaulting to current user on client side, to null on server side
     * @returns {Boolean} whether the current user is allowed to access this display unit
     */
    async accessAllowed( user ){
        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.FUNCTIONS }, 'DisplayUnit.accessAllowed() user='+user );
        const allowFn = AppPages.configure().allowFn;
        const wantPermission = this.get( 'wantPermission' );
        const res = await ( allowFn && wantPermission ? allowFn( wantPermission, user, this ) : false );
        return res;
}

    /**
     * @locus Anywhere
     * @access public
     * @summary Generic getter
     * @param {String} key the name of the desired field
     * @returns {Any} the corresponding value
     */
    get( key ){
        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.FUNCTIONS }, 'DisplayUnit.get() key='+key );
        return key === 'name' ? this.name() : this._def[key];
    }

    /**
     * @locus Anywhere
     * @access public
     * @returns {String} the page name
     */
    name(){
        logger.verbose({ verbosity: AppPages.configure().verbosity, against: AppPages.C.Verbose.FUNCTIONS }, 'DisplayUnit.name()' );
        return this.#name;
    }
}
