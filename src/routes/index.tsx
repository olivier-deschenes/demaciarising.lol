import { createFileRoute } from '@tanstack/react-router'

import { SettlementGraph } from '@/components/settlement-graph'
import { graph } from '@/lib/models'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="mx-auto max-w-[1400px] space-y-3 px-4 py-6">
      <h1 className="text-2xl font-semibold tracking-tight">Demacia Settlement Graph</h1>
      <p className="text-sm text-muted-foreground">
        Settlements are rendered as custom nodes with their structures.
      </p>
      <SettlementGraph graph={graph} />
    </main>
  )
}
