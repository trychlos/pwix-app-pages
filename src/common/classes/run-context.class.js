/*
 * pwix:app-pages/src/common/classes/run-context.class.js
 * 
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { ReactiveVar } from 'meteor/reactive-var';

export class RunContext {

    // static data

    // static methods

    // private data

    #currentPage = new ReactiveVar( null );

    // private methods

    // public data

    /**
     * @constructor
     * @returns {RunContext} this instance
     */
    constructor(){
        _trace( 'RunContext::constructor()' );
        // instanciation
        const self = this;

        // initialize the default application title to its name
        //this.title( CoreApp.configure().appName );

        // track the current route name to have a current DisplayUnit
        // @locus Common as FlowRouter.getRouteName() is available on the server
        Tracker.autorun(() => {
            const routeName = FlowRouter.getRouteName();
            let page = null;
            const displaySet = AppPages.displaySet.get();
            if( displaySet ){
                assert( displaySet instanceof AppPages.DisplaySet, 'expects a DisplaySet, got '+displaySet );
                page = displaySet.byName( routeName );
            }
            self.#currentPage.set( page );
            _verbose( AppPages.C.Verbose.CURRENT_PAGE, 'RunContext::currentPage=', page ? page.name() : page );
        });

        // without forcing a singleton, we nonetheless keep a unique instance at the package level as a ReactiveVar
        AppPages.runContext.set( this );

        return this;
    }

    /**
     * @locus Common
     * @access public
     * @returns {DisplayUnit} the current page
     */
    currentPage(){
        _trace( 'RunContext::currentPage()' );
        return this.#currentPage.get();
    }

    /**
     * @summary build a list of the display units which are planned to appear in the specified menu
     * @locus Common
     * @access public
     * @param {String} menu the name of the menu
     * @returns {Array<DisplayUnit>} the ordered list of the allowed display units
     */
    async getMenu( menu ){
        _trace( 'RunContext::getMenu() menu='+menu );
        assert( menu && _.isString( menu ), 'pwix:app-pages RunContext::getMenu() expects a string, got '+menu );
        let pages = [];
        let promises = [];
        const displaySet = AppPages.displaySet.get();
        if( displaySet ){
            assert( displaySet instanceof AppPages.DisplaySet, 'expects a DisplaySet, got '+displaySet );
            displaySet.enumerate(( name, page ) => {
                if( page.get( 'inMenus' ).includes( menu )){
                    promises.push( page.accessAllowed().then(( res ) => {
                        if( res ){
                            pages.push( page );
                        }
                        return true;
                    }));
                }
                return true;
            });
        }
        await Promise.allSettled( promises );
        return pages;
    }

    /**
     * Getter
     * @locus Common
     * @access public
     * @returns {Boolean} whether we want display the page footer regarding the current run context
     *  Should be overiden by the application
     */
    async wantFooter(){
        _trace( 'RunContext::wantFooter()' );
        return true;
    }

    /**
     * Getter
     * @locus Common
     * @access public
     * @returns {Boolean} whether we want display the page header regarding the current run context
     *  Should be overiden by the application
     */
    async wantHeader(){
        _trace( 'RunContext::wantHeader()' );
        return true;
    }
}
