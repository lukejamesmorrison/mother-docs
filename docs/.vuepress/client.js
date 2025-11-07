import { defineClientConfig } from 'vuepress/client'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'

export default defineClientConfig({
  async enhance({ app }) {
    if (typeof window === 'undefined') return; // SSR guard

    app.use(Particles, {
      init: async (engine) => {
        await loadFull(engine) // or loadSlim(engine) if you need everything
      },
    })
  }
})