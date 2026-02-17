import { FarmStructure, ForgeStructure, QuarryStructure } from "../structure";
import type { RessourceStructure } from "../structure/ARessourceStructure";
import { Environment } from "./AEnrironment";

export class Heartland extends Environment {
  constructor() {
    super("Heartland", true);
  }

  public isApplicableToStructure(structure: RessourceStructure): boolean {
    return structure instanceof FarmStructure;
  }

  public applyStructureBonus(turnGeneration: number): number {
    return turnGeneration + 1;
  }
}

export class Mountain extends Environment {
  constructor() {
    super("Mountain", true);
  }

  public isApplicableToStructure(structure: RessourceStructure): boolean {
    return structure instanceof QuarryStructure;
  }

  public applyStructureBonus(turnGeneration: number): number {
    return turnGeneration * 2; // + 100% bonus
  }
}

export class Capital extends Environment {
  constructor() {
    super("Capital", false);
  }

  public isApplicableToStructure(structure: RessourceStructure): boolean {
    return false;
  }

  public applyStructureBonus(turnGeneration: number): number {
    return turnGeneration;
  }
}

export class Border extends Environment {
  constructor() {
    super("Border", true);
  }

  public isApplicableToStructure(structure: RessourceStructure): boolean {
    return structure instanceof ForgeStructure;
  }

  public applyStructureBonus(turnGeneration: number): number {
    return turnGeneration * 2; // + 100% bonus
  }
}
