<script>
  let { name, temperature = $bindable(), pressure = $bindable(), onNameChange } = $props();

  let internalName = $state(name);

  function tryNameChange() {
    if (!onNameChange(internalName)) {
      internalName = name;
    }
  }
</script>

<div class="rounded-lg p-2 bg-emerald-400">
  <input bind:value={internalName} onchange={tryNameChange} />
  <br />
  <label for={`${name}Temperature`}>temperature:</label>
  <input id={`${name}Temperature`} type="range" bind:value={temperature} />
  <br />
  <label for={`${name}Pressure`}>pressure:</label>
  <input id={`${name}Pressure`} type="range" bind:value={pressure} />
  <br />
</div>
