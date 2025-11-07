<template>
  <div :to="'body'">
     <vue-particles
            id="tsparticles"
            ref="tsparticles"
            @particles-loaded="null"
            :options="{
                    background: {
                        // color: {
                        //     value: '#0d47a1'
                        // }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            // onClick: {
                            //     enable: true,
                            //     mode: 'push'
                            // },
                            // onHover: {
                            //     enable: true,
                            //     mode: 'repulse'
                            // },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            // value: '#ffffff'
                            value: '#cccccc'

                        },
                        // links: {
                        //     color: '#ffffff',
                        //     distance: 150,
                        //     enable: true,
                        //     opacity: 0.5,
                        //     width: 1
                        // },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: 'bounce',
                            random: false,
                            speed: 0.1,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 200
                        },
                        opacity: {
                            value: 0.4
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 1, max: 5 }
                        }
                    },
                    detectRetina: true
                }"
    />
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tsparticles = ref(null);

// prepend to body on mounted
onMounted(() => {
  const particlesContainer = document.querySelector('#tsparticles');
  if (particlesContainer) {
    document.body.prepend(particlesContainer);
    // Object.assign(particlesContainer.style, {
    //   position: 'fixed',
    //   top: '0',
    //   left: '0',
    //   width: '100%',
    //   height: '100%',
    //   zIndex: '-1', // Ensure it's behind other content
    // });
  }
});
</script>