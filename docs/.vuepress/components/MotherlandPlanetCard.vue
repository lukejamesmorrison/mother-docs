<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

type Vector3 = {
  x: number
  y: number
  z: number
}

type Quaternion = Vector3 & {
  w: number
}

type OreAssignment = {
  voxel: string
  ore: string
  rarity: number
  depthMin: number
  depthMax: number
  sizeMin: number
  sizeMax: number
}

type PlanetOres = {
  slotCount: number
  defaultAssignments: string[]
  assignments: OreAssignment[]
}

type Planet = {
  id: string
  name: string
  hasAtmosphere: boolean
  surfaceGravity: number
  gravityFalloff: number
  radius: number
  atmosphereRadius: number
  minimumSurfaceRadius?: number
  maximumHillRadius?: number
  position?: Vector3
  orientation?: Quaternion
  ores?: PlanetOres
  lore: {
    description: string
  }
  imageUrl?: string
  relatedNames: string[]
}

type OreChartRow = {
  ore: string
  depthMin: number
  depthMax: number
  rarity: number
  sizeMin: number
  sizeMax: number
  slots: number
  widthNorm: number
}

const props = defineProps<{
  planet: Planet
}>()

const activeOreView = ref<'chart' | 'table'>('chart')

const ORE_COLORS: Record<string, string> = {
  Ice: '#b3ecff',
  Iron: '#f28e8c',
  Uranium: '#7e57c2',
  Cobalt: '#00bcd4',
  Nickel: '#ffc107',
  Silicon: '#bdbdbd',
  Silver: '#e0e0e0',
  Gold: '#ffeb3b',
  Platinum: '#fff59d',
  Magnesium: '#90caf9',
  Other: '#bcbcbc',
}

const radiusKm = computed(() => formatKm(props.planet.radius))
const atmosphereKm = computed(() => formatKm(props.planet.atmosphereRadius))
const minSurfaceRadiusKm = computed(() =>
  props.planet.minimumSurfaceRadius == null ? null : formatKm(props.planet.minimumSurfaceRadius),
)
const maxHillRadiusKm = computed(() =>
  props.planet.maximumHillRadius == null ? null : formatKm(props.planet.maximumHillRadius),
)
const atmosphereThicknessKm = computed(() => {
  if (!props.planet.hasAtmosphere) {
    return null
  }
  return formatKm(Math.max(props.planet.atmosphereRadius - props.planet.radius, 0))
})
const surfaceBandKm = computed(() => {
  if (props.planet.minimumSurfaceRadius == null || props.planet.maximumHillRadius == null) {
    return null
  }
  return formatKm(Math.max(props.planet.maximumHillRadius - props.planet.minimumSurfaceRadius, 0))
})
const positionDisplay = computed(() => {
  if (!props.planet.position) {
    return null
  }
  const { x, y, z } = props.planet.position
  return `${formatCoordinate(x)}, ${formatCoordinate(y)}, ${formatCoordinate(z)}`
})
const positionClipboardValue = computed(() => {
  if (!props.planet.position) {
    return null
  }
  const { x, y, z } = props.planet.position
  return `GPS:${props.planet.name}:${x}:${y}:${z}:#FFEAEB`
})
const positionCopied = ref(false)
let positionCopiedTimeout: ReturnType<typeof setTimeout> | null = null
const orientationDisplay = computed(() => {
  if (!props.planet.orientation) {
    return null
  }
  const { x, y, z, w } = props.planet.orientation
  return `(${formatUnitValue(x)}, ${formatUnitValue(y)}, ${formatUnitValue(z)}, ${formatUnitValue(w)})`
})
const gravityDisplay = computed(() => {
  const gravity = props.planet.surfaceGravity
  if (gravity >= 1000) {
    return `${(gravity / 10000).toFixed(2)} g`
  }
  return `${gravity.toFixed(2)} g`
})
const oreAssignments = computed(() => props.planet.ores?.assignments ?? [])
const hasOreAssignments = computed(() => oreAssignments.value.length > 0)
const oreSlotCount = computed(() => props.planet.ores?.slotCount ?? 0)
const oreAssignmentsSorted = computed(() => {
  return [...oreAssignments.value].sort((a, b) => {
    if (a.ore !== b.ore) {
      return a.ore.localeCompare(b.ore)
    }
    return a.depthMin - b.depthMin
  })
})
const defaultOreNames = computed(() => {
  if (!props.planet.ores?.defaultAssignments?.length) {
    return []
  }
  const oreByVoxel = new Map(oreAssignments.value.map((assignment) => [assignment.voxel, assignment.ore]))
  return props.planet.ores.defaultAssignments.map(
    (voxel) => oreByVoxel.get(voxel) ?? voxel.replace(/_\d+$/, ''),
  )
})

