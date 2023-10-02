<script>
    import { createEventDispatcher } from 'svelte';
    export let type = '';
    export let disabled = true;
    let typeName = type;
    const dispatch = createEventDispatcher();

    function selectItem(typeName) {
        dispatch('btnClicked', { type: typeName });
    }
</script>

<button class="btn" {disabled} on:click={() => selectItem(typeName)}>{typeName}</button>
