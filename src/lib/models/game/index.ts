import { Graph } from '../graph'
import { INITIAL_RESSOURCES, mergeRessourceMatrices } from '../ressource'
import type { RessourceMatrix } from '../ressource'
import type { Settlement } from '../settlement/ASettlement'

export class Game {
  private graph: Graph<Settlement>

  constructor() {
    this.graph = new Graph()
  }

  public getGraph() {
    return this.graph
  }

  public calculateTotalRessourcePerTurn(): RessourceMatrix {
    return this.graph.getNodes().reduce(
      (acc, settlement) => {
        const settlementRessources = settlement.calculateTotalRessourcePerTurn()

        return mergeRessourceMatrices(acc, settlementRessources)
      },
      { ...INITIAL_RESSOURCES },
    )
  }
}
