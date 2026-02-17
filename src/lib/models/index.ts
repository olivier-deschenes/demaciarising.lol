import { Game } from '@/lib/models/game'
import {
  BrookhollowSettlement,
  CloudfieldSettlement,
  EvenmoorSettlement,
  HighSilvermereSettlement,
  JandelleSettlement,
  MeltridgeSettlement,
  PinaraSettlement,
  TerbisiaSettlement,
  TheGreatCityOfDemaciaSettlement,
  TylburneSettlement,
  UwendaleSettlement,
  VaskasiaSettlement,
} from '@/lib/models/settlement'
import {
  FarmStructure,
  ForgeStructure,
  LumberyardStructure,
  QuartermasterStructure,
} from '@/lib/models/structure'

const game = new Game()
const graph = game.getGraph()

const Vaskasia = new VaskasiaSettlement(3)
const Brookhollow = new BrookhollowSettlement(3)
const Evenmoor = new EvenmoorSettlement(3)
const Terbisia = new TerbisiaSettlement(3)
const Tylburne = new TylburneSettlement(3)
const Jandelle = new JandelleSettlement(3)
const TheGreatCityOfDemacia = new TheGreatCityOfDemaciaSettlement(3)
const Cloudfield = new CloudfieldSettlement(3)
const Meltridge = new MeltridgeSettlement(3)
const Uwendale = new UwendaleSettlement(3)
const HighSilvermere = new HighSilvermereSettlement(3)
const Pinara = new PinaraSettlement(3)

graph.addNodes(
  Vaskasia,
  Brookhollow,
  Evenmoor,
  Terbisia,
  Tylburne,
  Jandelle,
  TheGreatCityOfDemacia,
  Cloudfield,
  Meltridge,
  Uwendale,
  HighSilvermere,
  Pinara,
)

graph.addEdges(Vaskasia, [Brookhollow, Evenmoor])
graph.addEdges(Brookhollow, [Terbisia, Tylburne, Evenmoor])
graph.addEdges(Tylburne, [Jandelle, TheGreatCityOfDemacia])
graph.addEdges(TheGreatCityOfDemacia, [HighSilvermere])
graph.addEdges(Jandelle, [HighSilvermere, Cloudfield, Meltridge])
graph.addEdges(HighSilvermere, [Pinara, Uwendale])
graph.addEdges(Meltridge, [Uwendale])

Vaskasia.addStructure(
  new LumberyardStructure(2),
  new LumberyardStructure(2),
  new ForgeStructure(2),
  new QuartermasterStructure(1),
  new FarmStructure(1),
)

export { game, graph }
