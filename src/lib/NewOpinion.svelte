<script>
    import { fly } from 'svelte/transition';
    let showCommentButton = false;

    setTimeout(() => {
        showCommentButton = true;
    }, 5000);
</script>

<main>
    {#if showCommentButton}
        <div class="card" transition:fly={{ y: 50, duration: 500 }}>Comentar</div>
    {/if}
</main>

<style>
    .card {
        opacity: 0.3;
        position: absolute;
        text-align: center;
        font-weight: bold;
        bottom: 50px; /* Distância do fundo */
        right: 50px; /* Distância da direita */
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        width: 70px;
        padding: 15px;
        border: 1px solid black;
        z-index: 999;
        animation: floatAnimation 3s infinite;
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

    .card:hover {
        opacity: 1;
        cursor: pointer;
        padding: 18px;
        background-color: rgb(73, 0, 183);
        color: white;
    }
</style>
