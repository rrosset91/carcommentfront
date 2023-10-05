<script>
    import CarCard from './lib/CarCard.svelte';
    import CommentCard from './lib/CommentCard.svelte';
    import { fly } from 'svelte/transition';
</script>

<main>
    <div class="container">
        <div class="car-card-container"><CarCard /></div>
        <div
            class="comments-container"
            style="max-height: 100vh; overflow-y: scroll; scroll-behavior: smooth;"
            transition:fly={{ x: +1000, duration: 500 }}
        >
            <CommentCard /><CommentCard /><CommentCard /><CommentCard />
        </div>
    </div>
</main>

<style>
    main {
        background: rgb(131, 58, 180);
        background: linear-gradient(
            247deg,
            rgba(131, 58, 180, 0.741976014038428) 0%,
            rgba(140, 123, 255, 1) 56%,
            rgba(9, 145, 255, 1) 100%
        );
    }
    .container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100vh;
    }

    .car-card-container {
        justify-content: center;
        align-items: center;
        height: 100%;
        flex: 1;
    }

    .comments-container {
        height: 100%;
        flex: 3;
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
</style>
