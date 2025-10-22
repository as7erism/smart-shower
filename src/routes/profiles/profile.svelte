<script>
  let { name, temperature = $bindable(), pressure = $bindable(), color = $bindable(), onNameChange, onDelete } = $props();

  let internalName = $state(name);

  function tryNameChange() {
    if (!onNameChange(internalName)) {
      internalName = name;
    }
  }
</script>

<div class="rounded-lg p-2 text-white shadow-md border-2 w-full" style={`background-color: ${color}; border-color:${color}`}>
  <div class="flex">
    <input bind:value={internalName} onchange={tryNameChange} />
    <div class="ml-auto flex gap-2">
      <div class="relative">
        <input class="border-10 h-0 w-0" style={`border-color: ${color};`} type="color" bind:value={color} />
        <img class="h-5 w-5 absolute top-0 left-0 pointer-events-none" alt="Color Picker" src="color-picker.png" />
      </div>
      <img class="h-5 w-5" src="trash.png" onclick={onDelete} alt="Trash Can" />
    </div>
  </div>
  <div class="flex items-center justify-center gap-1">
    <input id={`${name}Temperature`} class="accent-gray-500" type="range" min="48" max="109" bind:value={temperature} />
    <label for={`${name}Temperature`}>{temperature}° F</label>
  </div>
  <div class="flex items-center justify-center gap-1">
    <input id={`${name}Pressure`} class="accent-gray-500" type="range" min="23" max="80" bind:value={pressure} />
    <label for={`${name}Pressure`}>{pressure} PSI </label>
  </div>
</div>
