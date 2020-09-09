# cypress-keycloak-commands ![npm version](https://img.shields.io/npm/v/@digital-wafa/cypress-keycloak-commands)
a keycloak commands list to use in cypress e2e tests


## Installation

```
npm i @digital-wafa/cypress-keycloak-commands -D
```

## Usage

Add the following environment variables to your `cypress.json` file

```json
{
  "env": {
    "KEYCLOAK_BASE_URL" : "your keycloak base url",
    "KEYCLOAK_REALM" : "your realm",
    "KEYCLOAK_CLIENT" : "your client id",
    "KEYCLOAK_REDIRECT_URI" : "your redirect uri",
    "KEYCLOAK_IDP_HINT" : "your idp hint"
  }
}
```

Import the commands in your `cypress/support/commands.js` file

```javascript
require("@digital-wafa/cypress-keycloak-commands");
```

Finaly inside your cypress tests files 

```javascript
// to login
cy.login(username, password)

// to logout
cy.logout()
```

## Acknowledgement

this library is based on this blog [post](https://vrockai.github.io/blog/2017/10/28/cypress-keycloak-intregration/).

