/*
 * pwix:app-pages/src/client/interfaces/iapp-pageable.iface.js
 *
 * An interface which extends the application RunContext with a pages management.
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

        // keep this instance at the package level (hoping there is only one)
        AppPages.runContext = this;

        return this;
    } 

    /**
     * @summary build a list of the display units which are planned to appear in the specified menu
     * @param {String} menu the name of the menu
     * @returns {Array<DisplayUnit>} the ordered list of the allowed display units
     */
    async ipageableBuildMenu( menu ){
        assert( menu && _.isString( menu ), 'pwix:app-pages IAppPageable.ipageableBuildMenu() expects a string, got '+menu );
        let pages = [];
        let promises = [];
        const allowFn = AppPages.configure().allowFn;
        AppPages.DisplaySet.Singleton.enumerate( async ( name, page ) => {
            if( page.get( 'inMenus' ).includes( menu )){
                const wantPermission = page.get( 'wantPermission' );
                //console.debug( 'wantPermission', wantPermission );
                const p = Promise.resolve( allowFn && wantPermission ? allowFn( wantPermission ) : !wantPermission );
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
