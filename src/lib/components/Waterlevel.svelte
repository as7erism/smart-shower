<script>
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let progress = 75;
  let direction = -1;
  let active = false;
  let intervalId;

  const duration = 60000;
  const frameRate = 60;
  const step = 100 / (duration / (1000 / frameRate));

  export function startCycle() {
    if (active) return;
    active = true;

    intervalId = setInterval(() => {
      progress += direction * step;

      if (progress <= 0) {
        progress = 0;
        clearInterval(intervalId);
        active = false;
        dispatch('depleted');
      }

      if (progress >= 100) {
        direction = -1;
      }
    }, 1000 / frameRate);
  }

  export function stopCycle() {
    clearInterval(intervalId);
    active = false;
  }

  onMount(() => () => clearInterval(intervalId));
</script>

<div class="water-bg">
  <div class="water" style="height:{progress}%;">
    <div class="waves">
      <svg class="svg-track wave1" viewBox="0 0 1200 64" preserveAspectRatio="none">
        <path
          d="M0,32 C150,0 300,64 450,32 S750,0 900,32 1050,64 1200,32 V64 H0 Z"
          fill="rgba(0,119,182,0.55)"
        />
      </svg>

      <svg class="svg-track wave2" viewBox="0 0 1200 64" preserveAspectRatio="none" style="top:6px">
        <path
          d="M0,32 C150,10 300,54 450,32 S750,10 900,32 1050,54 1200,32 V64 H0 Z"
          fill="rgba(0,119,182,0.40)"
        />
      </svg>
    </div>
  </div>
</div>

<!-- <button class="start-btn" on:click={startCycle}>Start Simulation</button> -->

<style>
  .water-bg {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 70%;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
  }

  .water {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 119, 182, 0.38);
    height: 100%;
    transition: height 0.2s linear;
    overflow: visible;
  }

  .waves {
    position: absolute;
    left: 0;
    top: -32px;
    width: 100%;
    height: 64px;
    overflow: hidden;
  }

  .svg-track {
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 100%;
    will-change: transform;
  }

  .wave1 {
    animation: waveScrollA 8s linear infinite;
    opacity: 0.75;
  }
  .wave2 {
    animation: waveScrollB 12s linear infinite reverse;
    opacity: 0.45;
  }

  @keyframes waveScrollA {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  @keyframes waveScrollB {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .start-btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    translate: -50% 0;
    z-index: 10;
    background: #3a3335;
    color: #fff;
    border: 0;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
  }
  .start-btn:hover {
    filter: brightness(1.05);
  }
</style>
