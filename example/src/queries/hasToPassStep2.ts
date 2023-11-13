let hasToPassStep2 = true;

export const getHasToPassStep2 = (): Promise<boolean> =>
  new Promise(resolve => {
    setTimeout(() => {
      return resolve(hasToPassStep2);
    }, 500);
  });

export const postPassedStep2 = () => {
  hasToPassStep2 = false;
  return new Promise(resolve => {
    resolve(false);
  });
};
