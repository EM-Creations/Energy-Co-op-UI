export const environment = {
  production: true,
  auth0: {
    domain: process.env["AUTH0_DOMAIN"],
    clientId: process.env["AUTH0_CLIENT_ID"],
    audience: process.env["AUTH0_AUDIENCE"],
    redirectUri: process.env["AUTH0_REDIRECT_URI"],
    scope: "openid profile email",
    state: "xyz"
  },
  api: {
    baseURL: process.env["API_BASE_URL"],
    energyMixURL: "https://api.carbonintensity.org.uk"
  }
};
