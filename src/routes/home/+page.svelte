<script>
  import { getState } from '$lib/state.svelte';
  import { onMount } from 'svelte';
  import Thermometer from './thermometer.svelte';
  import Pressure from './pressure.svelte';
  import Waterlevel from './waterlevel.svelte';

  onMount(() => {
    let state = getState();
    console.log(`state ${JSON.stringify(state)}`);
  });
</script>

<Waterlevel />

<h1>This is the home page</h1>

<div>
  <Thermometer initialTemperature={75} />
  <Pressure initialPressure={40} />
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    text-align: center;
    margin-top: 100px;
    color: #000000;
  }
</style>
