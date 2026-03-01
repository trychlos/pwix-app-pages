# pwix:app-pages

## ChangeLog

### 1.3.0-rc

    Release date: 

    - No more provide a default class to the display units
    - Remove useless RunContext.dataContext() method
    - Define new allowedInMenu() function, thus bumping minor candidate version number + enumerate() becomes async
    - configure() now warns for unmanaged keys
    - Introduce new AppPages.MenuItem class
    - Use pwix:logger universal logger

### 1.2.0

    Release date: 2025- 7- 8

    - Improve documentation
    - Move classes and interfaces definitions to common code, thus bumping minor candidate version number
    - Define new DisplayUnit.allowed() method
    - Transform DisplayUnit private data into protected to make derivation easyer
    - Define new RunContext class (moved from pwix:core-app package)

### 1.1.1

    Release date: 2024-10- 4

    - Fix configuration overrides

### 1.1.0

    Release date: 2024- 8-11

    - Keep the RunContext pointer at the package level
    - Add allowFn configuration option, bumping minor candidate version number

### 1.0.0

    Release date: 2024- 7-29

    - Initial release

---
P. Wieser
- Last updated on 2025, Jul. 8th