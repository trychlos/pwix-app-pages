Package.describe({
    name: 'pwix:app-pages',
    version: '1.0.0-rc',
    summary: 'Meteor APP pages description',
    git: 'https://github.com/trychlos/pwix-app-pages.git',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'AppPages'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:app-pages' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    api.use( 'check' );
    api.use( 'ecmascript' );
    api.use( 'ostrio:flow-router-extra@3.10.0 || 3.11.0-rc300.0' );
    api.use( 'reactive-dict' );
    api.use( 'reactive-var' );
    api.use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    api.use( 'tracker' );
    //api.use( 'tracker', 'client' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
