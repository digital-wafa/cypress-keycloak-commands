Cypress.Commands.add('login', (username, password) => {
    const loginRequest = {
      url: `${Cypress.env("KEYCLOAK_BASE_URL")}/auth/realms/${Cypress.env("KEYCLOAK_REALM")}/protocol/openid-connect/auth`,
      qs: {
        client_id: Cypress.env("KEYCLOAK_CLIENT"),
        redirect_uri: Cypress.env("KEYCLOAK_REDIRECT_URI"),
        state: createUUID(),
        nonce: createUUID(),
        response_mode: 'fragment',
        response_type: 'code',
        scope: 'openid%20phone',
        kc_idp_hint: Cypress.env("KEYCLOAK_IDP_HINT")
      }
    };


    return cy.request(loginRequest).then(submitLoginForm);

    function submitLoginForm(response) {
      const keycloakLoginPage = document.createElement('html');
      keycloakLoginPage.innerHTML = response.body;

      const loginForm = keycloakLoginPage.getElementsByTagName('form');

      const isAuthenticated = !loginForm.length;
      if (isAuthenticated) {
        return;
      }
      
      return cy.request({
        form: true,
        method: 'POST',
        url: loginForm[0].action,
        followRedirect: false,
        body: {
          username: username,
          password: password        
        }
      });
    }

    function createUUID() {
      var s = [];
      var hexDigits = '0123456789abcdef';
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4';
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = '-';
      var uuid = s.join('');
      return uuid;
    }
});


Cypress.Commands.add('logout', () => {
  return cy.request({
    url: `${Cypress.env("KEYCLOAK_BASE_URL")}/auth/realms/${Cypress.env("KEYCLOAK_REALM")}/protocol/openid-connect/logout`,
    qs: {
      redirect_uri: Cypress.env("KEYCLOAK_REDIRECT_URI")
    }
  });
});