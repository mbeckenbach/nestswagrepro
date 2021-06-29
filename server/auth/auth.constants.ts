import { SetMetadata } from '@nestjs/common';

/**
 * Key for reading the decorator
 */
export const ALLOW_ANONYMOUS_KEY = 'allowAnonymous';

/**
 * Allows anonymous access to a route
 */
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);

/**
 * Constants for JWT
 */
export const jwtConstants = {
  /**
   * Private token signing key
   * TODO: Move to env variable, vault, or anything more secure
   */
  secret: 'secretKey',
  /**
   * Token expires in ? seconds
   */
  expiresIn: 60,
};
