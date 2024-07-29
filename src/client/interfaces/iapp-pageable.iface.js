/*
 * pwix:app-pages/src/client/interfaces/iapp-pageable.iface.js
 *
 * An interface to be implemented by the providers which define a scope.
 * 
 * See also https://github.com/justinfagnani/mixwith.js
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;
import { DeclareMixin } from '@vestergaard-company/js-mixin';

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { ReactiveVar } from 'meteor/reactive-var';

export const IAppPageable = DeclareMixin(( superclass ) => class extends superclass {

    #currentPage = new ReactiveVar( null );

    constructor(){
        super( ...arguments );
        const self = this;

        _verbose( AppPages.C.Verbose.DISPLAY_UNIT, 'IAppPageable instanciation' );

        // track the current route name to have a current DisplayUnit
        Tracker.autorun(() => {
            const routeName = FlowRouter.getRouteName();
            self.#currentPage.set( AppPages.DisplaySet.Singleton.byName( routeName ));
        });

        // track the current page
        Tracker.autorun(() => {
            const page = this.#currentPage.get();
            _verbose( AppPages.C.Verbose.PAGE, 'IAppPageable currentPage', page ? page.name() : page );
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
    async ipageableBuildMenu( menu, isAllowed ){
        assert( menu && _.isString( menu ), 'pwix:app-pages IAppPageable.ipageableBuildMenu() expects a string, got '+menu );
        assert( !isAllowed || _.isFunction( isAllowed ), 'pwix:app-pages IAppPageable.ipageableBuildMenu() expects an optional function, got '+isAllowed );
        let pages = [];
        let promises = [];
        AppPages.DisplaySet.Singleton.enumerate( async ( name, page ) => {
            if( page.get( 'inMenus' ).includes( menu )){
                const wantPermission = page.get( 'wantPermission' );
                console.debug( 'wantPermission', wantPermission );
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
     * @returns {DisplayUnit} the current page
     */
    ipageablePage(){
        return this.#currentPage.get();
    } 
});
