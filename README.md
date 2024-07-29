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

## Configuration

The package's behavior can be configured through a call to the `AppPages.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `classes`

    A list of classes to be added to display units.

    Default to `[ 't-page' ]`.

- `menu-icon`

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

Dependencies as of v 1.0.0:

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
- Last updated on 2024, Jul. 29th
