<script>
  import Profile from '$lib/components/Profiles.svelte';
  import { getState } from '$lib/testState.svelte.js';

  let state = getState();
  let profiles = state?.profiles
    ? Object.entries(state.profiles).map(([name, data]) => ({
        name,
        ...data
      }))
    : [];
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
            />
          {/each}
        </div>
      {:else}
        <div class="text-center text-gray-500">No profiles available</div>
      {/if}

      <div class="flex justify-center">
        <button
          class="bg-gray-700 text-white text-xl px-6 py-6 rounded-lg font-bold shadow-md"
          on:click={() => {alert('Edit Profiles clicked');}}
        >
          Edit Profiles
        </button>
      </div>
    </div>
  </div>
</div>