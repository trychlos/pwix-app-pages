# pwix:app-pages

## What is it ?

A package which let an application describe its pages, modals and so on, said _display units_. It relies on `pwix:core-app` and extends the `CoreApp.RunContext` class with a `IAppPageable` interface.

The packages provides too two client classes:

- `AppPages.DisplayUnit`

- `AppPages.DisplaySet`

## Provides

### `AppPages`

The exported `AppPages` global object provides following items:

#### Classes

##### `AppPages.DisplaySet`

An ensemble of `AppPages.DisplayUnit` instances.

This class can be used as-is, or can be derived by the application.

The application is expected to instanciate a `DisplaySet` singleton with the list of `DisplayUnit`'s to be managed.

Methods are:

- `byName( name<String> ): DisplayUnit|null`

    This method returns the named `DisplayUnit`.

- `enumerate( cb<Function>, args<Any> )`

    This method iterates through the `DisplaySet` set, and call the provided `cb` callback.

    The enumeration is stopped when the callback returns `false`.

    The callback has following prototype: `cb( name<String>, def<DisplayUnit>, args<Any> ): Boolean`.

##### `AppPages.DisplayUnit`

A display unit, either a page or a modal or anything which can go into a menu.

This class can be used as-is, or can be derived by the application.

Following parameters are recognized:

- `classes`

    Type: Array<String>

    The classes to be added.

    Defaulting to the configured value.

- `inMenus`

    Definition type: String or Array of strings

    Returned type: Array of strings

    The menus names in which this page may appear as an item.

    Defaulting to an empty array.

- `menuIcon`

    Type: String

    The name of the FontAwesome icon to be used in front of the menu label.

    Defaulting to the configured value.

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

    Please note that, even if this option is optional, we do not get any rendering if it is not set.

- `templateParms`

    Type: Object|Function

    Parameters to be passed to the template, defaulting to an empty object.

- `wantPermission`

    Type: String

    A permission string to be passed to a isAllowed() function, defaulting to null (allowed)

    This permission is expected to determine the display/availability/visibility of the display unit for the current user.

    Do not set anything here for public pages. Contrarily, having a `wantPermission` non-empty string means that the permissions of the current user must be validated by the application through the configured `allowFn` function.

Methods are:

- `get( key<String> ): Any`

    This method returns the parameter value for the specified key.

- `name(): String`

    This method returns the unique name of this `DisplayUnit`.

#### Interfaces

##### `IAppPageable`

The `IAppPageable` interface extends the `CoreApp.RunContext` class with folllowing methods:

- `ipageableBuildMenu( menu>String>, isAllowed<Function> )`

    Returns the array of the `DisplayUnit`'s to be used in the specified menu.

- `ipageablePage()`

    Returns the current `DisplayUnit` page.

    A reactive data source.

##### `AppPages.DisplayUnit`

A page with its route, or a single modal dialog, or anything which can goes into a menu.

This class can be used as-is, or can be derived by the application.

#### Functions

##### `AppPages.configure()`

See [below](#configuration).

A reactive data source.

## Permissions management

This package can take advantage of `pwix:permissions` package to manage the user permissions through the `wantPermission` `DisplayUnit` tag. When present, the tag is used as the action string identifier when calling the configured `allowFn()` function.

## Configuration

The package's behavior can be configured through a call to the `AppPages.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `allowFn`

    An async function which will be called with an action string identifier, and must return whether the current user is allowed to do the specified action.

    If the function is not provided, then the default is to deny all actions.

    `allowFn` prototype is: `async allowFn( action<String> [, ...<Any> ] ): Boolean`

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

    - `AppPages.C.Verbose.PAGE`
    
        Trace the current page changes

    - `AppPages.C.Verbose.DISPLAY_UNIT`

        Trace DisplayUnit's instanciations

Please note that `AppPages.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `AppPages.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 0.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.1.0:

```js
    'lodash': '^4.17.0',
    '@vestergaard-company/js-mixin': '^1.0.3'
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
- Last updated on 2024, Oct. 4th
