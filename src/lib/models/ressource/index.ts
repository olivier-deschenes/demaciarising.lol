export const RESSOURCE_TYPES = [
  "FOOD",
  "WOOD",
  "STONE",
  "METAL",
  "PETRICITE",
] as const;

export type RessourceType = (typeof RESSOURCE_TYPES)[number];

export type RessourceMatrix = Record<RessourceType, number>;

export const INITIAL_RESSOURCES: RessourceMatrix = {
  FOOD: 0,
  WOOD: 0,
  STONE: 0,
  METAL: 0,
  PETRICITE: 0,
};

export const mergeRessourceMatrices = (
  a: RessourceMatrix,
  b: RessourceMatrix,
): RessourceMatrix => {
  const result: RessourceMatrix = { ...INITIAL_RESSOURCES };

  RESSOURCE_TYPES.forEach((type) => {
    result[type] = a[type] + b[type];
  });

  return result;
};
