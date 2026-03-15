<template>
  <div class="cli-display">
    <div class="cli-header">
      <span class="cli-dot red"></span>
      <span class="cli-dot yellow"></span>
      <span class="cli-dot green"></span>
      <span class="cli-title">{{ title }}</span>
    </div>
    <div class="cli-content">
      <div class="cli-line" v-for="(line, index) in lines" :key="index" :class="{ 'cli-line-active': line.active }">
        <span class="cli-prompt">{{ line.prompt }}</span>
        <span class="cli-command" :style="{ color: line.color }">{{ line.text }}</span>
      </div>
      <div class="cli-cursor" v-if="showCursor">_</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Terminal'
  },
  maxLines: {
    type: Number,
    default: 3
  },
  showCursor: {
    type: Boolean,
    default: true
  }
})

const lines = ref([])

function addLine(command) {
  lines.value.forEach(line => line.active = false)
  lines.value.push({
    prompt: '> ',
    text: command.text,
    color: command.color || '#fff',
    active: true
  })
  // Keep only last maxLines
  if (lines.value.length > props.maxLines) {
    lines.value.shift()
  }
}

function clear() {
  lines.value = []
}

defineExpose({
  addLine,
  clear
})
</script>

<style scoped>
.cli-display {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  box-shadow: 0 4px 20px var(--vp-c-shadow);
  border: 1px solid var(--vp-c-border);
}

.cli-header {
  background: var(--vp-c-bg-elv);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid var(--vp-c-border);
}

.cli-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.cli-dot.red { background: var(--vp-c-accent); }
.cli-dot.yellow { background: #ffbd2e; }
.cli-dot.green { background: #27ca40; }

.cli-title {
  margin-left: 8px;
  color: var(--vp-c-text-mute);
  font-size: 12px;
}

.cli-content {
  padding: 16px;
  height: 80px;
  overflow: hidden;
}

.cli-line {
  display: flex;
  margin-bottom: 4px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.cli-line-active {
  opacity: 1;
}

.cli-prompt {
  color: var(--vp-c-accent);
  margin-right: 8px;
}

.cli-command {
  font-weight: 500;
  color: var(--vp-c-text);
}

.cli-cursor {
  color: var(--vp-c-accent);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
</style>
