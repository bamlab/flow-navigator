let hasToPassStep4 = true;

export const getHasToPassStep4 = (): Promise<boolean> =>
  new Promise(resolve => {
    setTimeout(() => {
      return resolve(hasToPassStep4);
    }, 500);
  });

export const postPassedStep4 = () => {
  hasToPassStep4 = false;
  return new Promise(resolve => {
    resolve(false);
  });
};
