<script>
    import { fly } from 'svelte/transition';
    export let label = '';
    export let position = 'bottom right';
    export let delay = '';
    export let animated = false;
    let animation = animated ? 'animated' : '';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let showButton = false;

    setTimeout(() => {
        showButton = true;
    }, parseInt(delay));

    function handleClick() {
        dispatch('floatingBtnClick', { label });
    }
</script>

<main>
    {#if showButton}
        <div
            style="{animation};"
            on:click={handleClick}
            class="card {position} {animation}"
            transition:fly={{ y: 50, duration: 500 }}
        >
            {label}
        </div>
    {/if}
</main>

<style>
    .card {
        opacity: 0.9;
        position: fixed;
        text-align: center;
        font-weight: bold;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        width: auto;
        padding: 15px;
        border: 1px solid black;
        z-index: 999;
		font-size: 1.5rem;
    }
    .top {
        top: 35px;
    }
    .bottom {
        bottom: 35px;
    }
    .left {
        left: 35px;
    }
    .right {
        right: 35px;
    }
    .center {
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @keyframes floatAnimation {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
        100% {
            transform: translateY(0);
        }
    }
    .animated {
        animation: floatAnimation 3s infinite;
    }

    .card:hover {
        opacity: 1;
        cursor: pointer;
        padding: 18px;
        background-color: rgb(73, 0, 183);
        color: white;
    }
</style>
