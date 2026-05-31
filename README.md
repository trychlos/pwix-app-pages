# pwix:app-pages

## What is it ?

A package which let an application describe its pages, modals and so on, said _display units_.

The packages provides four client classes:

- `AppPages.DisplayUnit` which manages each display unit,

- `AppPages.DisplaySet` which gathers all display units of the application

- `AppPages.MenuItem` which defines an interface a menu item may provide

- `AppPages.RunContext` which provides and manages runtime live informations and permissions about the currently displayed unit.

These classes are defined, and can be used, in common code.
 
## Installation

This Meteor package is installable with the usual command:

```sh
    meteor add pwix:app-pages
    meteor npm install lodash --save
```

## Provides

### `AppPages`

The exported `AppPages` global object provides following items:

#### Classes

##### `AppPages.DisplaySet`

The set of `AppPages.DisplayUnit` instances. There is at most one per application.

This class can be used as-is, or can be derived by the application.

Methods are:

- `new AppPages.DisplaySet( set<Object> ): AppPages.DisplaySet`

    The constructor.

    it takes following arguments:

    - `set`:, an object where the keys are the (unique) name of the display units, and the values an object which describes the properties of the display unit.

    We have chosen to not force a singleton implementation. Nonetheless, the last instance is stored as `AppPages.displaySet` ReactiveVar.

- `async allowedInMenu( menu<String>, user<String> ): Array<AppPages.DisplayUnit>`

    This method returns the list of `AppPages.DisplayUnit`s which are contained in the named menu, and are allowed to the specified user.

- `byName( name<String> ): AppPages.DisplayUnit|null`

    This method returns the named `AppPages.DisplayUnit` if found, or null.

- `async enumerate( cb<Function>, args<Any> )`

    This method iterates through the `AppPages.DisplaySet` set, and calls the `cb` callback with the `args` argument.

    The enumeration is stopped when the callback returns `false`.

    The callback has following prototype: `async cb( name<String>, unit<AppPages.DisplayUnit>, args<Any> ): Boolean`.

##### `AppPages.DisplayUnit`

A display unit, either a page or a modal or anything which can be addressed, from a menu, via a route, or anything.

This class can be used as-is, or can be derived by the application.

Methods are:

