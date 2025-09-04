export const environment = {
  production: true,
  auth0: {
    domain: "dev-energycoop.uk.auth0.com",
    clientId: "xN3rhmATd9PPs0I2bwzpdef2IUhaEQQo",
    audience: "http://localhost:8080/",
    redirectUri: "https://energycoop-ui-production.up.railway.app",
    scope: "openid profile email",
    state: "xyz"
  },
  api: {
    baseURL: "https://energy-co-op-server.railway.internal/api/v1",
    energyMixURL: "https://api.carbonintensity.org.uk"
  }
};
