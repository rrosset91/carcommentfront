<script>
    export let data = [];
    export let mockMode = false;
    export let type;
    let dataset = data;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    // Se mockMode for verdadeiro, use dados falsos para teste
    if (mockMode) {
        dataset = [
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            { name: 'Nissan', id: 1 },
            // ... outros dados falsos ...
        ];
    }

    // Função para disparar o evento customizado ao clicar no botão
    function handleClick(item) {
        const customEvent = new CustomEvent('itemSelected', {
            detail: {
                id: item.id,
                name: item.name,
                selectionType: type,
            },
        });
        console.log(customEvent);
        dispatch('itemSelected', customEvent);
    }
</script>

<!-- HTML do componente -->
<div class="container">
    {#each dataset as item, index}
        <div class="col">
            <button class="btn secondary" on:click={() => handleClick(item)}>
                {item.name}
            </button>
        </div>
        {#if (index + 1) % 4 === 0}
            <div style="flex-basis: 100%; height: 0;" />
        {/if}
    {/each}
</div>

<style>
    /* Estilos para o componente */
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center; /* Centraliza horizontalmente */
    }

    .col {
        margin: 5px;
        flex: 0 0 calc(25% - 10px); /* Define a largura para 25% com margens */
    }
</style>
