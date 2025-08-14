export const environment = {
  production: true,
  auth0: {
    domain: "your_domain.auth0.com",
    clientId: "your_client_id",
    audience: "your_audience",
    redirectUri: "http://localhost:4200",
    scope: "openid profile email",
    state: "xyz"
  },
  api: {
    baseURL: "http://localhost:8080/api/v1"
  }
};
