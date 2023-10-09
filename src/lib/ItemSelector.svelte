<script>
    export let data = [];
    export let type;
    let dataset = data;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    // Função para disparar o evento customizado ao clicar no botão
    function handleClick(item) {
        let name = type === 'Ano' ? item : item.name;
        const customEvent = new CustomEvent('itemSelected', {
            detail: {
                id: item.id,
                name: name,
                selectionType: type,
            },
        });
        dispatch('itemSelected', customEvent);
    }
    $: dataset = data;

    //log dataset console.log everytime it changes
    $: console.log(dataset);
</script>

<!-- HTML do componente -->
<div class="container">
    {#if dataset.length === 0}
        <img src="images/empty-icon.svg" width="200" alt="Empty-results" />
    {:else}
        {#each dataset as item, index}
            <div class="col">
                <button class="btn btn-primary" on:click={() => handleClick(item)}>
                    {#if type === 'Ano'}
                        {item}
                    {:else}
                        {item.name}
                    {/if}
                </button>
            </div>
            {#if (index + 1) % 4 === 0}
                <div style="flex-basis: 100%; height: 0;" />
            {/if}
        {/each}
    {/if}
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
    button {
        color: white;
    }
</style>
