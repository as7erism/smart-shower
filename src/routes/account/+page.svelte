<script>
  import { getState } from '$lib/state.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    let state = getState();
    console.log(`state ${JSON.stringify(state)}`);
  });
</script>

<h1>hi</h1>
