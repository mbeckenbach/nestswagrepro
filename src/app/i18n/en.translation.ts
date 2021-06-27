export const en = {
  language: 'English',
  home: {
    title: 'Home works!',
  },
  info: {
    title: 'Info works!',
  },
  features: {
    errors: {
      error404: {
        title: '404 - Not found'
      }
    }
  },
  // simple function using string literal and interpolation
  // see the cs.translation.ts for another example here:
  // https://stackblitz.com/github/vmasek/angular-typed-translations-demo?file=src%2Fapp%2Fi18n%2Fcs.translation.ts
  langsSupported: (n: number) => `This demo supports ${n} language${n === 1 ? '' : 's'}.`,
  hello: (name: string) => `Hello ${name}!`,
};
