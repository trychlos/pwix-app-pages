/*
 * pwix:app-pages/src/common/classes/menu-item.class.js
 *
 * This class defines the interface a menu item may implement.
 * 
 * A menu item can be:
 * 
 * - a styled label which, when selected/hovered, does an action, the possible actions being:
 *   > triggering an event
 *   > opening another menu
 * 
 * - an unselectable separator.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';
import mix from '@vestergaard-company/js-mixin';

import { Logger } from 'meteor/pwix:logger';

import { AppPagesBase } from './app-pages-base.class.js';

import { IMenuItem } from '../interfaces/imenu-item.iface.js';

const logger = Logger.get();

export class MenuItem extends mix( AppPagesBase ).with( IMenuItem ){

    // static data

    // static methods

    // private data
    #def = null;

    // private methods

    // public data

    /**
     * @locus Anywhere
     * @constructor
     * @param {Object} def a definition object with following keys:
     * 
     *  - unit: {
     *      name: <unit_name>  the item is a display unit
     *    }
     * 
     *  - divider: true
     * 
     *  - menu: {
     *      label: the styled and localized label of the sub-menu title, as a HTML string
     *      name: <menu_name> the item is a sub-menu
     *    }
     * 
     * @returns {MenuItem} this instance
     */
    constructor( def ){
        super( ...arguments );

        this.#def = def;

        return this;
    }

    /**
     * @locus Anywhere
     * @returns {Object} the initial definition of the menu item
     */
    defn(){
        return this.#def;
    }

    /**
     * @locus Anywhere
     * @param {String} name the name of an additional property
     * @returns {String} the value of the named additional property
     */
    get( name ){
        const defn = this.defn();
        let value = defn[name] || null;
        if( !value && this.isDisplayUnit()){
            const unit = this.unit();
            if( unit ){
                value = unit.get( name );
            }
        }
        return value;
    }

    /**
     * @locus Anywhere
     * @returns {DisplayUnit} the display unit attached to this menu item, or null
     */
    unit(){
        return AppPages.displaySet.get().byName( this.name());
    }
}
