<template>
  <span class="copy-to-clipboard" @click="copyToClipboard" :title="'Click to copy: ' + content">
    <slot></slot>
    <span v-if="copied" class="copy-feedback">Copied!</span>
  </span>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const copied = ref(false);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(props.content);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 1500);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return {
      copied,
      copyToClipboard
    };
  }
};
</script>

<style scoped>
.copy-to-clipboard {
  cursor: pointer;
  position: relative;
  display: inline-block;
  transition: opacity 0.2s;
}

.copy-to-clipboard:hover {
  opacity: 0.8;
}

.copy-to-clipboard:active {
  opacity: 0.6;
}

.copy-feedback {
  position: absolute;
  top: -1.75rem;
  left: 50%;
  transform: translateX(-50%);
  background: #4CAF50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  animation: fadeInOut 1.5s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(5px); }
  15% { opacity: 1; transform: translateX(-50%) translateY(0); }
  85% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-5px); }
}
</style>