- `new AppPages.DisplayUnit( name<String>, properties<Object> ): AppPages.DisplayUnit`

    The constructor.

    it takes following arguments:

    - `name`: the (unique) name of the display unit

    - `properties`: the display unit properties:

        - `classes`

            Type: Array<String>

            The classes to be added.

            Defaulting to the [configured](#configuration) value.

        - `inMenus`

            Definition type: String or Array of strings

            Returned type: Array of strings

            The menus names in which this page may appear as an item.

            Defaulting to an empty array.

            Starting with v1.4, this property is ignored when the application defines a `MenuSet`.

        - `menuIcon`

            Type: String

            The name of the FontAwesome icon to be used in front of the menu label.

            Defaulting to the [configured](#configuration) value.

        - `menuLabel`

            Type: String

            The I18n translation key for the menu label.

            Defaulting to the (untranslated) display unit name.

        - `route`

            the route to the page

            Defaulting to null.

        - `template`

            Type: String

            The template to be loaded

            Defaulting to null.

            Please note that this option must be set to get any rendering.

        - `templateParms`

            Type: Object|Function

            Parameters to be passed to the template, defaulting to an empty object.

        - `wantPermission`

            Type: String

            A permission string to be passed as the action to an `isAllowed()` function, defaulting to null (allowed)

            This permission is expected to determine the display/availability/visibility of the display unit for the current user.

            Do not set anything here for public pages.
            
            Contrarily, having a `wantPermission` non-empty string means that the permissions of the current user must be validated by the application through the [configured](#configuration) `allowFn()` function.

- `async accessAllowed(): Boolean`

    This method determines if the current user is allowed to access the display unit.

    It calls the `allowFn()` [configured](#configuration) function with the `wantPermission` action string of the display unit.

- `get( key<String> ): Any`

    This method returns the parameter value for the specified key.

- `name(): String`

    This method returns the unique name of this `AppPages.DisplayUnit`.

##### `AppPages.MenuItem`

This class defines an interface a menu item may provide.

This class can be used as-is, or can be derived by the application.

Methods are:

- `new AppPages.MenuItem({ icon<Any>, css<Any>, label<Any>, event<Any> }): AppPages.MenuItem`

    The constructor.

- `css(): Any`

    Returns the class.

- `event(): Any`

    Returns the event.

- `icon(): Any`

    Returns the icon.

- `label(): Any`

    Returns the label.

##### `AppPages.MenuSet`

This class defines a menu as an ordered list of `DisplayUnit`s.

Methods are:

- `new AppPages.MenuSet({ name<String>, def<Array> }): AppPages.MenuSet`

    The constructor, where:

    - `name` is the name of the menu, must be unique in the application

    - `def` is an array where each item can be:

        - an object with a single `unit` key, whose value must be an object with a single `name` key identifying the `DisplayUnit`

        - an object with a single `menu` key, whose value must be an object with:

            - an optional `icon` key providing the icon display as a HTML string

            - a `label` key providing the localized label to be displayed to open the sub-menu

            - a `name` key identifying another menu as a sub-menu

        - an object with a single `divider` key, which will be honored if its value is truethy.

- `static async getMenu( name<String> ): Array`

    Returns the named menu as an array where each item can be:

    - an allowed `DisplayUnit`

    - the `AppPages.C.Divider` constant

    - a `{ label, menu }` object.

- `static hasMenu( name<String): Boolean`

    Whether the named menu has been defined.

Example:

```js
    new AppPages.MenuSet( 'app_menu_button', [
        { unit: { name: 'managers' }},
        { divider: true },
        { unit: { name: 'organization' }},
        { unit: { name: 'resources' }},
        { divider: true },
        { unit: { name: 'settings' }}
    ]);
```

As the `AppPages.MenuSet` class keeps itself all definitions, there is no need for the application to keep the menuSet instance in a specific variable.

New in v1.4.

##### `AppPages.RunContext`

Let the application access or manages to live informations and permissions.

This class can be used as-is, or can be derived by the application.

Methods are:

- `new AppPages.RunContext(): AppPages.RunContext`

    The constructor.

    We have chosen to not force a singleton implementation. Nonetheless, the last instance is stored as `AppPages.runContext` ReactiveVar.

- `currentPage(): AppPages.DisplayUnit`

    This method returns the current display unit computed from the current route.

    A reactive data source.

- `async getMenu( name<String> ): Array<AppPages.DisplayUnit>`

    Returns the list of the display units available in the specified menu and allowed to the current user.

- `async wantFooter(): Boolean`

    Whether we want display a page footer.

    This method should most probably be overriden by the application.

    Defaults to `true`.

- `async wantHeader(): Boolean`

    Whether we want display a page header.

    This method should most probably be overriden by the application.

    Defaults to `true`.

#### Functions

##### `AppPages.configure()`

See [below](#configuration).

A reactive data source.

### Objects

### `displayUnitDefs`

The `pwix:app-pages` package offers a `AppPages.displayUnitDefs` empty object as a placeholder where other packages are free to install the definitions of the display units they want exhibit.

Most often, the application may so:

- install its own display unit definitions

- instanciate its display set with:

```js
    new AppPages.DisplaySet( AppPages.displayUnitDefs );
```

    Remind that the resulting display set will be available as a `AppPages.displaySet` ReactiveVar.

## Permissions management

This package can take advantage of `pwix:permissions` package to manage the user permissions through the `wantPermission` `DisplayUnit` property. When present, the property is used as the action string identifier when calling the configured `allowFn()` function.

## Configuration

The package's behavior can be configured through a call to the `AppPages.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `allowFn`

    An async function which will be called with an action string identifier, and must return whether the current user is allowed to do the specified action.

    If the function is not provided, then the default is to deny all actions.

    `allowFn` prototype is: `async allowFn( permission<String>, user<String|Object>, page<DisplayUnit> ): Boolean`

- `classes`

    A list of classes to be added to display units.

    Default to `[ 't-page' ]`.

- `menuIcon`

    The menu icon, defaulting to `fa-chevron-right`.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `AppPages.C.Verbose.NONE`

        Do not display any trace log to the console

    - `AppPages.C.Verbose.CONFIGURE`

        Trace `AppPages.configure()` calls and their result

    - `AppPages.C.Verbose.CUURENT_PAGE`
    
        Trace the current page changes

    - `AppPages.C.Verbose.DISPLAY_UNIT`

        Trace DisplayUnit's instanciations

    - `AppPages.C.Verbose.FUNCTIONS`

        Trace all functions calls

Please note that `AppPages.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `AppPages.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 0.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.4.0:

```js
    '@vestergaard-company/js-mixin': '^1.0.3',
    'lodash': '^4.17.0'
```

Each of these dependencies should be installed at application level:

```sh
    meteor npm install <package> --save
```

## Translations

None at the moment.

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-app-pages/issues).

---
P. Wieser
- Last updated on 2026, May. 31st
