<script>
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

  function saveSettings() {
    const currentState = getState();
    const newState = {
      ...currentState,
      settings: { temperatureUnit, pressureUnit }
    };
    saveState(newState);

    toggleSettings();
    refreshState();
  }
</script>

<div class="fixed inset-0 bg-black/35 flex items-center justify-center">
  <div class="w-auto px-6 py-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-center">Settings</h2>
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
          onclick={saveSettings}
        >
          Save
        </button>
      </div>
    </div>
  </div>
</div>
