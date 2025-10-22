<script>
  export let initialTemperature = 72;
  export let initialUnit = 'Fahrenheit';

  const minTemp = 50;
  const maxTemp = 110;
  let isCooling = false;

  let units = {
    Celcius: '°C',
    Fahrenheit: '°F'
  };

  let config = {
    minTemp: initialUnit === 'Fahrenheit' ? 50 : 10,
    maxTemp: initialUnit === 'Fahrenheit' ? 110 : 45,
    unit: initialUnit
  };

  let temperatureValue = initialTemperature;
  $: if (initialTemperature !== undefined) {
    temperatureValue = initialTemperature;
  }

  $: {
    if (config.unit === 'Fahrenheit') {
      config.minTemp = 50;
      config.maxTemp = 110;
    } else {
      config.minTemp = 10;
      config.maxTemp = 45;
    }
  }

  let interval;

  export function coolDown() {
    if (isCooling) return;
    isCooling = true;
    const duration = 30000;
    const frameRate = 60;
    const steps = duration / (1000 / frameRate);
    let decrement = (temperatureValue - minTemp) / steps;
    decrement = Math.round(decrement * 100) / 100;

    interval = setInterval(() => {
      temperatureValue -= decrement;
      temperatureValue = Math.round(temperatureValue * 100) / 100;
      if (temperatureValue <= minTemp) {
        temperatureValue = minTemp;
        clearInterval(interval);
      }
    }, 1000 / frameRate);
  }

  // Reactive mercury height
  $: mercuryHeight = `${Math.min(
    100,
    Math.max(0, ((temperatureValue - config.minTemp) / (config.maxTemp - config.minTemp)) * 100)
  )}%`;

  function toggleUnit() {
    if (config.unit === 'Celcius') {
      // Convert to Fahrenheit
      temperatureValue = Math.round((temperatureValue * 9) / 5 + 32);
      config.unit = 'Fahrenheit';
    } else {
      // Convert to Celsius
      temperatureValue = Math.round(((temperatureValue - 32) * 5) / 9);
      config.unit = 'Celcius';
    }
  }

  // Click & drag interactions
  let isDragging = false;

  function handlePointerDown(event) {
    if (isCooling) return;
    isDragging = true;
    updateTemperature(event);
  }

  function handlePointerMove(event) {
    if (isCooling || !isDragging) return;
    updateTemperature(event);
  }

  function handlePointerUp() {
    if (isCooling) return;
    isDragging = false;
  }

  function updateTemperature(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const percent = 1 - y / rect.height;
    const newTemp = config.minTemp + percent * (config.maxTemp - config.minTemp);
    temperatureValue = Math.round(newTemp);
  }

  export function stopCooling() {
    if (!isCooling) return;
    clearInterval(interval);
    isCooling = false;
  }
</script>

<div id="wrapper">
  <div
    id="termometer"
    on:pointerdown={handlePointerDown}
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:pointerleave={handlePointerUp}
  >
    <div
      id="temperature"
      style="height:{mercuryHeight}"
      data-value="{temperatureValue}{units[config.unit]}"
    ></div>
    <div id="graduations"></div>
  </div>

  <div id="playground">
    <!-- <div id="range">
			<input
				id="minTemp"
				type="text"
				bind:value={config.minTemp}
				readonly
			/>
			<span id="divider">–</span>
			<input
				id="maxTemp"
				type="text"
				bind:value={config.maxTemp}
				readonly
			/>
		</div> -->
    <p id="unit" on:click={toggleUnit}>
      {config.unit}
      {units[config.unit]}
    </p>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css?family=Jaldi&display=swap');

  #wrapper {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    user-select: none;
  }

  /* Thermometer */
  #termometer {
    width: 25px;
    background: #38383e;
    height: 240px;
    position: relative;
    border: 9px solid #2f2f35;
    border-radius: 20px;
    z-index: 1;
    margin-bottom: 55px;
    cursor: pointer;
    user-select: none;
  }

  #termometer::before,
  #termometer::after {
    position: absolute;
    content: '';
    border-radius: 50%;
  }

  #termometer::before {
    width: 100%;
    height: 34px;
    bottom: 9px;
    background: #38383e;
    z-index: -1;
  }

  #termometer::after {
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background-color: #3dcadf;
    bottom: -41px;
    border: 9px solid #2f2f35;
    z-index: -3;
    left: 50%;
  }

  /* Graduations (Ticks) */
  #graduations {
    height: 59%;
    top: 20%;
    width: 50%;
    position: absolute;
    border-top: 2px solid rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  }

  #graduations::before {
    content: '';
    position: absolute;
    height: 34%;
    width: 100%;
    top: 32%;
    border-top: 2px solid rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  }

  /* Temperature (mercury) */
  #temperature {
    position: absolute;
    bottom: 0;
    background: linear-gradient(#f17a65, #3dcadf) no-repeat bottom;
    width: 100%;
    border-radius: 20px;
    background-size: 100% 240px;
    transition: height 0.25s ease-in-out;
    pointer-events: none;
  }

  #temperature::before {
    content: attr(data-value);
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    z-index: 2;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1em;
    line-height: 1;
    transform: translateY(50%);
    left: calc(100% + 0.66em);
    top: calc(-1em + 5px - 10px);
  }

  #temperature::after {
    content: '';
    position: absolute;
    border-top: 0.45em solid transparent;
    border-bottom: 0.45em solid transparent;
    border-right: 0.66em solid rgba(0, 0, 0, 0.7);
    left: 100%;
    top: calc(-0.45em + 5px);
  }

  /* Playground */
  #playground {
    font-size: 1.1em;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* #range {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;
} */

  /* #divider {
	font-size: 1.1em;
	color: #aaa;
}

#range input[type="text"] {
	width: 3.2em; 
	background: transparent;
	border: none;
	color: inherit;
	font: inherit;
	padding: 0 4px;
	border-bottom: 2px solid transparent;
	transition: all 0.2s ease-in-out;
	text-align: center;
}

#range input[type="text"]:focus {
	border-color: #3dcadf;
	outline: none;
} */

  #unit {
    width: 150%;
    margin: 4px 0 0;
    text-align: center;
    cursor: pointer;
  }
</style>
