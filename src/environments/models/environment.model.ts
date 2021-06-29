/**
 * Describes available build time environment settings
 */
export interface Environment {
  /**
   * Enables angular production mode
   */
  production: boolean;

  /**
   * Base url of this application needed for SSR
   * e.g. http://localhost:4200
   */
  baseUrl: string;
}
