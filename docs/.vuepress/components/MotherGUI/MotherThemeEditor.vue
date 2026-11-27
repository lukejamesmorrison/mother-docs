<script setup>
import { computed, reactive, ref } from 'vue'

const roles = [
  { key: 'primary', color: '#C20000', description: 'Dial needles, action indicators, and progress fills' },
  { key: 'accent', color: '#B59336', description: 'Navigation and limit markers' },
  { key: 'text', color: '#FFFFFF', description: 'Primary text and logo outline' },
  { key: 'bg', color: '#000000', description: 'Full-screen background' },
  { key: 'selection', color: '#801919', description: 'Selected menu row background' },
  { key: 'selection-text', color: '#FFFFFF', description: 'Selected menu row text; inherits text when omitted' },
  { key: 'success', color: '#00C850', description: 'Healthy, unlocked, and active states' },
  { key: 'warning', color: '#B59336', description: 'Caution states and warning notifications' },
  { key: 'danger', color: '#DC3232', description: 'Locked states, faults, and error notifications' },
]

const presets = [
  { name: 'Mother', colors: Object.fromEntries(roles.map(role => [role.key, role.color])) },
  { name: 'Ocean', colors: {
    primary: '#29B6F6', accent: '#80DEEA', text: '#E8F7FF', bg: '#071824',
    selection: '#145477', 'selection-text': '#FFFFFF', success: '#55D69E',
    warning: '#F6C453', danger: '#FF6B6B',
  } },
  { name: 'Forest', colors: {
    primary: '#8DCE68', accent: '#D5C679', text: '#EDF5E7', bg: '#101C12',
    selection: '#365D36', 'selection-text': '#FFFFFF', success: '#6EDD8C',
    warning: '#E9BD5F', danger: '#F17670',
  } },
  { name: 'Amber', colors: {
    primary: '#FFAD33', accent: '#FFCE73', text: '#FFE5B4', bg: '#1C1108',
    selection: '#804B16', 'selection-text': '#FFFFFF', success: '#86D98D',
    warning: '#FFD166', danger: '#FF7770',
  } },
  { name: 'Nebula', colors: {
    primary: '#CC91FF', accent: '#F0A9DC', text: '#F5EFFF', bg: '#191026',
    selection: '#573D78', 'selection-text': '#FFFFFF', success: '#75DBB6',
    warning: '#F5C873', danger: '#FF7D91',
  } },
  { name: 'Daylight', colors: {
    primary: '#155DB3', accent: '#624193', text: '#17283D', bg: '#F5F8FC',
    selection: '#245A82', 'selection-text': '#FFFFFF', success: '#16723D',
    warning: '#805000', danger: '#AD2630',
  } },
]

const theme = reactive({ ...presets[0].colors })
const inheritSelectionText = ref(false)
const selectedPreset = computed(() => {
  if (inheritSelectionText.value) return null
  return presets.find(preset => roles.every(role => theme[role.key] === preset.colors[role.key]))?.name ?? null
})
const configuration = computed(() =>
  '[theme]\n' + roles
    .filter(role => role.key !== 'selection-text' || !inheritSelectionText.value)
    .map(role => `${role.key}=${theme[role.key]}`).join('\n')
)
// Match MotherTheme's integer-weight blending, including its rounding.
function blend(color, weight) {
  return '#' + [1, 3, 5].map(offset => {
    const background = parseInt(theme.bg.slice(offset, offset + 2), 16)
    const foreground = parseInt(color.slice(offset, offset + 2), 16)
    return Math.floor((background * (255 - weight) + foreground * weight + 127) / 255)
      .toString(16).padStart(2, '0')
  }).join('').toUpperCase()
}

const previewStyle = computed(() => ({
  ...Object.fromEntries(roles.map(role => [`--theme-${role.key}`, theme[role.key]])),
  '--theme-selection-text': inheritSelectionText.value ? theme.text : theme['selection-text'],
  '--theme-chrome': blend(theme.text, 166),
  '--theme-muted': blend(theme.text, 85),
  '--theme-separator': blend(theme.text, 38),
  '--theme-free': blend(theme.success, 179),
}))
const copying = ref(false)
const copyMessage = ref('')
const copyFailed = ref(false)

function updateColor(key, event) {
  theme[key] = event.target.value.toUpperCase()
  copyMessage.value = ''
}

function applyPreset(preset) {
  Object.assign(theme, preset.colors)
  inheritSelectionText.value = false
  copyMessage.value = ''
}

function resetTheme() {
  applyPreset(presets[0])
}

