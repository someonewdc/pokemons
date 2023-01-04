import { Filters } from '@app/pages/main-page/main-page.models';

export const requestChangeDetector = <T extends [number, Filters, boolean]>(
  prev: T,
  curr: T
): boolean => {
  return prev[0] === prev[0] || prev[2] !== curr[2];
};
