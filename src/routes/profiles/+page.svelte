<script>
  import { getState, saveState } from '$lib/state.svelte';
  import { onMount } from 'svelte';
  import Profile from './profile.svelte';

  let profiles = $state([]);

  onMount(() => {
    profiles = Object.entries(getState().profiles).reduce((acc, [name, value]) => {
      acc.push({
        name: name,
        temperature: value.temperature,
        pressure: value.pressure
      });
      return acc;
    }, []);
  });

  function nameChangeCallbackFactory(index) {
    return (newName) => {
      for (const { name } of profiles) {
        if (name == newName) {
          window.alert('BAD DOG');
          return false;
        }
      }

      profiles[index].name = newName;
      return true;
    };
  }

  function saveProfiles() {
    let state = getState();
    let profilesObject = {};
    for (const profile of profiles) {
      profilesObject[profile.name] = {};
      profilesObject[profile.name]['temperature'] = profile.temperature;
      profilesObject[profile.name]['pressure'] = profile.pressure;
    }
    state.profiles = profilesObject;
    console.log(`saving ${JSON.stringify(state)}`);
    saveState(state);
  }
</script>

{#each profiles as _, i}
  <Profile
    name={profiles[i].name}
    bind:temperature={profiles[i].temperature}
    bind:pressure={profiles[i].pressure}
    onNameChange={nameChangeCallbackFactory(i)}
  />
{/each}

<button onclick={() => profiles.push({ name: `${Date.now()}`, temperature: 100, pressure: 60 })}
  >add</button
>
<br />
<button onclick={() => window.alert(JSON.stringify(profiles))}>check the thing</button>
<br />
<button onclick={saveProfiles}>save</button>
