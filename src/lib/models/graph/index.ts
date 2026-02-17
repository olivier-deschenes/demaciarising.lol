export class Graph<N extends object> {
  private adj = new Map<N, Set<N>>();

  addNode(n: N): void {
    if (!this.adj.has(n)) this.adj.set(n, new Set());
  }

  addNodes(...nodes: N[]): void {
    nodes.forEach((n) => this.addNode(n));
  }

  addEdge(a: N, b: N): void {
    this.addNode(a);
    this.addNode(b);
    this.adj.get(a)!.add(b);
    this.adj.get(b)!.add(a);
  }

  addEdges(mainNode: N, nodes: N[]): void {
    nodes.forEach((n) => this.addEdge(mainNode, n));
  }

  getNodes(): N[] {
    return [...this.adj.keys()];
  }
}
