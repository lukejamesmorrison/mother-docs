<script setup>
import { ref, computed } from 'vue'
import PoweredByMotherItem from '../../components/PoweredByMother/PoweredByMotherItem.vue'
import PoweredByMotherGrids from '../../components/PoweredByMother/PoweredByMotherGrids.js'
import PoweredByMotherScriptItem from '../../components/PoweredByMother/PoweredByMotherScriptItem.vue'
import PoweredByMotherScripts from '../../components/PoweredByMother/PoweredByMotherScripts.js'
import FeaturedCarousel from '../../components/PoweredByMother/FeaturedCarousel.vue'

const activeTab = ref('grids')
const selectedScripts = ref([])
const gridSearch = ref('')
const scriptSearch = ref('')

const allScripts = computed(() => {
  const scripts = new Set()
  PoweredByMotherGrids.forEach(grid => {
    if (grid.scripts) {
      grid.scripts.forEach(s => scripts.add(s))
    }
  })
  return Array.from(scripts).sort()
})

const filteredGrids = computed(() => {
  let results = PoweredByMotherGrids
  if (selectedScripts.value.length > 0) {
    results = results.filter(grid =>
      grid.scripts && grid.scripts.some(s => selectedScripts.value.includes(s))
    )
  }
  const q = gridSearch.value.trim().toLowerCase()
  if (q) {
    results = results.filter(grid =>
      grid.name.toLowerCase().includes(q) ||
      grid.author.toLowerCase().includes(q) ||
      (grid.description && grid.description.toLowerCase().includes(q)) ||
      (grid.scripts && grid.scripts.some(s => s.toLowerCase().includes(q)))
    )
  }
  return results
})

const filteredScripts = computed(() => {
  const q = scriptSearch.value.trim().toLowerCase()
  if (!q) return PoweredByMotherScripts
  return PoweredByMotherScripts.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.author.toLowerCase().includes(q) ||
    (s.description && s.description.toLowerCase().includes(q)) ||
    (s.tags && s.tags.some(t => t.toLowerCase().includes(q)))
  )
})

function toggleScript(script) {
  const index = selectedScripts.value.indexOf(script)
  if (index === -1) {
    selectedScripts.value.push(script)
  } else {
    selectedScripts.value.splice(index, 1)
  }
}
</script>

<style>
.powered-by-mother-page .vp-content {
  max-width: 100% !important;
  padding: 0 2rem;
}

.tabs-container {
  display: flex;
  gap: 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tab-btn:hover {
  color: var(--vp-c-text-1);
}

.tab-btn.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
}

.filter-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.filter-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.grids-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grids-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

.scripts-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .scripts-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

.search-container {
  position: relative;
  margin-bottom: 1.25rem;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: var(--vp-c-text-3);
  pointer-events: none;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.search-input:focus {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}

.search-empty {
  padding: 2rem 0;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.95rem;
}
</style>

# Powered By Mother

This section showcases scripts and grids that are powered by Mother Core. If you are using Mother OS, show it off by completing this [short questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSfIK4i_UdRxobiCem7IqTA4Fc9fTmyq5Tg_vzdGWCdtuOOXYg/viewform?usp=dialog).

## Featured

<FeaturedCarousel :items="PoweredByMotherGrids" :autoplay="true" :interval="7000" />

<div class="tabs-container">
  <button 
    :class="['tab-btn', { active: activeTab === 'scripts' }]"
    @click="activeTab = 'scripts'"
  >
    Scripts
  </button>
  <button 
    :class="['tab-btn', { active: activeTab === 'grids' }]"
    @click="activeTab = 'grids'"
  >
    Grids
  </button>
</div>

<div v-show="activeTab === 'scripts'">
  <div class="search-container">
    <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    <input
      v-model="scriptSearch"
      class="search-input"
      type="search"
      placeholder="Search scripts by name, author, or tag…"
      aria-label="Search scripts"
    />
  </div>
  <div class="scripts-container">
    <PoweredByMotherScriptItem v-for="(script, index) in filteredScripts" :key="index" :item="script"/>
  </div>
  <p v-if="filteredScripts.length === 0" class="search-empty">No scripts match your search.</p>
</div>

<div v-show="activeTab === 'grids'">
  <div class="search-container">
    <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    <input
      v-model="gridSearch"
      class="search-input"
      type="search"
      placeholder="Search grids by name, author, or script…"
      aria-label="Search grids"
    />
  </div>
  <div class="filter-container">
    <button 
      v-for="script in allScripts" 
      :key="script"
      :class="['filter-btn', { active: selectedScripts.includes(script) }]"
      @click="toggleScript(script)"
    >
      {{ script }}
    </button>
  </div>
  <div class="grids-container">
    <PoweredByMotherItem v-for="(grid, index) in filteredGrids" :key="index" :item="grid"/>
  </div>
  <p v-if="filteredGrids.length === 0" class="search-empty">No grids match your search.</p>
</div>

<!-- <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfIK4i_UdRxobiCem7IqTA4Fc9fTmyq5Tg_vzdGWCdtuOOXYg/viewform?embedded=true" height="1225" frameborder="0" marginheight="0" marginwidth="0" style="width: 100%">Loading…</iframe> -->
