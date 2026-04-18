<script setup>
import { ref, computed } from 'vue'
import PoweredByMotherItem from '../../components/PoweredByMother/PoweredByMotherItem.vue'
import PoweredByMotherGrids from '../../components/PoweredByMother/PoweredByMotherGrids.js'
import PoweredByMotherScriptItem from '../../components/PoweredByMother/PoweredByMotherScriptItem.vue'
import PoweredByMotherScripts from '../../components/PoweredByMother/PoweredByMotherScripts.js'

const activeTab = ref('grids')
const selectedScripts = ref([])

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
  if (selectedScripts.value.length === 0) return PoweredByMotherGrids
  return PoweredByMotherGrids.filter(grid => 
    grid.scripts && grid.scripts.some(s => selectedScripts.value.includes(s))
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
</style>

# Powered By Mother

This section showcases scripts and grids that are powered by Mother Core. If you are using Mother OS, show it off by completing this [short questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSfIK4i_UdRxobiCem7IqTA4Fc9fTmyq5Tg_vzdGWCdtuOOXYg/viewform?usp=dialog).

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
  <div class="scripts-container">
    <PoweredByMotherScriptItem v-for="(script, index) in PoweredByMotherScripts" :key="index" :item="script"/>
  </div>
</div>

<div v-show="activeTab === 'grids'">
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
</div>

<!-- <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfIK4i_UdRxobiCem7IqTA4Fc9fTmyq5Tg_vzdGWCdtuOOXYg/viewform?embedded=true" height="1225" frameborder="0" marginheight="0" marginwidth="0" style="width: 100%">Loading…</iframe> -->
