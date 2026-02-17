import { Border, Capital, Heartland, Mountain } from "../environment";
import { Settlement } from "./ASettlement";

export class VaskasiaSettlement extends Settlement {
  constructor(level: number) {
    super("Vaskasia", level, new Heartland());
  }
}

export class EvenmoorSettlement extends Settlement {
  constructor(level: number) {
    super("Evenmoor", level, new Mountain());
  }
}

export class BrookhollowSettlement extends Settlement {
  constructor(level: number) {
    super("Brookhollow", level, new Heartland());
  }
}

export class TerbisiaSettlement extends Settlement {
  constructor(level: number) {
    super("Terbisia", level, new Border());
  }
}

export class TylburneSettlement extends Settlement {
  constructor(level: number) {
    super("Tylburne", level, new Heartland());
  }
}

export class TheGreatCityOfDemaciaSettlement extends Settlement {
  constructor(level: number) {
    super("The Great City of Demacia", level, new Capital());
  }
}

export class JandelleSettlement extends Settlement {
  constructor(level: number) {
    super("Jandelle", level, new Heartland());
  }
}

export class CloudfieldSettlement extends Settlement {
  constructor(level: number) {
    super("Cloudfield", level, new Border());
  }
}

export class MeltridgeSettlement extends Settlement {
  constructor(level: number) {
    super("Meltridge", level, new Border());
  }
}

export class UwendaleSettlement extends Settlement {
  constructor(level: number) {
    super("Uwendale", level, new Mountain());
  }
}

export class HighSilvermereSettlement extends Settlement {
  constructor(level: number) {
    super("High Silvermere", level, new Mountain());
  }
}

export class PinaraSettlement extends Settlement {
  constructor(level: number) {
    super("Pinara", level, new Mountain());
  }
}
