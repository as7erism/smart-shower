<script>
  import { getState } from '$lib/state.svelte';
  import { onMount } from 'svelte';
  import Termometer from './termometer.svelte';

  onMount(() => {
    let state = getState();
    console.log(`state ${JSON.stringify(state)}`);
  });
</script>

<h1>This is the home page</h1>
<Termometer />
