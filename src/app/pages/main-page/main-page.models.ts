export type Filters = {
  name: string;
  stages: string[];
  rarity: string;
};

export type FiltersWithPage = Filters & {
  page: number;
};

export type PokemonTable = {
  id: string;
  name: string;
  rarity: string;
  stage?: string;
};
