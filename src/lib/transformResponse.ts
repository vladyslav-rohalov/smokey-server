import { IAllCats } from './interfaces';

export const transformResponse = (res: any) => {
  const categories = ['tobacco', 'hookahs', 'coals', 'accessories'];

  for (const category of categories) {
    if (res[category] === null) {
      delete res[category];
    } else {
      const { id, ...rest } = res[category];
      res = { ...res, ...rest };
      delete res[category];
    }
  }

  return res;
};
