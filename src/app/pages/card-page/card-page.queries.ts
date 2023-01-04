export const createGetCardQuery = (id: string) => {
  return `query GetCard {
    card(id: "${id}") {
      rarity
      name
      stage
      hp
      description
    }
  }`;
};
