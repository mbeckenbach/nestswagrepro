import { environmentBase } from './environment.base';

/**
 * Production environment
 */
export const environment = {
  ...environmentBase,
  production: true,
  baseUrl: 'http://localhost:4000'
  // TODO: Set production baseUrl
};
