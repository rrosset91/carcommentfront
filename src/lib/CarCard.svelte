<script>
    let Mockmode = true;
    import { fly } from 'svelte/transition';
    let carData = {
        name: 'Nome do Carro',
        overallRating: 4.5,
        specificRatings: [
            { concept: 'Conforto', value: 8 },
            { concept: 'Manutenção', value: 9 },
            { concept: 'Fiabilidade', value: 10 },
            { concept: 'Design', value: 8 },
            { concept: 'Desempenho', value: 9 },
        ],
    };

    if (Mockmode) {
        carData = {
            name: 'Carro de Teste',
            overallRating: 9.5,
            specificRatings: [
                { concept: 'Conforto', value: 10 },
                { concept: 'Manutenção ($)', value: 7 },
                { concept: 'Fiabilidade', value: 8 },
                { concept: 'Consumo', value: 7 },
                { concept: 'Desempenho', value: 8 },
            ],
        };
    }

    function convertToEmojiRating(rating) {
        let emojis = '';
        for (let i = 0; i < 10; i++) {
            if (i < Math.floor(rating)) {
                emojis += '★';
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                emojis += '✭';
            } else {
                emojis += '✰';
            }
        }
        return emojis;
    }
</script>

<main class="container">
    <div class="card" transition:fly={{ x: -1000, duration: 500 }}>
        <img class="car-image" src="images/carsample.jpg" alt="Imagem do Carro" />
        <div>
            <p class="car-name">
                {convertToEmojiRating(carData.overallRating)}<br />
                {carData.name} <br />
            </p>
            <p class="car-name numeral-concept">{carData.overallRating}</p>

            {#each carData.specificRatings as rating}
                <p class="star-ratings">
                    <span class="concept">{rating.concept}:</span>
                    <span class="value">
                        {convertToEmojiRating(rating.value)}
                        {rating.value != 10 ? rating.value.toFixed(2) : rating.value.toFixed(1)}
                    </span>
                </p>
            {/each}
        </div>
    </div>
</main>

<style>
    main {
        padding: 20px;
    }
    .container {
        display: flex;
        align-items: center;
        height: 100vh;
    }
    .card {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        padding: 20px;
        width: 300px;
        border: 1px solid black;
        animation: floatAnimation 3s infinite;
    }

    .car-image {
        width: 100%;
        height: auto;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        margin-right: 20px;
        border-radius: 7px;
    }

    .car-name {
        text-align: center;
        font-weight: bold;
        margin-top: 2px;
        font-size: 25px;
        color: rgb(73, 0, 183);
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

    .numeral-concept {
        font-size: 20px;
        margin-top: 0px;
        text-align: center;
        color: white;
        background-color: black;
        width: 50px;
        border-radius: 50px;
        margin-left: auto;
        margin-right: auto;
    }

    .star-ratings {
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;
    }

    .concept {
        flex: 1;
    }

    .value {
        text-align: right;
        color: rgb(73, 0, 183);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }
</style>
