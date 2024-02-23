let userFlagB = true;

export const getUserFlagB = (): Promise<boolean> =>
  new Promise(resolve => {
    setTimeout(() => {
      return resolve(userFlagB);
    }, 500);
  });

export const postUserFlagB = () => {
  userFlagB = false;
  return new Promise(resolve => {
    resolve(false);
  });
};
