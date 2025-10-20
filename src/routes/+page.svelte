<script>
  import Profile from '$lib/components/Profiles.svelte';
  import Countdown from '$lib/components/Countdown.svelte';
  import { getState } from '$lib/state.svelte.js';
  import { onMount } from 'svelte';

  let profiles = $state();
  let testProfiles = $state();

  onMount(() => {
    let stateData = getState();
    profiles = Object.entries(stateData.profiles).map(([name, data]) => ({
      name,
      ...data
    }));
  });

  let showCountdown = $state(false);

  function cancelStart() {
    showCountdown = false;
  }

  function startCountdown() {
    showCountdown = true;
  }

  function goToHome() {
    window.location.href = '/test';
  }

  function goToEditProfiles() {
    window.location.href = '/profiles';
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="w-full max-w-6xl px-8 py-12">
    <h1 class="text-4xl font-bold text-center mb-12">Choose your Profile:</h1>

    <div class="mx-auto">
      {#if profiles && profiles.length}
        <div class="grid grid-cols-3 gap-4 mb-12">
          {#each profiles as item, i (item.id ?? i)}
            <Profile
              name={item.name}
              temp={item.temperature}
              pressure={item.pressure}
              color={item.color}
              {startCountdown}
            />
          {/each}
        </div>
      {:else}
        <div class="text-center text-gray-500">No profiles available</div>
      {/if}

      <div class="flex justify-center">
        <button
          class="bg-gray-700 text-white text-xl px-6 py-6 rounded-lg font-bold shadow-md"
          onclick={goToEditProfiles}
        >
          Edit Profiles
        </button>
      </div>
    </div>
  </div>
</div>

{#if showCountdown}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <Countdown {cancelStart} {goToHome} />
  </div>
{/if}
