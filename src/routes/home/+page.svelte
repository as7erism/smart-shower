<script>
  import { getState } from '$lib/state.svelte';
  import { onMount } from 'svelte';
  import Thermometer from './thermometer.svelte';
  import Pressure from './pressure.svelte';

  onMount(() => {
    let state = getState();
    console.log(`state ${JSON.stringify(state)}`);
  });
</script>

<h1>This is the home page</h1>

<Thermometer initialTemperature={92} />

<Thermometer initialTemperature={75} />

<Pressure initialPressure={40}/>
