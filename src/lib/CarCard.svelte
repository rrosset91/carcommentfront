<script>
    let Mockmode = true;
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let reviewsAmount = 3;

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
                { concept: 'Consumo/Autonomia', value: 7 },
                { concept: 'Desempenho', value: 8 },
            ],
        };
    }

    function emitNewReview() {
        const customEvent = new CustomEvent('newReview', {
            detail: {
                carId: '123123',
            },
        });
        dispatch('newReview', customEvent);
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

<main transition:fly={{ y: -300, duration: 500 }}>
    <div class="card border border-primary hover-shadow">
        <div class="row g-0">
            <div class="col-md-4">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src="images/carsample.jpg" class="img-fluid car-image" />
                </div>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <p class="car-name">
                        {carData.name} <span class="numeral-concept">{carData.overallRating}</span>
                        <br />
                        {convertToEmojiRating(carData.overallRating)}<br />
                    </p>
                    <hr />
                    <p class="card-text">
                        {#each carData.specificRatings as rating}
                            <p class="star-ratings">
                                <span class="concept">{rating.concept}:</span>
                                <span class="value">
                                    {convertToEmojiRating(rating.value)}
                                    {rating.value != 10
                                        ? rating.value.toFixed(2)
                                        : rating.value.toFixed(1)}
                                </span>
                            </p>
                        {/each}
                    </p>
                    <p class="star-ratings">
                        <span class="concept">Total de avaliações:</span>
                        <span class="value">{reviewsAmount}</span>
                    </p>
                    <hr />
                    <div class="button-container">
                        <button type="button" class="btn btn-primary" on:click={emitNewReview}
                            >Avaliar</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .button-container {
        text-align: right;
        margin-top: 20px; /* Adicione margem superior para ajustar o espaço entre o conteúdo e o botão */
    }
    main {
        margin: 20px;
    }
    .card {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        padding: 20px;
        width: 100%;
        border: 1px solid black;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .car-image {
        width: 100%;
        height: auto;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        margin-right: 20px;
        border-radius: 7px;
    }

    .car-name {
        font-weight: bold;
        margin-top: 2px;
        font-size: 25px;
        color: rgb(73, 0, 183);
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
        padding: 5px;
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
