/*
 * pwix:app-pages/src/common/js/trace.js
 */

_verbose = function( level ){
    if( AppPages.configure().verbosity & level ){
        let args = [ ...arguments ];
        args.shift();
        console.debug( 'pwix:app-pages', ...args );
    }
};

_trace = function( functionName ){
    _verbose( AppPages.C.Verbose.FUNCTIONS, ...arguments );
};
