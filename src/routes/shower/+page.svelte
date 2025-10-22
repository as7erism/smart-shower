<script>
  import { goto } from '$app/navigation';
  import { getState } from '$lib/state.svelte';
  import { onMount } from 'svelte';
  import SettingsPopup from '$lib/components/SettingsPopup.svelte';

  import Thermometer from '$lib/components/Thermometer.svelte';
  import Pressure from '$lib/components/pressure.svelte';
  import Waterlevel from '$lib/components/Waterlevel.svelte';

  import Profile from '$lib/components/Profiles.svelte';

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getElapsedTime = (startTime) => {
    const diff = new Date() - startTime;
    const min = ~~(diff / 60000);
    const sec = ~~(diff / 1000) % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const startTime = new Date();
  let currentTime = $state(getCurrentTime());
  let elapsedTime = $state(getElapsedTime(startTime));
  const interval = setInterval(() => {
    currentTime = getCurrentTime(new Date());
    elapsedTime = getElapsedTime(startTime);
  }, 1000);

  let profilePopup = $state(false);
  const toggleProfilePopup = () => {
    profilePopup = !profilePopup;
  };

  let profiles = $state();
  let currentProfile = $state();
  let settings = $state();
  let startingTemp = $state(75);
  let startingPressure = $state(40);
  onMount(() => {
    let state = getState();
    profiles = state.profiles;
    currentProfile = state.currentProfile;
    settings = state.settings;
    startingTemp = profiles[currentProfile].temperature;
    startingPressure = profiles[currentProfile].pressure;
  });

  let showSettings = $state(false);

  let waterLevelRef;
  let thermometerRef;

  let progress = $state(75);
  let simulationActive = $state(false);

  function startSimulation() {
    if (!waterLevelRef) return;
    simulationActive = true;
    waterLevelRef.startCycle();
  }

  function stopSimulation() {
    if (!waterLevelRef) return;
    simulationActive = false;
    waterLevelRef.stopCycle();
    thermometerRef.stopCooling();
  }

  function handleDepleted() {
    thermometerRef.coolDown();
  }
</script>

<Waterlevel bind:this={waterLevelRef} bind:progress on:depleted={handleDepleted} />

<div class="h-screen">
  <div class="flex p-4">
    <div class="flex-1">
      <button title="settings" onclick={() => (showSettings = true)}>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="34.0pt"
          height="35.0pt"
          viewBox="0 0 1280.000000 1278.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,1278.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M7235 12766 c-16 -8 -42 -26 -56 -42 -14 -16 -153 -267 -309 -559 -156 -291 -298 -553 -316 -582 -53 -84 -49 -83 -328 -94 l-247 -11 -53 26 c-53 26 -59 34 -416 549 -200 287 -373 536 -386 553 -29 39 -80 64 -132 64 -43 0 -1174 -376 -1213 -403 -58 -41 -70 -89 -59 -235 24 -296 71 -892 81 -1029 l12 -153 -29 -57 c-28 -55 -38 -64 -234 -200 -113 -78 -221 -147 -240 -153 -82 -24 -92 -21 -736 246 -661 274 -642 267 -720 232 -38 -18 -781 -942 -796 -990 -8 -29 -8 -48 0 -77 8 -25 152 -223 402 -552 338 -446 391 -521 401 -564 14 -65 14 -65 -116 -375 -115 -277 -141 -316 -219 -344 -23 -8 -324 -66 -671 -128 -660 -118 -663 -119 -707 -179 -52 -70 -181 -1268 -139 -1293 6 -4 293 -110 637 -236 344 -126 640 -238 657 -248 66 -38 81 -81 141 -413 31 -169 56 -328 56 -355 0 -31 -9 -65 -23 -91 -15 -29 -167 -177 -492 -479 -259 -240 -479 -451 -490 -467 -13 -21 -19 -47 -18 -81 0 -46 25 -97 255 -544 141 -271 268 -506 283 -522 14 -15 45 -33 68 -39 39 -11 87 -2 667 129 654 148 677 151 750 117 39 -19 504 -499 532 -549 38 -70 36 -90 -66 -488 -235 -917 -230 -897 -217 -940 6 -22 22 -51 34 -65 12 -14 242 -149 511 -300 443 -249 494 -275 535 -275 27 0 59 8 76 18 17 11 230 222 475 471 245 249 461 461 482 471 73 39 93 37 459 -45 189 -42 355 -83 368 -92 69 -45 73 -54 286 -694 201 -603 207 -619 245 -653 22 -20 55 -38 77 -42 91 -17 658 19 1020 65 164 21 199 38 227 113 9 24 75 322 146 662 86 406 137 630 149 650 39 62 68 77 373 193 329 126 371 135 444 96 18 -10 248 -191 510 -403 263 -212 491 -393 508 -403 22 -13 45 -17 83 -14 51 3 62 11 349 228 583 441 638 484 657 511 11 14 22 48 24 75 5 44 -15 102 -227 658 -128 336 -235 626 -237 645 -10 69 13 112 173 332 86 117 166 224 178 236 35 39 95 65 151 64 27 0 326 -30 663 -67 l612 -66 43 19 c23 11 50 28 60 39 14 16 364 954 422 1131 22 65 8 120 -43 172 -20 21 -268 208 -551 416 -508 373 -514 378 -539 433 l-25 55 12 215 c16 281 18 294 55 348 30 43 53 56 613 337 321 161 590 299 599 306 22 19 54 85 54 112 0 42 -259 1217 -275 1248 -9 17 -32 41 -53 55 -42 27 1 24 -1013 89 -389 25 -396 27 -455 83 -43 41 -223 380 -230 434 -4 27 0 60 8 84 8 22 162 289 342 593 314 528 328 554 328 602 -1 27 -7 60 -14 74 -13 25 -850 884 -898 921 -15 12 -45 21 -80 23 l-57 4 -564 -313 c-310 -172 -582 -319 -604 -327 -69 -24 -114 -9 -300 95 -188 105 -208 120 -237 177 -26 50 -25 37 -49 751 -20 590 -21 611 -43 655 -37 75 36 53 -984 296 -172 40 -323 74 -335 74 -12 -1 -35 -7 -52 -14z m-385 -2650 c275 -36 503 -87 740 -166 1259 -416 2223 -1500 2484 -2792 57 -283 70 -419 70 -748 1 -310 -4 -386 -45 -635 -192 -1169 -955 -2197 -2024 -2725 -405 -200 -755 -305 -1245 -372 -153 -21 -711 -17 -880 5 -874 119 -1636 499 -2230 1113 -849 878 -1212 2088 -990 3300 146 797 579 1558 1196 2103 609 537 1352 856 2169 930 151 14 608 6 755 -13z"
            />
          </g>
        </svg>
      </button>
    </div>
    <div class="flex-1 flex flex-col gap-3">
      <p class="text-center text-lg">{currentTime}</p>
      <div class="flex gap-4">
        <div class="flex-1 flex justify-end items-center">
          <div class="bg-gray-100 rounded-lg shadow-sm px-4 py-2">
            <p class="font-semibold">{elapsedTime}</p>
          </div>
        </div>
        <div class="flex-1">
          <div class="relative">
            <button
              onclick={toggleProfilePopup}
              class="flex items-center rounded-xl shadow-md"
              style="background-color: {profiles ? profiles[currentProfile].color : 'blue'};"
            >
              <p class="whitespace-nowrap text-white m-2">{currentProfile}</p>
              <svg
                class={profilePopup ? 'rotate-x-180' : ''}
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  fill="#ffffff"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex justify-end">
      <button onclick={() => goto('/')} class="h-fit bg-red-500 rounded-xl shadow-md">
        <p class="text-white p-2">End Shower</p>
      </button>
    </div>
  </div>
  <div class="flex justify-between mt-12">
    <div class="mx-auto my-auto bg-white/50 rounded-xl p-6 shadow-md flex items-center">
      <Thermometer bind:this={thermometerRef} initialTemperature={startingTemp} />
    </div>
    <div class="mx-auto my-auto bg-white/50 rounded-xl p-6 shadow-md flex items-center">
      <Pressure initialPressure={startingPressure} />
    </div>
  </div>
  <div class="mt-12 w-screen">
    <iframe
      title="spotifyEmbed"
      data-testid="embed-iframe"
      style="border-radius:12px"
      src="https://open.spotify.com/embed/album/4HTy9WFTYooRjE9giTmzAF?utm_source=generator"
      width="100%"
      height="152"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </div>
  <p class="mt-2 text-xl text-center font-bold">Testing Area</p>
  <div class="flex justify-center">
    <div class="flex items-center gap-4">
      <div class="flex gap-4">
        {#if !simulationActive}
          <button
            class="bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-md"
            onclick={startSimulation}
            disabled={simulationActive}
          >
            Start Simulation
          </button>
        {:else}
          <button
            class="bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-md"
            onclick={stopSimulation}
            disabled={!simulationActive}
          >
            Stop Simulation
          </button>
        {/if}
      </div>

      <div class="flex flex-col items-center mt-4">
        <p class="font-medium">Set Hot Water Level:</p>
        <input id="waterLevel" type="range" min="0" max="100" bind:value={progress} class="w-54" />
        <p class="mt-1 text-sm">Water Level: {progress.toFixed(1)}%</p>
      </div>
    </div>
  </div>
</div>

{#if profilePopup}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black/35 flex items-center justify-center">
      <div class="w-auto px-8 py-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 class="text-2xl font-bold text-center">Your Profiles</h2>
        <hr class="border-t-2 border-black/30" />
        <div class="grid grid-cols-2 gap-4">
          {#each Object.entries(profiles) as [name, profile]}
            <Profile
              {name}
              {profile}
              callback={() => {
                toggleProfilePopup();
                currentProfile = name;
                startingTemp = profiles[name].temperature;
                startingPressure = profiles[name].pressure;
              }}
              {settings}
            />
          {/each}
        </div>
        <div class="flex justify-center">
          <button
            class="bg-gray-700 text-white text-xl px-5 py-3 rounded-xl shadow-md"
            onclick={() => goto('/profiles')}
          >
            Edit Profiles
          </button>
        </div>
        <div class="flex justify-center">
          <button
            onclick={toggleProfilePopup}
            class="bg-red-500 px-5 py-3 rounded-xl shadow-md text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if showSettings}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <SettingsPopup toggleSettings={() => (showSettings = !showSettings)} />
  </div>
{/if}

{#if showSettings}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <SettingsPopup
      toggleSettings={() => (showSettings = !showSettings)}
      refreshState={() => {
        const s = getState();
        settings = s.settings;
      }}
    />
  </div>
{/if}
