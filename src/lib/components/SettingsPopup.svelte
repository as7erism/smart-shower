<script>
  import '../../app.css';
  import { getState, saveState } from '$lib/state.svelte.js';
  import { onMount } from 'svelte';

  let { toggleSettings } = $props();
</script>

<div class="fixed inset-0 bg-black/35 flex items-center justify-center">
  <div class="w-auto px-8 py-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-center">Shower Starts In...</h2>
    <div class="text-center text-8xl font-mono">test</div>
    <div class="flex justify-center">
      <button
        class="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-md"
        onclick={toggleSettings}
      >
        Cancel
      </button>
    </div>
  </div>
</div>
