<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let pages;
    let activePage = 1;
    function handleNext() {
        if (activePage == pages) return;
        activePage++;
        emitEvent();
    }

    function handlePreview() {
        if (activePage == 1) return;
        activePage--;
        emitEvent();
    }

    function handleLast() {
        if (activePage == pages) return;
        activePage = pages;
        emitEvent();
    }

    function handleFirst() {
        activePage = 1;
        emitEvent();
    }

    function handleNavigate(e) {
        activePage = Number(e.target.innerText);
        emitEvent();
    }

    function emitEvent() {
        dispatch('pagination', { page: activePage });
    }
</script>

<main>
    <div class="pages">
        <span class="arrow" on:click={handleFirst}>🢀</span>
        <span class="arrow" on:click={handlePreview}>🡨</span>
        {#each { length: pages } as _, i}
            <span
                on:click={handleNavigate}
                class={i + 1 === activePage ? 'active normal' : 'normal'}>{i + 1}</span
            >
        {/each}
        <span class="arrow" on:click={handleNext}>🡪</span>
        <span class="arrow" on:click={handleLast}>🢂</span>
    </div>
</main>

<style>
    span.normal {
        margin: 5px;
        font-family: Roboto;
        color: black;
        font-size: 20px;
    }
    span:hover {
        color: rgb(73, 0, 183);
        cursor: pointer;
    }

    span.active {
        font-weight: bold;
        color: rgb(73, 0, 183);
    }

    .arrow {
        font-size: 15px;
        color: rgb(73, 0, 183);
    }

    .arrow:hover {
        color: black;
    }
</style>
