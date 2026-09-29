<script setup lang="ts">
import { computed } from 'vue'
import worldData from '@source/Motherland/world_export/world.json'
import MotherlandPlanetCard from '@source/.vuepress/components/MotherlandPlanetCard.vue'

const imageModules = import.meta.glob('@source/Motherland/world_export/images/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const imageByFileName = Object.entries(imageModules).reduce<Record<string, string>>((acc, [path, url]) => {
  const fileName = path.split('/').pop()
  if (fileName) {
    acc[fileName] = url
  }
  return acc
}, {})

const entitiesById = new Map<string, string>([
  ...worldData.planets.map((planet) => [planet.id, planet.name]),
  ...worldData.factions.map((faction) => [faction.id, faction.name]),
])

const planets = computed(() =>
  worldData.planets
    .map((planet) => {
      const primaryImage = planet.lore.images?.[0]
      return {
        ...planet,
        imageUrl: primaryImage ? imageByFileName[primaryImage] : undefined,
        relatedNames: (planet.lore.relatedEntities ?? []).map(
          (entityId) => entitiesById.get(entityId) ?? entityId,
        ),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })),
)

const planetsWithAnchors = computed(() =>
  planets.value.map((planet) => ({
    ...planet,
    anchor: `planet-${slugify(planet.name)}`,
  })),
)

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
</script>


# Motherland

<!-- ![alt text](assets/WOT.png)

==Map Goes Here== -->

<!-- ## Directory
- [Motherland](#motherland)
  - [Directory](#directory)
  - [Briefing](#briefing)
  - [Intel](#intel)
  - [Bulletin](#bulletin)
  - [Motherland Creations Database](#motherland-creations-database) -->

[[toc]]


## Briefing
Greetings loyal Empire citizens.

This System has been identified for expansion of The Empire. You have been selected for your distinguished service, interminable ingenuity, and collaborative creation skills.

The System is comprised of seven planets in orbit around the black hole Tarkin 61. Each planet contains limited resources, of which all are desireable.

With your superior capability to automate, coordinate and communicate, combined with your dexterous little hands we anticipate minimal obstruction to The Empire's growth. 

Based on reconnaisence information, you will deploy by rover to establish initial footing on Tessara, A class M planet with atmospheric conditions suited to your biological needs. Resources required to get off planet will be sparse, requiring economic and infrastructural cooperation. Primitive trade networks are already established to leverage and conquer. Initial hostile contact should be scattered and pose minimal threat. 

Your mission is to colonize The System via Tessara, establish a permanent communication network, and supply precious mineral from Infernus into The Empire's supply chain.  You are authorized to engage hostile threats.

The Empire must grow.

**Mother**<br>
Stardate 221:33443-2764

<!-- ## Star **Map**

![starmap](assets/solar-system-map-1.png) -->

<!-- ## Intel -->

<!-- ## Factions -->

## Planets

<nav class="motherland-planets-toc" aria-label="Planets table of contents">
  <a
    v-for="planet in planetsWithAnchors"
    :key="`toc-${planet.id}`"
    class="motherland-planets-toc__item"
    :href="`#${planet.anchor}`"
  >
    {{ planet.name }}
  </a>
</nav>

<div class="motherland-planets-grid">
  <section
    v-for="planet in planetsWithAnchors"
    :key="planet.id"
    :id="planet.anchor"
    class="motherland-planet-section"
  >
    <MotherlandPlanetCard :planet="planet" />
  </section>
</div>

<style scoped>
.motherland-planets-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1rem 0;
}

.motherland-planets-toc__item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.2;
  text-decoration: none !important;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

.motherland-planets-toc__item:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.motherland-planets-grid {
  display: grid;
  gap: 1.25rem;
}

.motherland-planet-section {
  scroll-margin-top: 5rem;
}
</style>


<!-- ## Bulletin -->
<!-- ![alt text](assets/charlie-day-meme.avif)
==Current events update page== -->


## Creations Database

[Powered By Mother](../PoweredByMother.md)