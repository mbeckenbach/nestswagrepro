export const en = {
  language: 'English',
  public: {
    title: 'Home works!',
  },
  admin: {
    title: 'Admin works!',
  },
  features: {
    errors: {
      error404: {
        title: '404 - Not found'
      }
    }
  },
  formValidation: {
    required: 'This field is required.',
    existingPatient: 'The patient number is already assigned.',
    patientIsAdmitted: 'The Patient is already admitted.',
    pattern: 'Please check the format entered.',
    min: (minValue: number) => `Min. value is ${minValue}`,
    max: (maxValue: number) => `Max. value is ${maxValue}`,
  },
  // simple function using string literal and interpolation
  // see the cs.translation.ts for another example here:
  // https://stackblitz.com/github/vmasek/angular-typed-translations-demo?file=src%2Fapp%2Fi18n%2Fcs.translation.ts
  langsSupported: (n: number) => `This demo supports ${n} language${n === 1 ? '' : 's'}.`,
  hello: (name: string) => `Hello ${name}!`,
};
