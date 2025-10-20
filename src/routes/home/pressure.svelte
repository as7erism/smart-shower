<script>
  export let initialPressure = 50;
  const minPressure = 20;
  const maxPressure = 80;

  let pressureValue = initialPressure;
  let isDragging = false;

  $: rotation = ((pressureValue - minPressure) / (maxPressure - minPressure)) * 180;

  function handlePointerDown(event) {
    isDragging = true;
    updatePressure(event);
  }

  function handlePointerMove(event) {
    if (isDragging) updatePressure(event);
  }

  function handlePointerUp() {
    isDragging = false;
  }

  function updatePressure(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    const newPressure = minPressure + percent * (maxPressure - minPressure);
    pressureValue = Math.round(newPressure);
  }
</script>

<div
  class="gauge"
  on:pointerdown={handlePointerDown}
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerUp}
  on:pointerleave={handlePointerUp}
>
  <div class="mask">
    <div class="semi-circle"></div>
    <div
      class="semi-circle--mask"
      style="transform: rotate({rotation}deg);"
    ></div>

    <div
      class="needle"
      style="transform: rotate({rotation - 90}deg);"
    >
      <div class="needle-body"></div>
      <div class="needle-tip"></div>
      <div class="needle-hub"></div>
    </div>
  </div>

  <div class="label">{pressureValue} PSI</div>
</div>

<style>
  .gauge {
    position: relative;
    width: 220px;
    height: 110px;
    margin: 2rem auto;
    cursor: pointer;
    user-select: none;
  }

  .mask {
    position: relative;
    overflow: hidden;
    width: 220px;
    height: 110px;
  }

  .semi-circle {
    position: relative;
    display: block;
    width: 220px;
    height: 110px;
    background: #0077B6;
    border-radius: 110px 110px 0 0;
  }

  .semi-circle::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 160px;
    height: 80px;
    margin-left: -80px;
    background: #fff;
    border-radius: 80px 80px 0 0;
    z-index: 2;
  }

  .semi-circle--mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 220px;
    height: 220px;
    background: transparent;
    transform-origin: center center;
    transition: transform 0.1s ease-in-out;
  }

  .semi-circle--mask::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 222px;
    height: 112px;
    margin: -1px 0 0 -1px;
    background: #f2f2f2;
    border-radius: 110px 110px 0 0;
  }

  .needle {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    transform-origin: bottom center;
    transition: transform 0.25s ease-in-out;
    z-index: 6;
  }

  .needle-body {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 85px;
    background: linear-gradient(to top, #111, #555);
    border-radius: 4px;
  }

  .needle-tip {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 16px solid #111;
  }

  .needle-hub {
    position: absolute;
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle at 30% 30%, #666, #222);
    border: 2px solid #000;
    border-radius: 50%;
    z-index: 10;
  }

  .label {
    position: absolute;
    bottom: -40px;
    width: 100%;
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 1.3rem;
    color: #333;
    font-weight: bold;
  }
</style>
