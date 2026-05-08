/*
 * pwix:app-pages/src/common/classes/menu-def.class.js
 *
 * This class defines a menu, as an ordered list of display units or other items.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { check, Match } from 'meteor/check';
import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

export class MenuSet {

    // static data

    static menus = {};

    // static methods

    /**
     * @locus Anywhere
     * @param {String} name a menu name
     * @returns {Array} the menu as a list of DisplayUnit's or sub-menus
     *  The items of the returned array can be:
     *  - an allowed DisplayUnit
     *  - a 'DIVIDER' string constant
     *  - an object { label, menu }
     */
    static async getMenu( name ){
        check( name, Match.NonEmptyString );
        const menu = MenuSet.menus[name];
        return await menu.buildMenu();
    }

    /**
     * @locus Anywhere
     * @param {String} name a menu name
     * @returns {Boolean} whether the named menu has been defined (is known)
     */
    static hasMenu( name ){
        check( name, Match.NonEmptyString );
        return Boolean( MenuSet.menus[name] );
    }

    // private data

    // the name of the menu
    #name = null;
    #def = null;

    // private methods

    // public data

    /**
     * @locus Anywhere
     * @constructor
     * @param {String} name the unique menu name
     * @param {Array} def an array of item or sub-menus as plain objects with following keys:
     * 
     *  - unit: {
     *      name: <unit_name>  the item is a display unit
     *    }
     * 
     *  - divider: true
     * 
     *  - menu: {
     *      label: the label of the sub-menu title
     *      name: <menu_name> the item is a sub-menu
     *    }
     * 
     * @returns {MenuSet} this instance
     */
    constructor( name, def ){
        check( name, Match.NonEmptyString );
        check( def, [Object] );
        this.#name = name;
        this.#def = def;

        MenuSet.menus[name] = this;

        return this;
    }

    /**
     * @locus Anywhere
     * @returns {Array} the menu as a list of DisplayUnit's or sub-menus
     */
    async buildMenu(){
        const menu = [];
        for( const it of this.#def ){
            // do not put a divider as first member
            //  do not put a divider just after another divider
            if( it.divider ){
                if( menu.length && menu[menu.length-1] !== AppPages.C.Divider ){
                    menu.push( AppPages.C.Divider );
                }
            }
            if( it.unit ){
                const unit = AppPages.displaySet.get().byName( it.unit.name );
                if( unit ){
                    const allowed = await unit.accessAllowed( Meteor.userId());
                    if( allowed ){
                        menu.push( unit );
                    }
                }
            }
            if( it.menu ){
                const label = it.menu.label || it.menu.name;
                const sub = await this.buildMenu( it.menu.name );
                menu.push({ label, sub });
            }
        }
        return menu;
    }
}
