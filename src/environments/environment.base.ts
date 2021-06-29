/**
 * Default settings inherited by all environments
 */
import { Environment } from './models/environment.model';

export const environmentBase: Environment = {
  production: false,
  baseUrl: 'SET ME!!!',
};
