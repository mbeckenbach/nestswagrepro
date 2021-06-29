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
  langsSupported: (n: number) => `Diese Demo unterstützt ${n} Sprache${n === 1 ? '' : 'n'}.`,
};
