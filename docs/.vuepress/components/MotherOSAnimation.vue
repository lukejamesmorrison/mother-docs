<template>
  <canvas ref="canvas" class="w-full" style="height: 400px; max-width: 100%; margin: auto;"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const canvas = ref(null);
const PULSE_SPEED = 0.015;
let currentPulseColor = '#0000ff';

let unitWidth = 200;
let unitHeight = 200;

class Node {
  constructor({ id, name, x, y, image, pulseColor }) {
    this.id = id;
    this.name = name;
    this.x = x; // grid units
    this.y = y;
    this.image = image;
    this.pulseColor = pulseColor;
    this.targets = [];
  }

  connect(targetNode) {
    this.targets.push({ target: targetNode, progress: 0, active: false });
  }

  trigger(pulseColor) {
    this.targets.forEach(link => {
      link.progress = 0;
      link.active = true;
      link.pulseColor = pulseColor;
    });
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

      // Draw Pulse
      if (active) {
        const px = sx + (tx - sx) * progress;
        const py = sy + (ty - sy) * progress;

        const radius = 12;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = pulseColor || '#0000ff';
        ctx.fill();
      }
    }
  }

  drawNode(ctx, offsetX, offsetY, isActiveSource = false) {
    const size = Math.min(unitWidth, unitHeight) * 0.8;
    const cx = this.x * unitWidth + offsetX;
    const cy = this.y * unitHeight + offsetY;
    const x = cx - size / 2;
    const y = cy - size / 2;

    ctx.drawImage(this.image, x, y, size, size);

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(this.name, cx, y + size + 4);
  }
}

onMounted(() => {
  const ctx = canvas.value.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const resizeCanvas = () => {
    const bounds = canvas.value.getBoundingClientRect();

    canvas.value.width = bounds.width * dpr;
    canvas.value.height = bounds.height * dpr;

    canvas.value.style.width = `${bounds.width}px`;
    canvas.value.style.height = `${bounds.height}px`;

    if (allNodes.length) updateLayout(); // re-center and scale
  };

  const nodeData = [
    { id: 'root1', name: 'Button', x: 1, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/f/f2/Small_Button_Panel.png', targets: ['child1'], pulseColor: '#E3B505' },
    { id: 'root2', name: 'Connector', x: 1, y: 4, img: 'https://static.wikia.nocookie.net/spaceengineers/images/7/7c/Icon_Block_Connector.png', targets: ['child2'], pulseColor: '#E3B505' },
    { id: 'child1', name: 'Mother', x: 2, y: 3, img: 'images/logo-512x512.png', targets: ['grand3' ,'grand5', 'greatgrand1'], pulseColor: '#E3B505' },
    { id: 'child2', name: '', x: 2, y: 3, img: 'images/logo-512x512.png', targets: ['grand1', 'grand4'], pulseColor: '#E3B505' },
    { id: 'grand1', name: 'Piston', x: 3, y: 1, img: 'https://static.wikia.nocookie.net/spaceengineers/images/2/28/Icon_Block_Piston.png', targets: [], pulseColor: '#E3B505' },
    { id: 'grand3', name: 'Rotor', x: 4, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png', targets: [], pulseColor: '#E3B505' },
    { id: 'grand4', name: 'Landing Gear', x: 4, y: 4, img: 'https://static.wikia.nocookie.net/spaceengineers/images/2/2d/Icon_Block_Landing_Gear.png', targets: [], pulseColor: '#E3B505' },
    { id: 'grand5', name: 'Programmable Block', x: 3, y: 5, img: 'https://static.wikia.nocookie.net/spaceengineers/images/7/76/Icon_Block_Programmable_Block.png', targets: [], pulseColor: '#E3B505' },
    { id: 'greatgrand1', name: 'Mother', x: 6, y: 3, img: 'images/logo-512x512.png', targets: ['greatgreatgrand1', 'greatgreatgrand2'], pulseColor: '#E3B505' },
    { id: 'greatgreatgrand1', name: 'Sound Block', x: 7, y: 2, img: 'https://static.wikia.nocookie.net/spaceengineers/images/4/4e/Icon_Block_Sound_Block.png', targets: [], pulseColor: '#E3B505' },
    { id: 'greatgreatgrand2', name: 'Light', x: 7, y: 4, img: 'https://static.wikia.nocookie.net/spaceengineers/images/2/21/Icon_Block_Interior_Light.png', targets: [], pulseColor: '#E3B505' },



  ];

  const nodes = {};
  let loadedImages = 0;
  let currentRootIndex = 0;
  const rootIds = ['root1', 'root2'];
  let offsetX = 0;
  let offsetY = 0;
  let allNodes = [];

  const totalImages = nodeData.length;

  for (const data of nodeData) {
    const img = new Image();
    img.src = data.img;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        start();
      }
    };
    data.image = img;
    nodes[data.id] = new Node(data);
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
    currentPulseColor = root.pulseColor || '#0000ff';
    root.trigger(currentPulseColor);
  }

  function allPulsesComplete() {
    return allNodes.every(node =>
      node.targets.every(link => link.active === false)
    );
  }

  function updateLayout() {
  const canvasWidth = canvas.value.width;
  const canvasHeight = canvas.value.height;

  const minX = Math.min(...allNodes.map(n => n.x));
  const maxX = Math.max(...allNodes.map(n => n.x));
  const minY = Math.min(...allNodes.map(n => n.y));
  const maxY = Math.max(...allNodes.map(n => n.y));

  const gridWidth = maxX - minX + 1;
  const gridHeight = maxY - minY + 1;

  const PADDING = 0.1;

unitWidth = canvasWidth / (gridWidth + PADDING * 2);
unitHeight = canvasHeight / (gridHeight + PADDING * 2);

offsetX = -minX * unitWidth + canvasWidth * PADDING;
offsetY = -minY * unitHeight + canvasHeight * PADDING;

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

  function animate() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    allNodes.forEach(node => node.update());
    allNodes.forEach(node => node.drawLines(ctx, offsetX, offsetY));
    allNodes.forEach(node => {
      node.drawNode(ctx, offsetX, offsetY, rootIds[currentRootIndex] === node.id);
    });

    if (allPulsesComplete()) {
      // setTimeout(() => {
        currentRootIndex = (currentRootIndex + 1) % rootIds.length;
        beginCascade();
      // }, 400);
    }

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
});
</script>

<style scoped>
canvas {
  display: block;
  background-color: #fff;
}
</style>
