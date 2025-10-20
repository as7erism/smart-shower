<script>
  import '../../app.css';

  let { name, profile, callback, settings } = $props();
  let test = $state(true);
</script>

<button
  type="button"
  class="w-44 p-4 rounded-xl shadow-xl"
  style="background-color: {profile.color};"
  onclick={callback}
>
  <div class="space-y-3">
    <p class="text-3xl font-bold text-center text-white drop-shadow-md">{name}</p>

    <hr class="border-t-2 border-white" />

    <div class="space-y-2">
      <div class="flex items-center justify-center px-2">
        {#if settings.temperatureUnit === 'F'}
          <p class="text-xl text-white font-bold">{temp}°F</p>
        {:else}
          <p class="text-xl text-white font-bold">{temp}°C</p>
        {/if}
      </div>

      <div class="flex items-center justify-center px-2">
        {#if settings.pressureUnit === 'PSI'}
          <p class="text-xl text-white font-bold">{pressure} PSI</p>
        {:else}
          <p class="text-xl text-white font-bold">{pressure} Bar</p>
        {/if}
      </div>
    </div>
  </div>
</button>
