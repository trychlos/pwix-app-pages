# pwix:app-pages

## What is it ?

A package which let an application describe its pages, modals and so on, said _display units_. It relies on `pwix:core-app` and extends the `CoreApp.RunContext` class with a `IAppPageable` interface.

The packages provides for that two client classes:

- `AppPages.DisplayUnit`

- `AppPages.DisplaySet`

## Provides

### `AppPages`

The exported `AppPages` global object provides following items:

#### Classes

##### `AppPages.DisplaySet`

An ensemble of `AppPages.DisplayUnit` instances.

This class can be used as-is, or can be derived by the application.

##### `AppPages.DisplayUnit`

A page with its route, or a single modal dialog, or anything which can goes into a menu.

This class can be used as-is, or can be derived by the application.

#### Functions

##### `AppPages.configure()`

See [below](#configuration).

A reactive data source.

### Blaze components

#### `coreCookiesLink`

Display a link to the Cookies Policy.

Parameters can be provided:

- label, defaulting to 'Cookies management policy'
- title, defaulting to 'Cookies management policy'
- route, defaulting to configured routePrefix + '/cookies'.

#### `coreFieldCheckIndicator`

Display an indicator about the validity status of a field.

Parameters:

- type: a `AppPages.FieldCheck` constant as `INVALID`, `NONE`, `UNCOMPLETE` or `VALID`.

#### `coreFieldTypeIndicator`

Display an indicator about the type of a field.

Parameters:

- type: a `AppPages.FieldType` constant as `INFO`, `SAVE` or `WORK`
- classes: if set, a list of classes to be added to the default ones.

#### `coreGDPRLink`

Display a link to the Privacy Policy.

Parameters can be provided:

- label, defaulting to 'Privacy Policy'
- title, defaulting to 'Privacy Policy'
- route, defaulting to configured routePrefix + '/gdpr'.

#### `coreGTULink`

Display a link to the General Terms of Use.

Parameters can be provided:

- label, defaulting to 'General Terms of Use'
- title, defaulting to 'General Terms of Use'
- route, defaulting to configured routePrefix + '/gtu'.

#### `coreLegalsLink`

Display a link to the Legal Informations.

Parameters can be provided:

- label, defaulting to 'Legal Informations'
- title, defaulting to 'Legal Informations'
- route, defaulting to configured routePrefix + '/legals'.

### Less mixins

#### `.x-btn-variant( @color )`

#### `.x-btn-outline-variant( @color )`

## Configuration

The package's behavior can be configured through a call to the `AppPages.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `adminRole`

    Define the name of the **application administrator** role.

    Default to 'APP_ADMINISTRATOR'.

    As a reminder, this same value is expected to be also configured in the `pwix:startup-app-admin` package.

- `layout`

    Define the name of the default layout for a page which doesn't define it.

    Default to 'app'.

    This layout is expected to be provided by the application.

- `routePrefix`

    Define the prefix of the routes to be used in provided links.

    Default to `/coreUI`.

- `classes`

    A list of classes to be added to display units.

    Default to `[ 't-page' ]`.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `AppPages.C.Verbose.NONE`

        Do not display any trace log to the console

    - `AppPages.C.Verbose.CONFIGURE`

        Trace `AppPages.configure()` calls and their result

    - `AppPages.C.Verbose.PAGE`

        Trace changes on page and relevant authorizations

Please note that `AppPages.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `AppPages.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 0.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 0.3.0:

```js
    '@popperjs/core': '^2.11.6',
    'bootstrap': '^5.2.1',
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
- Last updated on 2023, June 5th
