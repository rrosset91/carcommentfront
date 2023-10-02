<!-- Modal.svelte -->

<script>
    import { fade } from 'svelte/transition';
    export let isOpen = false;
    export let close = () => {};
</script>

{#if isOpen}
    <div class="modal" transition:fade={{ delay: 250, duration: 300 }}>
        <div class="backdrop" on:click={close} />
        <div class="content-wrapper">
            <div class="modal-header">
                <slot name="header" />
            </div>
            <div class="modal-content">
                <slot name="content" />
            </div>
            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
{/if}

<style>
    /* ... (seu código anterior) ... */

    /* Estilos para o modal */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column; /* Alteração para empilhar elementos verticalmente */
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .content-wrapper {
        background-color: white;
        padding: 1em;
        border-radius: 0.3em;
        width: 50%;
        max-height: 80%; /* Defina a altura máxima para evitar que o modal ultrapasse a tela */
        display: flex;
        flex-direction: column; /* Alteração para empilhar elementos verticalmente */
        justify-content: space-between; /* Espaçamento entre header, content e footer */
    }
    .modal-content,
    .modal-header,
    .modal-footer {
        width: 100%;
        text-align: center;
    }
</style>
