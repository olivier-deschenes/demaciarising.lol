import type { Environment } from "../environment/AEnrironment";
import { INITIAL_RESSOURCES, type RessourceMatrix } from "../ressource";
import { RessourceStructure } from "../structure/ARessourceStructure";
import type { Structure } from "../structure/AStructure";

export abstract class Settlement {
  protected name: string;
  protected level: number;
  protected maxStructuresCount: number;
  protected environment: Environment;

  protected structures: Structure[];
  protected firstIndexesByRessourceType: Partial<RessourceMatrix>;

  constructor(name: string, level: number, environment: Environment) {
    this.name = name;
    this.level = level;
    this.maxStructuresCount = this.calculateMaxStructuresCount(level);
    this.structures = [];
    this.environment = environment;

    this.firstIndexesByRessourceType = {};
  }

  private calculateMaxStructuresCount(level: number): number {
    return 2 + level;
  }

  public calculateTotalRessourcePerTurn(): RessourceMatrix {
    console.log(
      `Calculating total ressource per turn for settlement: ${this.name}`,
    );

    const matrix = this.structures.reduce(
      (acc, structure, index) => {
        console.log(
          `\tProcessing structure: ${structure.getName()} at index ${index}`,
        );

        if (structure instanceof RessourceStructure) {
          const ressourceType = structure.getRessourceType();

          console.log(
            `\t\tStructure is a RessourceStructure of type: ${structure.getRessourceType()}`,
          );

          const ressourcePerTurn = this.environment.handleStructureBonus(
            structure,
            index,
            this.firstIndexesByRessourceType[ressourceType]!,
          );

          acc[ressourceType] += ressourcePerTurn;
        }
        return acc;
      },
      { ...INITIAL_RESSOURCES },
    );

    return matrix;
  }

  public getName(): string {
    return this.name;
  }

  public getLevel(): number {
    return this.level;
  }

  public getMaxStructuresCount(): number {
    return this.maxStructuresCount;
  }

  public toString(): string {
    return `Settlement: ${this.name}, Level: ${this.level}, Max Structures: ${this.maxStructuresCount}`;
  }

  public addStructure(...structures: Structure[]): void {
    if (this.structures.length + structures.length > this.maxStructuresCount) {
      throw new Error("Cannot add more structures to the settlement.");
    }

    this.structures.push(...structures);
    this.updateFirstIndexesByRessourceType();
  }

  private updateFirstIndexesByRessourceType(): void {
    const ressourceTypes = this.structures.filter(
      (structure): structure is RessourceStructure =>
        structure instanceof RessourceStructure,
    );

    const uniqueRessourceTypes = Array.from(
      new Set(ressourceTypes.map((structure) => structure.getRessourceType())),
    );

    uniqueRessourceTypes.forEach((ressourceType) => {
      const firstIndex = this.structures.findIndex(
        (structure) =>
          structure instanceof RessourceStructure &&
          structure.getRessourceType() === ressourceType,
      );

      if (firstIndex !== -1) {
        this.firstIndexesByRessourceType[ressourceType] = firstIndex;
      } else {
        delete this.firstIndexesByRessourceType[ressourceType];
      }
    });
  }
}
