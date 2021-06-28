import { en } from './en.translation';

export const de = {
  ...en, // Inherit from default language
  language: 'Deutsch',
  public: {
    title: 'Home funktioniert!',
  },
  admin: {
    title: 'Admin funktioniert!',
  },
  features: {
    errors: {
      error404: {
        title: '404 - Nicht gefunden'
      }
    }
  },
  // simple function using string literal and interpolation
  // see the cs.translation.ts for another example
  langsSupported: (n: number) => `This demo supports ${n} language${n === 1 ? '' : 's'}.`,
};
