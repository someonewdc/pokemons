import { Filters } from '@app/pages/main-page/main-page.models';
import { INITIAL_FILTERS } from '@app/pages/main-page/main-page.constants';

export const createGetCardsQuery = (
  page: number,
  filters: Filters | null,
  stage = ''
) => {
  const { rarity, name } = filters ?? INITIAL_FILTERS;
  return `query GetCards {
    cards(pagination: { page: ${page}, count: 5 }, filters: { rarity: "${rarity}", name: "${name}", stage: "${stage}" }) {
      name
      stage
      rarity
      id
    }
  }`;
};