async function copyTheme() {
  copying.value = true
  copyMessage.value = ''
  copyFailed.value = false
  const content = configuration.value
  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error('Clipboard access is unavailable in this browser or context.')
    }
    await navigator.clipboard.writeText(content)
    copyMessage.value = content === configuration.value
      ? 'Theme copied! Paste it into the Mother GUI programmable block\'s Custom Data.'
      : 'Previous theme copied. Copy again to include your latest changes.'
  } catch (error) {
    console.error('Failed to copy GUI theme:', error)
    copyFailed.value = true
    copyMessage.value = 'Could not access the clipboard. Select and copy the theme text below manually.'
  } finally {
    copying.value = false
  }
}
</script>

<template>
  <section class="theme-editor" aria-label="GUI theme editor">
    <p>Choose a preset or customise individual colours to update the preview. The menu is inspired by the ingame flight menu; the mechanical widgets illustrate the other theme colours.</p>

    <div class="presets" role="group" aria-label="Theme presets">
      <button v-for="preset in presets" :key="preset.name" type="button" class="preset"
        :aria-pressed="selectedPreset === preset.name" @click="applyPreset(preset)">
        <span class="preset-swatches" aria-hidden="true">
          <span :style="{ backgroundColor: preset.colors.bg }"/>
          <span :style="{ backgroundColor: preset.colors.primary }"/>
          <span :style="{ backgroundColor: preset.colors.selection }"/>
          <span :style="{ backgroundColor: preset.colors.accent }"/>
        </span>
        {{ preset.name }}
      </button>
    </div>
    <p v-if="!selectedPreset" class="preview-note">Custom theme</p>

    <svg class="theme-preview" :style="previewStyle" viewBox="0 0 680 480" role="img" aria-label="Live GUI theme preview: flight menu, unlocked rotor, open and opening doors, shared inertia, and locked rotor">
      <rect width="680" height="480" rx="8" class="canvas"/>
      <text x="20" y="44" class="value-text">Flight - Takeoff</text>
      <polygon points="641,18 650,27 650,37 641,46 631,46 622,37 622,27 631,18" fill="black" stroke="white" stroke-width="1.5"/>
      <g transform="translate(636 32)">
        <circle r="6" class="danger"/>
      </g>
      <!-- <text x="20" y="63" class="secondary">Main / Flight</text> -->
      <path d="M16 78 H664 M310 95 V460" class="separator"/>
      <rect x="0" y="95" width="298" height="36" class="selection"/>
      <text x="20" y="121" class="selection-text">&gt; Cruise &gt;</text>
      <text x="20" y="164" class="value-text">  Takeoff</text>
      <text x="20" y="207" class="value-text">  Landing</text>
      <text x="20" y="250" class="value-text">  Docked</text>
      <text x="20" y="293" class="value-text">  Parked</text>
      <text x="20" y="336" class="value-text">  Off</text>
      <text x="20" y="401" class="accent">  &lt; Back</text>

      <text x="332" y="121" class="value-text">Port Rotor</text>
      <g transform="translate(492 235)">
        <circle r="94" class="free"/>
        <circle r="86" class="dial-border"/>
        <circle r="84" class="canvas"/>
        <path d="M0 -77 V-63 M0 63 V77 M-77 0 H-63 M63 0 H77 M-54 -54 L-44 -44 M44 44 L54 54 M54 -54 L44 -44 M-44 44 L-54 54" class="ticks"/>
        <text x="0" y="-36" text-anchor="middle" class="value-text">Rotor</text>
        <path d="M0 0 L44 -44" class="needle"/>
        <circle r="5" class="indicator"/>
        <text x="0" y="28" text-anchor="middle" class="secondary">2.0 RPM</text>
        <text x="0" y="51" text-anchor="middle" class="chrome">UNLOCKED</text>
      </g>
      <text x="492" y="353" text-anchor="middle" class="accent">315.0 deg</text>
      <text x="332" y="388" class="secondary">Door</text>
      <text x="398" y="388" class="success">OPEN</text>
      <text x="332" y="423" class="secondary">Door</text>
      <text x="398" y="423" class="warning">OPENING</text>
      <text x="332" y="458" class="secondary">Inertia</text>
      <text x="423" y="458" class="muted">OFF</text>
      <g transform="translate(602 398)">
        <circle r="26" class="danger"/>
        <circle r="21" class="canvas"/>
        <path d="M0 0 L-12 -12" class="needle"/>
        <circle r="3" class="indicator"/>
      </g>
      <text x="602" y="442" text-anchor="middle" class="danger small">LOCKED</text>
    </svg>
    <p class="preview-note">Illustrative preview, not a game capture. Labels, chrome, muted text, and separators blend text with bg. The unlocked ring blends success with bg and retains alpha 180 / 255.</p>

    <label class="inherit-control">
      <input v-model="inheritSelectionText" type="checkbox" @change="copyMessage = ''">
      Inherit selected-row text from text (omit selection-text)
    </label>

    <div class="colour-grid">
      <label v-for="role in roles" :key="role.key" class="colour-control">
        <input type="color" :value="role.key === 'selection-text' && inheritSelectionText ? theme.text : theme[role.key]" :disabled="role.key === 'selection-text' && inheritSelectionText" :aria-label="role.key" @input="updateColor(role.key, $event)">
        <span>
          <span class="colour-value"><code>{{ role.key }}</code> <code>{{ role.key === 'selection-text' && inheritSelectionText ? theme.text : theme[role.key] }}</code></span>
          <span class="colour-description">{{ role.description }}</span>
        </span>
      </label>
    </div>

    <div class="theme-actions">
      <button type="button" :disabled="copying" @click="copyTheme">{{ copying ? 'Copying...' : 'Copy [theme]' }}</button>
      <button type="button" @click="resetTheme">Reset defaults</button>
    </div>
    <p role="status" aria-live="polite" :class="{ 'copy-error': copyFailed }">{{ copyMessage }}</p>
    <label class="output-label">
      Theme Custom Data
      <textarea :value="configuration" readonly :rows="configuration.split('\n').length" spellcheck="false" aria-label="Theme Custom Data"/>
    </label>
  </section>
