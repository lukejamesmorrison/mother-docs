<template>
  <div class="full-width-wrapper">
    <canvas ref="canvas" class="canvas-full" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const canvas = ref(null);
const PULSE_SPEED = 0.015;
let layoutScale = 1;

// Responsive scale adjustment
if (window.innerWidth < 768) {
  layoutScale = 1.3;
} else if (window.innerWidth < 1024) {
  layoutScale = 1.3;
} else {
  layoutScale = 1;
}

let unitWidth = 100;
let unitHeight = 100;

class Node {
  constructor({ id, name, x, y, image, pulseColor }) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.image = image;
    this.pulseColor = pulseColor;
    this.targets = [];
  }

  connect(target) {
    this.targets.push({ target, progress: 0, active: false });
  }

  trigger(pulseColor) {
    for (const link of this.targets) {
      link.progress = 0;
      link.active = true;
      link.pulseColor = pulseColor;
    }
  }

  update() {
    for (const link of this.targets) {
      if (link.active) {
        link.progress += PULSE_SPEED;
        if (link.progress >= 1) {
          link.progress = 1;
          link.active = false;
          link.target.trigger(this.pulseColor);
        }
      }
    }
  }

  drawLines(ctx, offsetX, offsetY) {
    for (const link of this.targets) {
      const { target, progress, active, pulseColor } = link;

      const sx = this.x * unitWidth + offsetX;
      const sy = this.y * unitHeight + offsetY;
      const tx = target.x * unitWidth + offsetX;
      const ty = target.y * unitHeight + offsetY;

      ctx.lineWidth = 4;
      ctx.strokeStyle = "#ccc";
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      if (active) {
        const px = sx + (tx - sx) * progress;
        const py = sy + (ty - sy) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 12 * layoutScale, 0, Math.PI * 2);
        ctx.fillStyle = pulseColor || '#0000ff';
        ctx.fill();
      }
    }
  }

  drawNode(ctx, offsetX, offsetY, isActiveSource = false) {
    const cx = this.x * unitWidth + offsetX;
    const cy = this.y * unitHeight + offsetY;
    const size = Math.min(unitWidth, unitHeight) * 0.4 * layoutScale;
    const x = cx - size / 2;
    const y = cy - size / 2;

    ctx.drawImage(this.image, x, y, size, size);

    ctx.font = `${14 * layoutScale}px sans-serif`;
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(this.name, cx, y + size + 4);
  }
}

onMounted(() => {
  const ctx = canvas.value.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const nodeData = [
    { id: 'mother', name: 'Mother', x: 3, y: 1, img: 'images/logo-512x512.png', targets: ['module2', 'module3', 'module4'], pulseColor: '#E3B505' },
    { id: 'mother2', name: '', x: 3, y: 1, img: 'images/logo-512x512.png', targets: ['module3', 'module5'], pulseColor: '#E3B505' },
    { id: 'module1', name: 'Piston Module', x: 1, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/f/f2/Small_Button_Panel.png', targets: ['mother'], pulseColor: '#E3B505' },
    { id: 'module2', name: 'Flight Control Module', x: 2, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/7/7c/Icon_Block_Connector.png', targets: [], pulseColor: '#E3B505' },
    { id: 'module3', name: 'Weapons Module', x: 3, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/2/28/Icon_Block_Piston.png', targets: [], pulseColor: '#E3B505' },
    { id: 'module4', name: 'Light Module', x: 4, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png', targets: ['mother2'], pulseColor: '#E3B505' },
    { id: 'module5', name: 'Antenna Module', x: 5, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png', targets: [], pulseColor: '#E3B505' },
  ];

  const nodes = {};
  const totalImages = nodeData.length;
  let loadedImages = 0;
  let allNodes = [];
  let offsetX = 0, offsetY = 0;
  const rootIds = ['module1', 'module4'];
  let currentRootIndex = 0;

  for (const data of nodeData) {
    const img = new Image();
    img.src = data.img;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === totalImages) start();
    };
    data.image = img;
    nodes[data.id] = new Node(data);
  }

  function resizeCanvas() {
    const bounds = canvas.value.getBoundingClientRect();
    canvas.value.width = bounds.width * dpr;
    canvas.value.height = bounds.height * dpr;

    canvas.value.style.width = `${bounds.width}px`;
    canvas.value.style.height = `${bounds.height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    if (allNodes.length) updateLayout();
  }

  function updateLayout() {
    const cssWidth = canvas.value.clientWidth;
    const cssHeight = canvas.value.clientHeight;

    const minX = Math.min(...allNodes.map(n => n.x));
    const maxX = Math.max(...allNodes.map(n => n.x));
    const minY = Math.min(...allNodes.map(n => n.y));
    const maxY = Math.max(...allNodes.map(n => n.y));

    const gridWidth = maxX - minX + 1;
    const gridHeight = maxY - minY + 1;
    const PADDING = 0.1;

    // unitWidth = (cssWidth / (gridWidth + PADDING * 2)) * layoutScale;
    unitWidth = Math.min(
      (cssWidth / (gridWidth + PADDING * 2)) * layoutScale,
      cssWidth / gridWidth
    );

    unitHeight = (cssHeight / (gridHeight + PADDING * 2)) * layoutScale;

    offsetX = -minX * unitWidth + cssWidth * PADDING;
    offsetY = -minY * unitHeight + cssHeight * PADDING;
  }

  function resetPulses() {
    allNodes.forEach(node => {
      node.targets.forEach(link => {
        link.progress = 0;
        link.active = false;
      });
    });
  }

  function beginCascade() {
    resetPulses();
    const root = nodes[rootIds[currentRootIndex]];
    root.trigger(root.pulseColor || '#0000ff');
  }

  function allPulsesComplete() {
    return allNodes.every(node =>
      node.targets.every(link => !link.active)
    );
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    allNodes.forEach(node => node.update());
    allNodes.forEach(node => node.drawLines(ctx, offsetX, offsetY));
    allNodes.forEach(node => node.drawNode(ctx, offsetX, offsetY, rootIds[currentRootIndex] === node.id));

    if (allPulsesComplete()) {
      currentRootIndex = (currentRootIndex + 1) % rootIds.length;
      beginCascade();
    }

    requestAnimationFrame(animate);
  }

  function start() {
    for (const data of nodeData) {
      const node = nodes[data.id];
      for (const targetId of data.targets) {
        node.connect(nodes[targetId]);
      }
    }

    allNodes = Object.values(nodes);
    updateLayout();
    beginCascade();
    animate();
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
});
</script>

<style scoped>
.full-width-wrapper {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  /* background: #e6f0ff; */
}

.canvas-full {
  display: block;
  width: 100%;
  height: 300px; /* Default for large screens */
}

@media (max-width: 1024px) {
  .canvas-full {
    height: 250px; /* Medium screens (e.g., tablets) */
  }
}

@media (max-width: 768px) {
  .canvas-full {
    height: 300px; /* Small screens (e.g., phones) */
  }
}

@media (max-width: 480px) {
  .canvas-full {
    height: 300px; /* Extra small devices */
  }
}
</style>
