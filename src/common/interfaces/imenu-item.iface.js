/*
 * pwix:app-pages/src/common/interfaces/imenu-item.iface.js
 *
 * The interface for a menu item.
 * 
 * A menu item can be:
 * - either a DisplayUnit, which provides itself icon, label, css and target route
 * - or a divider
 * - or a submenu, with an icon, a label and an array of menu items
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';
import { DeclareMixin } from '@vestergaard-company/js-mixin';

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

export const IMenuItem = DeclareMixin(( superclass ) => class extends superclass {

    // an interface method which should be overriden by the implementation

    // private data

    /**
     * @returns {IMenuItem}
     */
    constructor(){
        super( ...arguments );
        return this;
    }

    /**
     * @returns {Boolan} whether this item is a display unit
     */
    isDisplayUnit(){
        return Object.keys( this.defn()).includes( 'unit' );
    }

    /**
     * @returns {Boolan} whether this item is a divider
     */
    isDivider(){
        return Object.keys( this.defn()).includes( 'divider' );
    }

    /**
     * @returns {Boolan} whether this item is a sub-menu
     */
    isMenu(){
        return Object.keys( this.defn()).includes( 'menu' );
    }

    /**
     * @returns {String} null if a divider, or the styled localized label if a sub-menu, or null
     */
    label(){
        return this.defn().menu?.label || null;
    }

    /**
     * @returns {String} null if a divider, or the name of the sub-menu, or the name of the display unit
     */
    name(){
        return this.defn().menu?.name || this.defn().unit?.name || null;
    }
});
