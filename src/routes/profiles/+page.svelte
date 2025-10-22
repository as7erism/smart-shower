<script>
  import { getState, saveState } from '$lib/state.svelte';
  import { onMount } from 'svelte';
  import Profile from './profile.svelte';
  import { goto } from '$app/navigation';

  let profiles = $state([]);

  onMount(() => {
    profiles = Object.entries(getState().profiles).reduce((acc, [name, value]) => {
      acc.push({
        name: name,
        temperature: value.temperature,
        pressure: value.pressure,
        color: value.color
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

  function deleteCallbackFactory(index) {
    return () => {
      profiles.splice(index, 1);
      console.log(JSON.stringify(profiles));
    };
  }

  function compileProfiles(profiles) {
    let profilesObject = {};
    for (const profile of profiles) {
      profilesObject[profile.name] = {};
      profilesObject[profile.name]['temperature'] = profile.temperature;
      profilesObject[profile.name]['pressure'] = profile.pressure;
      profilesObject[profile.name]['color'] = profile.color;
    }
    return profilesObject;
  }

  function saveProfiles() {
    let state = getState();
    state.profiles = compileProfiles(profiles);
    saveState(state);
    window.alert('Profiles saved!');
  }

  function newProfileName() {
    const regex = /^Profile (?<num>\d+)$/;
    const profileNumbers = [];
    for (const profile of profiles) {
      const match = profile.name.match(regex);
      if (match) {
        profileNumbers.push(parseInt(match.groups['num']));
      }
    }

    let i = 1;
    while (true) {
      if (!profileNumbers.includes(i)) {
        break;
      }
      i++;
    }

    return `Profile ${i}`;
  }

  function newProfile() {
    profiles.push({
      name: newProfileName(),
      temperature: 100,
      pressure: 60,
      color: 'oklch(55.1% 0.027 264.364)'
    });
  }
</script>

<div class="flex items-center justify-center flex-col p-2">
  <div class="flex items-center justify-between flex-row w-full p-2 mb-2">
    <div class="w-8 mr-auto"></div>
    <h1 class="text-3xl">Profiles</h1>
    <a href="/" class="ml-auto">
      <img class="h-8 w-8" src="house.png" />
    </a>
  </div>

  <div class="grid place-items-center auto-rows-fr w-80 gap-4">
    {#each profiles as _, i}
      {#key profiles[i]}
        <Profile
          name={profiles[i].name}
          bind:temperature={profiles[i].temperature}
          bind:pressure={profiles[i].pressure}
          bind:color={profiles[i].color}
          onNameChange={nameChangeCallbackFactory(i)}
          onDelete={deleteCallbackFactory(i)}
        />
      {/key}
    {/each}

    <button
      class="rounded-lg border-2 border-dashed text-lg flex items-center justify-center w-full h-full"
      onclick={newProfile}
    >
      + New Profile
    </button>

    <div class="flex flex-row gap-8 items-center justify-center">
      <button class="bg-blue-500 w-24 h-12 rounded-lg" onclick={saveProfiles}> Save </button>

      <button class="bg-gray-300 w-24 h-12 rounded-lg" onclick={goto('/')}> Cancel </button>
    </div>
  </div>
</div>
