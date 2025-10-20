<script>
  import '../../app.css';

  let { cancelStart, goToHome } = $props();

  let countdown = $state(5);

  import { onMount, onDestroy } from 'svelte';

  let timer;

  onMount(() => {
    timer = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1;
      }
      if (countdown <= 0) {
        clearInterval(timer);
        goToHome();
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="fixed inset-0 bg-black/35 flex items-center justify-center">
  <div class="w-auto px-8 py-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-center">Shower Starts In...</h2>
    <div class="text-center text-8xl font-mono">{countdown}</div>
    <div class="flex justify-center space-x-4">
      <button
        class="bg-red-500 text-white text-xl px-4 py-2 rounded-lg hover:bg-red-600"
        onclick={cancelStart}
      >
        Cancel
      </button>
    </div>
  </div>
</div>
