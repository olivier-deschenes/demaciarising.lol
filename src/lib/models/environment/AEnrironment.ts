import type { RessourceStructure } from "../structure/ARessourceStructure";

export abstract class Environment {
  private name: string;
  private isOnlyFirstStructure: boolean;

  constructor(name: string, isOnlyFirstStructure: boolean) {
    this.name = name;
    this.isOnlyFirstStructure = isOnlyFirstStructure;
  }

  protected abstract applyStructureBonus(turnGeneration: number): number;
  protected abstract isApplicableToStructure(
    structure: RessourceStructure,
  ): boolean;

  public getName(): string {
    return this.name;
  }

  public handleStructureBonus(
    structure: RessourceStructure,
    structureIndex: number,
    firstStructureIndexOfRessource: number,
  ): number {
    const turnGeneration = structure.getRessourcePerTurn();
    console.log(
      `Handling structure bonus for structure: ${structure.getName()} with turn generation: ${turnGeneration} at index ${structureIndex} || ${firstStructureIndexOfRessource}`,
    );

    if (
      !this.isApplicableToStructure(structure) ||
      (this.isOnlyFirstStructure &&
        structureIndex !== firstStructureIndexOfRessource)
    ) {
      return turnGeneration;
    }

    const bonusTurnGeneration = this.applyStructureBonus(turnGeneration);

    console.log(
      `Applied structure bonus for structure: ${structure.getName()} with original turn generation: ${turnGeneration} and bonus turn generation: ${bonusTurnGeneration}`,
    );

    return bonusTurnGeneration;
  }
}
