/*
 * pwix:app-pages/src/client/classes/run-context.class.js
 */

import _ from 'lodash';
import mix from '@vestergaard-company/js-mixin';

import { IAppPageable } from '../interfaces/iapp-pageable.iface.js';

export class RunContext extends mix( CoreApp.RunContext ).with( IAppPageable ){

    // static data

    // static methods

    // private data

    // private methods

    // protected methods

    // public data

    /**
     * Constructor
     * @locus Client
     * @returns {RunContext} this instance
     */
    constructor(){
        super( ...arguments );
        return this;
    }
}
