import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Graph } from '@/lib/models/graph'
import type { Settlement } from '@/lib/models/settlement/ASettlement'

const NODE_WIDTH = 260
const NODE_HEADER_HEIGHT = 50
const STRUCTURE_ROW_HEIGHT = 24
const MIN_ZOOM = 0.35
const MAX_ZOOM = 2.5

type Viewport = {
  x: number
  y: number
  zoom: number
}

type PositionedNode = {
  settlement: Settlement
  x: number
  y: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const getNodeHeight = (structuresCount: number) =>
  NODE_HEADER_HEIGHT + 12 + Math.max(1, structuresCount) * STRUCTURE_ROW_HEIGHT

export function SettlementGraph({ graph }: { graph: Graph<Settlement> }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<{ pointerId: number; x: number; y: number } | null>(
    null,
  )

  const [isDragging, setIsDragging] = useState(false)
  const [viewport, setViewport] = useState<Viewport>({
    x: 0,
    y: 0,
    zoom: 1,
  })

  const centerViewport = useCallback((zoom = 1) => {
    const container = containerRef.current

    if (!container) return

    setViewport({
      x: container.clientWidth / 2,
      y: container.clientHeight / 2,
      zoom,
    })
  }, [])

  useEffect(() => {
    centerViewport()
  }, [centerViewport])

  const positionedNodes = useMemo<Array<PositionedNode>>(() => {
    const settlements = graph.getNodes()

    if (settlements.length === 0) return []

    if (settlements.length === 1) {
      return [{ settlement: settlements[0], x: 0, y: 0 }]
    }

    const radius = Math.max(320, settlements.length * 46)

    return settlements.map((settlement, index) => {
      const angle = (2 * Math.PI * index) / settlements.length

      return {
        settlement,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      }
    })
  }, [graph])

  const nodeBySettlement = useMemo(
    () =>
      new Map(
        positionedNodes.map((node) => [node.settlement, node] as const),
      ),
    [positionedNodes],
  )

  const edges = useMemo(
    () =>
      graph.getEdges().flatMap((edge) => {
        const source = nodeBySettlement.get(edge.source)
        const target = nodeBySettlement.get(edge.target)

        if (!source || !target) return []

        return [{ source, target }]
      }),
    [graph, nodeBySettlement],
  )

  const zoomFromPoint = useCallback(
    (factor: number, origin?: { x: number; y: number }) => {
      setViewport((current) => {
        const nextZoom = clamp(current.zoom * factor, MIN_ZOOM, MAX_ZOOM)

        if (!origin || nextZoom === current.zoom) {
          return { ...current, zoom: nextZoom }
        }

        const ratio = nextZoom / current.zoom

        return {
          zoom: nextZoom,
          x: origin.x - (origin.x - current.x) * ratio,
          y: origin.y - (origin.y - current.y) * ratio,
        }
      })
    },
    [],
  )

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()

    const container = containerRef.current

    if (!container) return

    const rect = container.getBoundingClientRect()
    const origin = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    zoomFromPoint(event.deltaY > 0 ? 0.9 : 1.1, origin)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    dragStateRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    }

    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current

    if (!dragState || dragState.pointerId !== event.pointerId) return

    const deltaX = event.clientX - dragState.x
    const deltaY = event.clientY - dragState.y

    dragStateRef.current = {
      ...dragState,
      x: event.clientX,
      y: event.clientY,
    }

    setViewport((current) => ({
      ...current,
      x: current.x + deltaX,
      y: current.y + deltaY,
    }))
  }

  const stopDragging = () => {
    dragStateRef.current = null
    setIsDragging(false)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) return

    event.currentTarget.releasePointerCapture(event.pointerId)
    stopDragging()
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Wheel to zoom, drag to pan.</p>
        <p>Zoom: {(viewport.zoom * 100).toFixed(0)}%</p>
      </div>

      <div
        ref={containerRef}
        className={`relative h-[78vh] w-full overflow-hidden rounded-xl border bg-background ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={stopDragging}
      >
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button
            className="rounded-md border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
            onClick={() => zoomFromPoint(1.2)}
            type="button"
          >
            +
          </button>
          <button
            className="rounded-md border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
            onClick={() => zoomFromPoint(0.85)}
            type="button"
          >
            -
          </button>
          <button
            className="rounded-md border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
            onClick={() => centerViewport(1)}
            type="button"
          >
            Reset
          </button>
        </div>

        <svg className="h-full w-full select-none">
          <g transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.zoom})`}>
            {edges.map((edge) => (
              <line
                key={`${edge.source.settlement.getName()}-${edge.target.settlement.getName()}`}
                x1={edge.source.x}
                x2={edge.target.x}
                y1={edge.source.y}
                y2={edge.target.y}
                stroke="var(--border)"
                strokeWidth={2}
              />
            ))}

            {positionedNodes.map((node) => (
              <SettlementNode
                key={node.settlement.getName()}
                settlement={node.settlement}
                x={node.x}
                y={node.y}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}

function SettlementNode({
  settlement,
  x,
  y,
}: {
  settlement: Settlement
  x: number
  y: number
}) {
  const structures = settlement.getStructures()
  const structureRows =
    structures.length === 0
      ? ['No structures']
      : structures.map(
          (structure) => `${structure.getName()} (Level ${structure.getLevel()})`,
        )
  const nodeHeight = getNodeHeight(structureRows.length)

  return (
    <g transform={`translate(${x - NODE_WIDTH / 2} ${y - nodeHeight / 2})`}>
      <rect
        fill="var(--card)"
        height={nodeHeight}
        rx={16}
        stroke="var(--border)"
        strokeWidth={2}
        width={NODE_WIDTH}
      />
      <rect fill="var(--secondary)" height={NODE_HEADER_HEIGHT} rx={16} width={NODE_WIDTH} />
      <rect
        fill="var(--secondary)"
        height={10}
        rx={0}
        width={NODE_WIDTH}
        y={NODE_HEADER_HEIGHT - 10}
      />

      <text
        fill="var(--secondary-foreground)"
        fontFamily="Public Sans, sans-serif"
        fontSize={14}
        fontWeight={700}
        x={14}
        y={23}
      >
        {settlement.getName()}
      </text>
      <text
        fill="var(--muted-foreground)"
        fontFamily="Public Sans, sans-serif"
        fontSize={11}
        x={14}
        y={39}
      >
        Level {settlement.getLevel()} settlement
      </text>

      {structureRows.map((structureName, index) => (
        <StructureRow
          key={`${settlement.getName()}-${structureName}-${index}`}
          label={structureName}
          y={NODE_HEADER_HEIGHT + 8 + index * STRUCTURE_ROW_HEIGHT}
        />
      ))}
    </g>
  )
}

function StructureRow({ label, y }: { label: string; y: number }) {
  return (
    <g transform={`translate(12 ${y})`}>
      <rect
        fill="var(--muted)"
        height={18}
        rx={9}
        stroke="var(--border)"
        strokeWidth={1}
        width={NODE_WIDTH - 24}
      />
      <text
        fill="var(--foreground)"
        fontFamily="Public Sans, sans-serif"
        fontSize={11}
        x={10}
        y={12.5}
      >
        {label}
      </text>
    </g>
  )
}
