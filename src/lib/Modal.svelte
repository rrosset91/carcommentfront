<!-- Modal.svelte -->

<script>
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    export let textAlign = 'center';
    export let close = () => {};
    export let isOpen = false;
    export let flex = true;
    let flexClass = flex ? 'flex' : '';
    let filterValue = '';
    const dispatch = createEventDispatcher();

    function filterDataset() {
        const customEvent = new CustomEvent('itemSelected', {
            detail: {
                value: filterValue,
            },
        });
        dispatch('filter', customEvent);
    }

    function closeModal() {
        close();
    }
</script>

{#if isOpen}
    <div on:click={closeModal} class="modal" transition:fade={{ delay: 250, duration: 300 }}>
        <div class="content-wrapper" on:click={(e) => e.stopPropagation()}>
            <div style="text-align:{textAlign}" class="{flexClass} modal-header">
                <!-- Adicione o ícone de fechar (x) dentro do modal -->
                <span class="close-icon" on:click={close}>❌</span>
                <slot name="header" />
            </div>
            <div style="text-align:{textAlign}" class="{flexClass} modal-content">
                <slot name="content" />
            </div>
            <div style="text-align:{textAlign}" class="{flexClass} modal-footer">
                <slot name="footer" />
            </div>
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
        flex-direction: column; /* Alteração para empilhar elementos verticalmente */
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .content-wrapper {
        overflow-y: auto;
        background-color: white;
        padding: 1em;
        border-radius: 0.3em;
        width: 50%;
        max-height: 80%; /* Defina a altura máxima para evitar que o modal ultrapasse a tela */
        display: flex;
        flex-direction: column; /* Alteração para empilhar elementos verticalmente */
        justify-content: space-between; /* Espaçamento entre header, content e footer */
        position: relative; /* Adiciona posição relativa para posicionar o ícone corretamente */
        z-index: 2;
        overflow-y: scroll;
        scrollbar-width: thin; /* Firefox */
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent; /* Firefox */

        /* Estilizar a barra de rolagem no Chrome/Safari */
        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
    }
    .modal-content,
    .modal-header,
    .modal-footer {
        border: none;
        width: 100%;
        margin-top: 20px;
    }

    .flex {
        justify-content: center;
        align-items: center;
        display: flex;
    }

    /* Estilos para o ícone de fechar (x) */
    .close-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 20px;
        color: transparent;
        text-shadow: 0 0 0 black;
    }
</style>
