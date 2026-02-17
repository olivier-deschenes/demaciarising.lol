import type { RessourceType } from "../ressource";
import { Structure } from "./AStructure";

export abstract class RessourceStructure extends Structure {
  protected ressourceType: RessourceType;
  protected ressourceProductionMatrix: number[];

  constructor(
    name: string,
    level: number,
    ressourceType: RessourceType,
    ressourceProductionMatrix: number[],
  ) {
    super(name, level);

    this.ressourceType = ressourceType;
    this.ressourceProductionMatrix = ressourceProductionMatrix;
  }

  public getRessourceType(): RessourceType {
    return this.ressourceType;
  }

  public getRessourceProductionMatrix(): number[] {
    return this.ressourceProductionMatrix;
  }

  public getRessourcePerTurn(): number {
    return this.ressourceProductionMatrix[this.level - 1]!;
  }

  public override toString(): string {
    return (
      super.toString() +
      `, Ressource Per Turn: ${this.ressourceProductionMatrix[this.level - 1]}`
    );
  }
}
