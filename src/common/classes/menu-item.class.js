/*
 * pwix:app-pages/src/common/classes/menu-item.class.js
 *
 * This class defines the interface a menu item may implement.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

export class MenuItem {

    // static data

    // static methods

    // private data
    #css = null;
    #event = null;
    #icon = null;
    #label = null;

    // private methods

    // public data

    /**
     * @locus Anywhere
     * @constructor
     * @param {Object} an optional options object with following keys:
     * 
     *  - icon: the icon to be displayed in front of the menu item
     *    may eventually resolve to a HTML string
     *    e.g. '<span class="fa-solid fa-fw fa-chevron-right ui-mr05"></span>'
     * 
     *  - css: the class to be set on the item, should at least include 'dropdown-item'
     *    e.g.: 'dropdown-item d-flex align-items-center justify-content-start'
     * 
     *  - label: the menu item label as a HTML string
     *    may eventually resolve to a HTML string
     * 
     *  - event: the data-event attribute attached to the item
     *    if no event is defined, then no event will be triggered
     * 
     * @returns {MenuItem} this instance
     */
    constructor( opts ){
        opts = opts || {};
        this.#icon = opts.icon;
        this.#label = opts.label;
        this.#css = opts.css;
        this.#event = opts.event;
        return this;
    }

    /**
     * @locus Anywhere
     * @access public
     * @returns {Any} the class to be added to the itemm
     */
    css(){
        return this.#css;
    }

    /**
     * @locus Anywhere
     * @access public
     * @returns {Any} the event triggered when the item is chosen
     */
    event(){
        return this.#event;
    }

    /**
     * @locus Anywhere
     * @access public
     * @returns {Any} the icon to be displayed in front of the menu item
     */
    icon(){
        return this.#icon;
    }

    /**
     * @locus Anywhere
     * @access public
     * @returns {Any} the menu item label
     */
    label(){
        return this.#label;
    }
}
