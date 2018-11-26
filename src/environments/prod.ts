import { EnvironmentSchema } from './schema';

/**
 * Environment: prod
 */
const env: EnvironmentSchema = {
  name: 'production',
  enableAnimations: true,
  // TODO-SERVICE-URL
  ratesAPI: {
    btc: 'https://rates.tituscoin.com/api/rates',
    bch: 'https://rates.tituscoin.com/api/rates'
  },
  activateScanner: true
};

export default env;
