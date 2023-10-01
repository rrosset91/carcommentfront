<!-- Modal.svelte -->
<script>
    export let isOpen = false;
    export let close = () => {};
</script>

{#if isOpen}
    <div class="modal">
        <div class="backdrop" on:click={close} />
        <div class="content-wrapper">
            <h1>Your Modal Content Goes Here...</h1>
            <button on:click={close}>Close</button>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .content-wrapper {
        background-color: white;
        padding: 1em;
        border-radius: 0.3em;
    }
</style>
