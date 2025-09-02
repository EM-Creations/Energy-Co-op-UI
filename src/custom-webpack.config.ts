import {EnvironmentPlugin} from 'webpack';

require('dotenv').config();

module.exports = {
  output: {
    crossOriginLoading: 'anonymous'
  },
  plugins: [
    new EnvironmentPlugin([
      'AUTH0_DOMAIN',
      'AUTH0_CLIENT_ID',
      'AUTH0_AUDIENCE',
      'AUTH0_REDIRECT_URI',
      'API_BASE_URL',
    ])
  ]
}
