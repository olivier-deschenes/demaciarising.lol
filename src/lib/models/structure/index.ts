import { RessourceStructure } from "./ARessourceStructure";
import { Structure } from "./AStructure";

export class LumberyardStructure extends RessourceStructure {
  constructor(level: number) {
    super("Lumberyard", level, "WOOD", [15, 30, 75]);
  }
}

export class FarmStructure extends RessourceStructure {
  constructor(level: number) {
    super("Farm", level, "FOOD", [1, 2, 3]);
  }
}

export class PetriciteMillStructure extends RessourceStructure {
  constructor(level: number) {
    super("Petricite Mill", level, "PETRICITE", [1]);
  }
}

export class QuarryStructure extends RessourceStructure {
  constructor(level: number) {
    super("Quarry", level, "STONE", [10, 20, 50]);
  }
}

export class ForgeStructure extends RessourceStructure {
  constructor(level: number) {
    super("Forge", level, "METAL", [5, 10, 25]);
  }
}

export class BarracksStructure extends Structure {
  constructor(level: number) {
    super("Barracks", level);
  }
}

export class QuartermasterStructure extends Structure {
  constructor(level: number) {
    super("Quarter Master", level);
  }
}

export class MarketplaceStructure extends Structure {
  constructor(level: number) {
    super("Marketplace", level);
  }
}

export class MilitiaStructure extends Structure {
  constructor(level: number) {
    super("Militia", level);
  }
}

export class WatchtowerStructure extends Structure {
  constructor(level: number) {
    super("Watchtower", level);
  }
}

export class DurandsWorkshopStructure extends Structure {
  constructor(level: number) {
    super("Durand's Workshop", level);
  }
}

export class ShrineOfTheVeiledLadyStructure extends Structure {
  constructor(level: number) {
    super("Shrine of the Veiled Lady", level);
  }
}

export class AcademyStructure extends Structure {
  constructor(level: number) {
    super("Academy", level);
  }
}
