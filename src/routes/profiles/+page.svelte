<script>
  import { getState } from '$lib/state.svelte';
  import { onMount } from 'svelte';

  let profiles = $state({});

  onMount(() => {
    profiles = getState().profiles;
  });
</script>

{#each Object.entries(profiles) as [name, value]}
  <h1>{name}:</h1>
  <p>temperature: {value.temperature}</p>
  <p>pressure: {value.pressure}</p>
{/each}
