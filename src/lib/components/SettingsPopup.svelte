<!-- <script>
  import '../../app.css';
  import { getState, saveState } from '$lib/state.svelte.js';
  import { onMount } from 'svelte';

  let { toggleSettings, refreshState } = $props();

  let temperatureUnit = $state('F');
  let pressureUnit = $state('PSI');

  let settings;

  onMount(() => {
    const stateData = getState();
    settings = stateData.settings;
    temperatureUnit = settings.temperatureUnit;
    pressureUnit = settings.pressureUnit;
  });

  function updateUnits(currentState) {
    if (currentState.settings.temperatureUnit != temperatureUnit) {
      switch (temperatureUnit) {
        case "F":
          currentState.profiles = Object.entries(currentState.profiles).reduce((profiles, [name, profile]) => {
            profile.temperature = Math.floor((profile.temperature * 9 / 5) + 32);
            profiles[name] = profile;
            return profiles;
          }, {})
          break;
        case "C":
          currentState.profiles = Object.entries(currentState.profiles).reduce((profiles, [name, profile]) => {
            profile.temperature = Math.floor((profile.temperature - 32) * 5 / 9);
            profiles[name] = profile;
            return profiles;
          }, {})
          break;
      }
    }

    if (currentState.settings.pressureUnit != pressureUnit) {
      switch (pressureUnit) {
        case "Bar":
          currentState.profiles = Object.entries(currentState.profiles).reduce((profiles, [name, profile]) => {
            profile.pressure = Math.floor(profile.pressure / 14.504);
            profiles[name] = profile;
            return profiles;
          }, {})
          break;
        case "PSI":
          currentState.profiles = Object.entries(currentState.profiles).reduce((profiles, [name, profile]) => {
            profile.pressure = Math.floor(profile.pressure * 14.504);
            profiles[name] = profile;
            return profiles;
          }, {})
          break;
      }
    }

    currentState.settings.temperatureUnit = temperatureUnit;
    currentState.settings.pressureUnit = pressureUnit;

    return currentState;
  }

  function saveSettings() {
    const currentState = getState();
    const newState = updateUnits(currentState);
    saveState(newState);

    toggleSettings();
    refreshState();
  }
</script>

<div class="fixed inset-0 bg-black/35 flex items-center justify-center">
  <div class="w-auto px-6 py-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-center">Settings</h2>
    <h2 class="text-2xl font-bold text-center">(FUTURE WORK)</h2>
    <hr class="border-t-2 border-black/30" />
    <div class="space-y-4">
      <div>
        <p class="block text-sm font-medium mb-1">Temperature Unit</p>
        <select class="w-48 border px-3 py-2 rounded">
          <option value="F">Fahrenheit (F)</option>
          <option value="C">Celsius (C)</option>
        </select>
      </div>

      <div>
        <p class="block text-sm font-medium mb-1">Pressure Unit</p>
        <select class="w-48 border px-3 py-2 rounded">
          <option value="PSI">PSI</option>
          <option value="Bar">Bar</option>
        </select>
      </div>

      <div class="flex justify-between space-x-4">
        <button
          class="bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-md"
          onclick={toggleSettings}
        >
          Cancel
        </button>
        <button
          class="bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-md"
          onclick={saveSettings}
        >
          Save
        </button>
      </div>
    </div>
  </div>
</div> -->

<script>
  import '../../app.css';
  import { getState } from '$lib/state.svelte.js';
  import { onMount } from 'svelte';

  let { toggleSettings } = $props();

  let temperatureUnit = $state('F');
  let pressureUnit = $state('PSI');

  let settings;

  onMount(() => {
    const stateData = getState();
    settings = stateData.settings;
    temperatureUnit = settings.temperatureUnit;
    pressureUnit = settings.pressureUnit;
  });
</script>

<div class="fixed inset-0 bg-black/35 flex items-center justify-center">
  <div class="w-auto px-6 py-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-3xl font-bold text-center text-red-600">FUTURE WORK</h2>
    <hr class="border-t-2 border-black/30" />
    <div class="space-y-4">
      <div>
        <p class="block text-sm font-medium mb-1">Temperature Unit</p>
        <select bind:value={temperatureUnit} class="w-48 border px-3 py-2 rounded">
          <option value="F">Fahrenheit (F)</option>
          <option value="C">Celsius (C)</option>
        </select>
      </div>

      <div>
        <p class="block text-sm font-medium mb-1">Pressure Unit</p>
        <select bind:value={pressureUnit} class="w-48 border px-3 py-2 rounded">
          <option value="PSI">PSI</option>
          <option value="Bar">Bar</option>
        </select>
      </div>

      <div class="flex justify-between space-x-4">
        <button
          class="bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-md"
          onclick={toggleSettings}
        >
          Cancel
        </button>
        <button
          class="bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-md"
          onclick={toggleSettings}
        >
          Save
        </button>
      </div>
    </div>
  </div>
</div>