const oreChartRows = computed(() => {
  const aggregated = aggregateAssignments(oreAssignments.value)
  if (!aggregated.length) {
    return []
  }

  const metrics = aggregated.map((row) => Math.max(row.sizeMax, 0))
  const normalized = normalize(metrics)
  return aggregated.map((row, index) => ({
    ...row,
    widthNorm: normalized[index],
  }))
})

const depthRangeMax = computed(() => {
  if (!oreChartRows.value.length) {
    return 1
  }
  return Math.max(...oreChartRows.value.map((row) => row.depthMax)) + 10
})

const depthTicks = computed(() => {
  const tickCount = 5
  return Array.from({ length: tickCount + 1 }, (_, index) => {
    const depth = (depthRangeMax.value / tickCount) * index
    return {
      depth,
      label: `${Math.round(depth)} m`,
      top: `${(index / tickCount) * 100}%`,
    }
  })
})

const chartColumnsStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Math.max(oreChartRows.value.length, 1)}, minmax(42px, 1fr))`,
}))

function formatKm(value: number): string {
  return `${(value / 1000).toFixed(1)} km`
}

function formatCoordinate(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}

function formatUnitValue(value: number): string {
  return value.toFixed(3)
}

function formatRange(min: number, max: number): string {
  return `${min}-${max}`
}

function normalize(values: number[]): number[] {
  if (!values.length) {
    return []
  }
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (max <= min) {
    return values.map(() => 0.5)
  }
  return values.map((value) => (value - min) / (max - min))
}

function aggregateAssignments(assignments: OreAssignment[]): OreChartRow[] {
  const byOre = new Map<
    string,
    {
      ore: string
      depthMin: number
      depthMax: number
      rarity: number
      sizeMinSum: number
      sizeMaxSum: number
      slots: number
    }
  >()

  for (const assignment of assignments) {
    const ore = String(assignment.ore || assignment.voxel || 'Unknown').trim()
    if (!byOre.has(ore)) {
      byOre.set(ore, {
        ore,
        depthMin: assignment.depthMin,
        depthMax: assignment.depthMax,
        rarity: assignment.rarity,
        sizeMinSum: assignment.sizeMin,
        sizeMaxSum: assignment.sizeMax,
        slots: 1,
      })
      continue
    }

    const target = byOre.get(ore)!
    target.depthMin = Math.min(target.depthMin, assignment.depthMin)
    target.depthMax = Math.max(target.depthMax, assignment.depthMax)
    target.rarity += assignment.rarity
    target.sizeMinSum += assignment.sizeMin
    target.sizeMaxSum += assignment.sizeMax
    target.slots += 1
  }

  const rows: OreChartRow[] = []
  for (const aggregated of byOre.values()) {
    const divisor = Math.max(aggregated.slots, 1)
    rows.push({
      ore: aggregated.ore,
      depthMin: aggregated.depthMin,
      depthMax: aggregated.depthMax,
      rarity: aggregated.rarity,
      sizeMin: aggregated.sizeMinSum / divisor,
      sizeMax: aggregated.sizeMaxSum / divisor,
      slots: aggregated.slots,
      widthNorm: 0,
    })
  }

  rows.sort((a, b) => {
    const aMid = (a.depthMin + a.depthMax) / 2
    const bMid = (b.depthMin + b.depthMax) / 2
    return aMid - bMid
  })

  return rows
}

function oreColor(ore: string): string {
  return ORE_COLORS[ore] ?? '#bcbcbc'
}

function depthToTop(depth: number): string {
  const range = Math.max(depthRangeMax.value, 1)
  return `${(Math.max(depth, 0) / range) * 100}%`
}

function depthSpanPercent(depthMin: number, depthMax: number): string {
  const range = Math.max(depthRangeMax.value, 1)
  const span = Math.max(depthMax - depthMin, 2)
  return `${Math.max((span / range) * 100, 2)}%`
}

function triangleWidth(widthNorm: number): string {
  const min = 34
  const max = 82
  const width = min + widthNorm * (max - min)
  return `${width}%`
}

function formatDecimal(value: number): string {
  return value.toFixed(1)
}

async function copyPositionToClipboard() {
  if (!positionClipboardValue.value) {
    return
  }

  const text = positionClipboardValue.value
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.setAttribute('readonly', '')
    textArea.style.position = 'absolute'
    textArea.style.left = '-9999px'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  positionCopied.value = true
  if (positionCopiedTimeout) {
    clearTimeout(positionCopiedTimeout)
  }
  positionCopiedTimeout = setTimeout(() => {
    positionCopied.value = false
    positionCopiedTimeout = null
  }, 1200)
}

onBeforeUnmount(() => {
  if (positionCopiedTimeout) {
    clearTimeout(positionCopiedTimeout)
  }
})
</script>

<template>
  <article class="planet-card">
    <header class="planet-card__header">
      <div class="planet-card__header-main">
        <h3 class="planet-card__title">{{ planet.name }}</h3>
        <span class="planet-card__atmosphere" :class="{ 'is-void': !planet.hasAtmosphere }">
          {{ planet.hasAtmosphere ? 'Atmosphere' : 'No Atmosphere' }}
        </span>
      </div>
      <div v-if="positionDisplay" class="planet-card__header-sub">
        <button
          type="button"
          class="planet-card__position-button"
          :title="positionCopied ? 'Copied position' : 'Copy x,y,z coordinates'"
          @click="copyPositionToClipboard"
        >
          <span class="planet-card__position-label">Position:</span>
          <span class="planet-card__position-value">{{ positionDisplay }}</span>
          <span v-if="positionCopied" class="planet-card__position-copied">Copied</span>
        </button>
      </div>
    </header>

    <figure v-if="planet.imageUrl" class="planet-card__media">
      <img :src="planet.imageUrl" :alt="planet.name" loading="lazy" />
    </figure>

    <p class="planet-card__description">{{ planet.lore.description }}</p>


    <dl class="planet-card__stats">
      <div>
        <dt>Surface Radius</dt>
        <dd>{{ radiusKm }}</dd>
      </div>
      <div>
        <dt>Atmosphere Radius</dt>
        <dd>{{ atmosphereKm }}</dd>
      </div>
      <div v-if="atmosphereThicknessKm">
        <dt>Atmosphere Depth</dt>
        <dd>{{ atmosphereThicknessKm }}</dd>
      </div>
      <div>
        <dt>Surface Gravity</dt>
        <dd>{{ gravityDisplay }}</dd>
      </div>
    </dl>


    <dl class="planet-card__stats">
      <div>
        <dt>Falloff Power</dt>
        <dd>{{ planet.gravityFalloff }}</dd>
      </div>
      <div v-if="minSurfaceRadiusKm">
        <dt>Min Surface Radius</dt>
        <dd>{{ minSurfaceRadiusKm }}</dd>
      </div>
      <div v-if="maxHillRadiusKm">
        <dt>Max Hill Radius</dt>
        <dd>{{ maxHillRadiusKm }}</dd>
      </div>
      <div v-if="surfaceBandKm">
        <dt>Surface Band</dt>
        <dd>{{ surfaceBandKm }}</dd>
      </div>
    </dl>

    

    <section v-if="hasOreAssignments" class="planet-card__ores">
      <header class="planet-card__ores-header">
        <span class="planet-card__ores-title">Ore Deposits</span>
        <span class="planet-card__ores-slots">{{ oreSlotCount }} slots</span>
      </header>

      <div class="planet-card__ore-tabs" role="tablist" :aria-label="`Ore views for ${planet.name}`">
        <button
          type="button"
          class="planet-card__ore-tab"
          :class="{ 'is-active': activeOreView === 'chart' }"
          role="tab"
          :aria-selected="activeOreView === 'chart'"
          @click="activeOreView = 'chart'"
        >
          Chart
        </button>
        <button
          type="button"
          class="planet-card__ore-tab"
          :class="{ 'is-active': activeOreView === 'table' }"
          role="tab"
          :aria-selected="activeOreView === 'table'"
          @click="activeOreView = 'table'"
        >
          Table
        </button>
      </div>

      <div v-if="activeOreView === 'chart'" class="planet-card__ore-depth-chart" role="tabpanel">
        <div class="planet-card__depth-axis">
          <div
            v-for="tick in depthTicks"
            :key="`tick-${tick.depth}`"
            class="planet-card__depth-label"
            :style="{ top: tick.top }"
          >
            {{ tick.label }}
          </div>
        </div>

        <div class="planet-card__depth-plot">
          <div class="planet-card__depth-grid">
            <span
              v-for="tick in depthTicks"
              :key="`grid-${tick.depth}`"
              class="planet-card__depth-grid-line"
              :style="{ top: tick.top }"
            />
          </div>

          <div class="planet-card__depth-columns" :style="chartColumnsStyle">
            <div v-for="row in oreChartRows" :key="`${planet.id}-${row.ore}`" class="planet-card__depth-column">
              <div class="planet-card__depth-track">
                <div
                  class="planet-card__depth-triangle"
                  :style="{
                    top: depthToTop(row.depthMin),
                    height: depthSpanPercent(row.depthMin, row.depthMax),
                    width: triangleWidth(row.widthNorm),
                    backgroundColor: oreColor(row.ore),
                  }"
                  :title="`${row.ore}: ${formatRange(row.depthMin, row.depthMax)} m, rarity ${row.rarity}`"
                />
              </div>
              <div class="planet-card__depth-ore-label">{{ row.ore }}</div>
              <div class="planet-card__depth-ore-meta">{{ formatRange(row.depthMin, row.depthMax) }} m</div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="planet-card__ore-table-wrap" role="tabpanel">
        <table class="planet-card__ore-table">
          <thead>
            <tr>
              <th>Ore</th>
              <th>Voxel</th>
              <th>Depth (m)</th>
              <th>Rarity</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assignment in oreAssignmentsSorted" :key="`${planet.id}-${assignment.voxel}`">
              <td>
                <span class="planet-card__ore-swatch" :style="{ backgroundColor: oreColor(assignment.ore) }" />
                {{ assignment.ore }}
              </td>
              <td>{{ assignment.voxel }}</td>
              <td>{{ formatRange(assignment.depthMin, assignment.depthMax) }}</td>
              <td>{{ assignment.rarity }}</td>
              <td>{{ formatDecimal(assignment.sizeMin) }}-{{ formatDecimal(assignment.sizeMax) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-if="defaultOreNames.length" class="planet-card__ore-defaults">
        Default mix: {{ defaultOreNames.join(', ') }}
      </p>
    </section>

    <div v-if="orientationDisplay" class="planet-card__vectors">
      <div v-if="orientationDisplay" class="planet-card__vector-item">
        <span class="planet-card__vector-label">Orientation</span>
        <code>{{ orientationDisplay }}</code>
      </div>
    </div>

    <div v-if="planet.relatedNames.length" class="planet-card__related">
      <span class="planet-card__related-label">Related</span>
      <ul>
        <li v-for="relatedName in planet.relatedNames" :key="`${planet.id}-${relatedName}`">
          {{ relatedName }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.planet-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 1rem;
  background:
    radial-gradient(circle at top right, rgba(40, 130, 255, 0.16), transparent 40%),
    linear-gradient(165deg, rgba(8, 18, 32, 0.9), rgba(6, 12, 22, 0.96));
  color: rgba(245, 248, 255, 0.95);
  box-shadow: 0 12px 30px rgba(4, 8, 15, 0.26);
}

.planet-card__header {
  display: grid;
  row-gap: 0.18rem;
  margin-bottom: 0.85rem;
}

.planet-card__header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.planet-card__header-sub {
  min-width: 0;
}

.planet-card__title {
  margin: 0 !important;
  padding: 0 0 0.5rem 0;
  line-height: 1.12;
  font-size: 2rem;
  letter-spacing: 0.03em;
}

.planet-card__position-button {
  appearance: none;
  border: none;
  border-radius: 0;
  background: transparent;
  color: rgba(214, 231, 255, 0.92);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0 0 0.5rem 0;
  max-width: 100%;
  cursor: pointer;
  font-size: 1rem;
}

.planet-card__position-button:hover .planet-card__position-value {
  text-decoration: underline;
  text-decoration-color: rgba(176, 209, 250, 0.5);
}

.planet-card__position-value {
  font-size: 1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  color: rgba(235, 243, 255, 0.96);
  overflow: hidden;
  text-overflow: ellipsis;
}

.planet-card__position-label {
  font-size: 1rem;
  font-weight: 700;
  color: rgba(178, 207, 248, 0.86);
}

.planet-card__position-copied {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8ef7bf;
}

.planet-card__atmosphere {
  border: 1px solid rgba(133, 219, 175, 0.45);
  color: #9fffc6;
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.planet-card__atmosphere.is-void {
  border-color: rgba(250, 184, 118, 0.55);
  color: #ffd19f;
}

.planet-card__media {
  margin: 0 0 0.85rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(153, 196, 255, 0.35);
  background: #02060f;
}

.planet-card__media img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.planet-card__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 0 0 0.625rem 0;
}

.planet-card__stats div {
  background: rgba(12, 24, 42, 0.62);
  border: 1px solid rgba(135, 180, 242, 0.26);
  border-radius: 10px;
  padding: 0.55rem 0.65rem;
}

.planet-card__stats dt {
  font-size: 0.72rem;
  color: rgba(185, 211, 252, 0.84);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.2rem;
}

.planet-card__stats dd {
  margin: 0;
  font-weight: 700;
}

.planet-card__description {
  margin: 0.9rem 0 ;
  line-height: 1.5;
  color: rgba(224, 236, 255, 0.96);
}

.planet-card__ores {
  margin-top: 0.9rem;
  border: 1px solid rgba(145, 195, 255, 0.28);
  background: rgba(7, 19, 35, 0.86);
  border-radius: 12px;
  padding: 0.7rem;
}

.planet-card__ores-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.55rem;
}

.planet-card__ores-title {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(194, 221, 255, 0.9);
  font-weight: 700;
}

.planet-card__ores-slots {
  border: 1px solid rgba(147, 198, 255, 0.35);
  border-radius: 999px;
  font-size: 0.72rem;
  color: rgba(221, 236, 255, 0.9);
  padding: 0.12rem 0.5rem;
}

.planet-card__ore-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.planet-card__ore-tab {
  appearance: none;
  border: 1px solid rgba(133, 182, 245, 0.35);
  border-radius: 999px;
  background: rgba(8, 21, 39, 0.75);
  color: rgba(201, 225, 255, 0.92);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.22rem 0.7rem;
  cursor: pointer;
}

.planet-card__ore-tab.is-active {
  color: #07162a;
  background: linear-gradient(135deg, #8fd1ff, #c8e6ff);
  border-color: rgba(168, 210, 255, 0.9);
}

.planet-card__ore-depth-chart {
  display: grid;
  grid-template-columns: 4.2rem 1fr;
  gap: 0.45rem;
  min-height: 250px;
}

.planet-card__depth-axis {
  position: relative;
  min-height: 220px;
}

.planet-card__depth-label {
  position: absolute;
  right: 0.2rem;
  transform: translateY(-50%);
  font-size: 0.67rem;
  color: rgba(181, 209, 247, 0.82);
  font-variant-numeric: tabular-nums;
}

.planet-card__depth-plot {
  position: relative;
  min-height: 220px;
  border: 1px solid rgba(132, 182, 245, 0.24);
  border-radius: 10px;
  background: rgba(8, 21, 39, 0.72);
  padding: 0.35rem 0.45rem;
}

.planet-card__depth-grid {
  position: absolute;
  inset: 0.35rem 0.45rem;
}

.planet-card__depth-grid-line {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px dashed rgba(145, 194, 255, 0.18);
  transform: translateY(-0.5px);
}

.planet-card__depth-columns {
  position: relative;
  z-index: 1;
  min-height: 220px;
  display: grid;
  gap: 0.35rem;
}

.planet-card__depth-column {
  display: grid;
  grid-template-rows: 1fr auto auto;
  gap: 0.2rem;
  min-width: 0;
}

.planet-card__depth-track {
  position: relative;
  min-height: 190px;
}

.planet-card__depth-triangle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  border: 1px solid rgba(6, 10, 18, 0.55);
  filter: drop-shadow(0 0 6px rgba(10, 19, 31, 0.42));
}

.planet-card__depth-ore-label {
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  color: rgba(226, 238, 255, 0.95);
  overflow: hidden;
  text-overflow: ellipsis;
}

.planet-card__depth-ore-meta {
  text-align: center;
  font-size: 0.67rem;
  color: rgba(189, 214, 245, 0.86);
}

.planet-card__ore-table-wrap {
  display: block;
  width: 100%;
  overflow-x: auto;
}

.planet-card__ore-table {
  display: table;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 0.78rem;
}

.planet-card__ore-table th,
.planet-card__ore-table td {
  border-bottom: 1px solid rgba(126, 176, 239, 0.2);
  padding: 0.4rem 0.35rem;
  text-align: left;
  white-space: normal;
  overflow-wrap: anywhere;
}

.planet-card__ore-table th {
  color: rgba(183, 210, 246, 0.86);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 0.67rem;
}

.planet-card__ore-table td {
  color: rgba(222, 236, 255, 0.94);
  font-variant-numeric: tabular-nums;
}

.planet-card__ore-swatch {
  display: inline-block;
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 999px;
  margin-right: 0.38rem;
  border: 1px solid rgba(4, 8, 14, 0.45);
}

.planet-card__ore-defaults {
  margin: 0.55rem 0 0;
  font-size: 0.78rem;
  color: rgba(191, 216, 247, 0.88);
}

.planet-card__vectors {
  margin-top: 0.8rem;
  display: grid;
  gap: 0.5rem;
}

.planet-card__vector-item {
  border: 1px solid rgba(129, 178, 247, 0.3);
  background: rgba(6, 16, 29, 0.82);
  border-radius: 10px;
  padding: 0.45rem 0.6rem;
}

.planet-card__vector-label {
  display: block;
  font-size: 0.72rem;
  color: rgba(176, 206, 247, 0.85);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.planet-card__vector-item code {
  font-size: 0.84rem;
  color: rgba(233, 242, 255, 0.95);
}

.planet-card__related {
  margin-top: 0.85rem;
}

.planet-card__related-label {
  display: inline-block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(188, 217, 255, 0.85);
  margin-bottom: 0.35rem;
}

.planet-card__related ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.planet-card__related li {
  border: 1px solid rgba(146, 195, 255, 0.3);
  background: rgba(12, 28, 48, 0.8);
  border-radius: 999px;
  font-size: 0.82rem;
  padding: 0.2rem 0.55rem;
}

@media (min-width: 860px) {
  .planet-card {
    padding: 1.2rem;
  }
}

@media (max-width: 640px) {
  .planet-card__header {
    row-gap: 0.24rem;
  }

  .planet-card__header-main {
    align-items: flex-start;
  }

  .planet-card__ore-depth-chart {
    grid-template-columns: 1fr;
  }

  .planet-card__depth-axis {
    display: none;
  }
}
</style>