</template>

<style scoped>
.theme-editor {
  margin: 1.5rem 0;
}

.presets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.5rem;
  margin: 1rem 0;
}

.preset {
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider, #808080);
  border-radius: 5px;
  background: var(--vp-c-bg, transparent);
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.preset[aria-pressed="true"] {
  border: 2px solid var(--vp-c-accent, #3eaf7c);
  font-weight: bold;
}

.preset-swatches {
  display: flex;
  height: 1rem;
  margin-bottom: 0.4rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider, #808080);
  border-radius: 3px;
}

.preset-swatches span {
  flex: 1;
}

.theme-preview {
  display: block;
  width: 100%;
  border: 1px solid var(--vp-c-divider, #808080);
  border-radius: 8px;
  font-family: Consolas, "Liberation Mono", monospace;
  font-size: 22px;
}

.canvas { fill: var(--theme-bg); }
.value-text { fill: var(--theme-text); }
.secondary { fill: var(--theme-chrome); font-size: 17px; }
.logo { fill: var(--theme-bg); stroke: var(--theme-text); stroke-width: 2; }
.selection { fill: var(--theme-selection); }
.selection-text { fill: var(--theme-selection-text); }
.accent { fill: var(--theme-accent); }
.separator { stroke: var(--theme-separator); stroke-width: 2; }
.dial-border { fill: var(--theme-separator); fill-opacity: 0.862745; }
.ticks { stroke: var(--theme-chrome); stroke-opacity: 0.627451; stroke-width: 2; }
.chrome { fill: var(--theme-chrome); font-size: 15px; }
.needle { stroke: var(--theme-primary); stroke-width: 4; }
.indicator { fill: var(--theme-primary); }
.muted { fill: var(--theme-muted); }
.success { fill: var(--theme-success); }
.warning { fill: var(--theme-warning); }
.danger { fill: var(--theme-danger); }
.free { fill: var(--theme-free); fill-opacity: 0.705882; }
.small { font-size: 13px; }

.preview-note, .colour-description {
  font-size: 0.85rem;
}

.inherit-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.colour-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.colour-control {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.colour-control input {
  width: 3rem;
  height: 2.5rem;
  padding: 2px;
  flex-shrink: 0;
  cursor: pointer;
}

.colour-value {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.colour-description {
  display: block;
  margin-top: 0.25rem;
}

.theme-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.theme-actions button {
  padding: 0.6rem 1rem;
  border: 1px solid var(--vp-c-divider, #808080);
  border-radius: 5px;
  background: var(--vp-c-bg, transparent);
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.theme-actions button:disabled {
  cursor: wait;
  opacity: 0.6;
}

.copy-error {
  color: var(--vp-c-red-1, #DC3232);
}

.output-label {
  display: block;
}

.output-label textarea {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider, #808080);
  border-radius: 5px;
  background: var(--vp-c-bg, transparent);
  color: inherit;
  font-family: Consolas, "Liberation Mono", monospace;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
}
</style>
