// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by the package.
import { AppPages as packageName } from "meteor/pwix:app-pages";

// Write your tests here!
// Here is an example.
Tinytest.add( 'pwix:app-pages - example', function( test ){
    test.equal( packageName, 'AppPages' );
});
