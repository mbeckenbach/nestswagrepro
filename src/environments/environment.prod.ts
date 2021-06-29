import { environmentBase } from './environment.base';

/**
 * Production environment
 */
export const environment = {
  ...environmentBase,
  production: true,
  // TODO: Set production baseUrl
};
