<script>
  import Thermometer from './thermometer.svelte';
  import Pressure from './pressure.svelte';
  import Waterlevel from './waterlevel.svelte';

  let thermometerRef;

  function handleDepleted() {
    thermometerRef.coolDown();
  }
</script>

<Waterlevel on:depleted={handleDepleted} />

<h1>This is the home page</h1>

<div>
  <Thermometer bind:this={thermometerRef} initialTemperature={75} />
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
