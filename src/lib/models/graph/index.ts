export class Graph<TNode extends object> {
  private adj = new Map<TNode, Set<TNode>>()

  addNode(n: TNode): void {
    if (!this.adj.has(n)) this.adj.set(n, new Set())
  }

  addNodes(...nodes: Array<TNode>): void {
    nodes.forEach((n) => this.addNode(n))
  }

  addEdge(a: TNode, b: TNode): void {
    this.addNode(a)
    this.addNode(b)
    this.adj.get(a)!.add(b)
    this.adj.get(b)!.add(a)
  }

  addEdges(mainNode: TNode, nodes: Array<TNode>): void {
    nodes.forEach((n) => this.addEdge(mainNode, n))
  }

  getNodes(): Array<TNode> {
    return [...this.adj.keys()]
  }

  getNeighbors(node: TNode): Array<TNode> {
    return [...(this.adj.get(node) ?? new Set())]
  }

  getEdges(): Array<{ source: TNode; target: TNode }> {
    const nodes = this.getNodes()
    const indexByNode = new Map(nodes.map((node, index) => [node, index] as const))

    const edges: Array<{ source: TNode; target: TNode }> = []

    this.adj.forEach((targets, source) => {
      const sourceIndex = indexByNode.get(source)

      if (sourceIndex === undefined) return

      targets.forEach((target) => {
        const targetIndex = indexByNode.get(target)

        if (targetIndex === undefined || sourceIndex >= targetIndex) return

        edges.push({ source, target })
      })
    })

    return edges
  }
}
