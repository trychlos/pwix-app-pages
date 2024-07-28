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

export const IAppPageable = DeclareMixin(( superclass ) => class extends superclass {

    constructor(){
        super( ...arguments );
        console.debug( 'instianciating IAppPageable' );
        return this;
    }

    /*
    foo() {
        console.log('foo from MyMixin');
        // this will call superclass.foo()
        super.foo();
    }
    */
  
});
