<script>
    import "../../app.css";

    let { name, temp, pressure, color } = $props();
</script>

<button
    type="button"
    class="w-44 p-4 rounded-xl shadow-xl"
    style="background-color: {color};"
    onclick={() => alert(`Preset: ${name}\nTemperature: ${temp}°F\nPressure: ${pressure} PSI`)}
>
    <div class="space-y-3">
        <p class="text-3xl font-bold text-center text-white drop-shadow-md">{name}</p>
        
        <hr class="border-t-2 border-white" />
        
        <div class="space-y-2">
            <div class="flex items-center justify-center px-2">
                <p class="text-xl text-white font-bold">{temp}°F</p>
            </div>
            
            <div class="flex items-center justify-center px-2">
                <p class="text-xl text-white font-bold">{pressure} PSI</p>
            </div>
        </div>
    </div>
</button>