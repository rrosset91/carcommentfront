<script>
    import { fly } from 'svelte/transition';

    let comment = '';
    let totalConcepts = 5;
    let tipsForBuyers = '';
    let version = '';
    let commmentCharsLeft = 255;
    let tipsCharsLeft = 255;
    let generalRating = 0;
    let submitReviewEnabled = false;
    let comfortRating = 0;
    let repairCostRating = 0;
    let fuelConsumptionRating = 0;
    let reliabilityRating = 0;
    let performanceRating = 0;
    let ownerTime = '< 6 months';
    let fuel = 'Gasolina';
    let isCurrentCar = false;
    let recommends = false;
    let avgScore =
        (comfortRating +
            repairCostRating +
            fuelConsumptionRating +
            reliabilityRating +
            performanceRating) /
        totalConcepts;
    let avaliationPage = 1;
    // Function to submit the form
    function submitForm() {
        const reviewData = {
            comment,
            tipsForBuyers,
            version,
            generalRating,
            comfortRating,
            repairCostRating,
            fuelConsumptionRating,
            performanceRating,
            ownerTime,
            isCurrentCar,
            recommends,
        };

        // You can now send this data to your backend to save it in the "reviews" table.
        console.log('Review Data:', reviewData);

        // Optionally, you can reset the form values after submission.
        resetForm();
    }

    // Function to reset the form
    function resetForm() {
        comment = '';
        tipsForBuyers = '';
        version = '';
        generalRating = 0;
        comfortRating = 0;
        repairCostRating = 0;
        fuelConsumptionRating = 0;
        performanceRating = 0;
        ownerTime = '< 6 months';
        isCurrentCar = false;
        recommends = false;
    }

    function handleCharactersLeft(e) {
        if (e.target.id == 'tips') tipsCharsLeft = 255 - e.target.value.length;
        else commmentCharsLeft = 255 - e.target.value.length;
    }
</script>

<main class="container">
    <form on:submit={submitForm}>
        {#if avaliationPage == 1}
            <div transition:fly={{ x: 300, duration: 200 }}>
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="comfortRating">Conforto</label>
                            <input
                                required
                                type="number"
                                class="form-control"
                                id="comfortRating"
                                bind:value={comfortRating}
                                min="0"
                                max="10"
                            />
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="repairCostRating">Manutenção</label>
                            <input
                                required
                                type="number"
                                class="form-control"
                                id="repairCostRating"
                                bind:value={repairCostRating}
                                min="0"
                                max="10"
                            />
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="fuelConsumptionRating"
                                >{fuel == 'Eléctrico' ? 'Autonomia' : 'Consumo'}</label
                            >
                            <input
                                required
                                type="number"
                                class="form-control"
                                id="fuelConsumptionRating"
                                bind:value={fuelConsumptionRating}
                                min="0"
                                max="10"
                            />
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="performanceRating">Performance</label>
                            <input
                                required
                                type="number"
                                class="form-control"
                                id="performanceRating"
                                bind:value={performanceRating}
                                min="0"
                                max="10"
                            />
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="reliabilityRating">Fiabilidade</label>
                            <input
                                required
                                type="number"
                                class="form-control"
                                id="reliabilityRating"
                                bind:value={reliabilityRating}
                                min="0"
                                max="10"
                            />
                        </div>
                    </div>
                    <div class="col-md-1" />
                </div>

                <div class="form-check">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        id="isCurrentCar"
                        bind:checked={isCurrentCar}
                    />
                    <label class="form-check-label" for="isCurrentCar">Este é meu carro atual</label
                    >
                </div>

                <div class="form-check">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        id="recommends"
                        bind:checked={recommends}
                    />
                    <label class="form-check-label text-left" for="recommends"
                        >Recomendo este carro</label
                    >
                </div>

                <div class="form-group">
                    <label for="ownerTime">Sou/Fui Proprietário por</label>
                    <select class="form-control" id="ownerTime" bind:value={ownerTime}>
                        <option value="Menos de 6 meses">Menos de 6 meses</option>
                        <option value="Entre 1 e 6 meses">Entre 1 e 6 meses</option>
                        <option value="Mais de 1 ano">Mais de 1 ano</option>
                        <option value="Entre 1 e 5 anos">Entre 1 e 5 anos</option>
                        <option value="Mais de 5 anos">Mais de 5 anos</option>
                    </select>
                </div>

                <button on:click={() => avaliationPage++} class="btn btn-primary">Continuar</button>
            </div>
        {/if}
        {#if avaliationPage == 2}
            <div transition:fly={{ x: 300, duration: 200 }}>
                <div class="form-group">
                    <label for="comment">Comentários Gerais:</label>
                    <textarea
                        on:keyup={handleCharactersLeft}
                        class="form-control"
                        id="comment"
                        bind:value={comment}
                        rows="3"
                        maxlength="255"
                    />
                    <p class="charsleft">{commmentCharsLeft} caracteres restantes</p>
                </div>

                <div class="form-group">
                    <label for="tips">Dicas a possíveis compradores:</label>
                    <textarea
                        on:keyup={handleCharactersLeft}
                        class="form-control"
                        id="tips"
                        bind:value={tipsForBuyers}
                        rows="3"
                        maxlength="255"
                    />
                    <p class="charsleft">{tipsCharsLeft} caracteres restantes</p>
                </div>
                <div class="row">
                    <div class="form-group col-6">
                        <label for="version">Versão</label>
                        <input
                            type="text"
                            placeholder="Ex: 1.6 CDI Turbo"
                            class="form-control"
                            id="version"
                            bind:value={version}
                            maxlength="100"
                        />
                    </div>
                    <div class="form-group col-6">
                        <label for="fuel">Combustível</label>
                        <select class="form-control" id="fuel" bind:value={fuel}>
                            <option value="Gasolina">Gasolina</option>
                            <option value="Gasóleo">Gasóleo</option>
                            <option value="Eléctrico">Eléctrico</option>
                            <option value="GPL">GPL</option>
                        </select>
                    </div>
                </div>
                <button on:click={() => avaliationPage--} class="btn btn-outline-primary"
                    >Voltar</button
                >
                <button on:click={() => avaliationPage++} class="btn btn-primary">Continuar</button>
            </div>
        {/if}
        {#if avaliationPage == 3}
            <div transition:fly={{ x: 50, duration: 200 }}>
                <div class="review-overview">
                    <h4>Média Geral: {avgScore}</h4>
                    <hr />
                    <p><strong>Comentários Gerais:</strong></p>
                    <p>{comment}</p>

                    <p><strong>Dicas a possíveis compradores:</strong></p>
                    <p>{tipsForBuyers}</p>

                    <p><strong>Versão:</strong> {version}</p>

                    <div class="d-flex">
                        <p><strong>Conforto:</strong></p>
                        <span class="mr-3"><p class="rating-value">{comfortRating}</p></span>

                        <p><strong>Manutenção:</strong></p>
                        <span class="mr-3"><p class="rating-value">{repairCostRating}</p></span>

                        <p><strong>Consumo:</strong></p>
                        <span class="mr-3"><p class="rating-value">{fuelConsumptionRating}</p></span
                        >
                        <p><strong>Fiabilidade:</strong></p>
                        <span class="mr-3"><p class="rating-value">{reliabilityRating}</p></span>
                        <p><strong>Performance:</strong></p>
                        <span class="mr-3"><p class="rating-value">{performanceRating}</p></span>
                    </div>

                    <p><strong>Este é meu carro atual:</strong> {isCurrentCar ? 'Sim' : 'Não'}</p>
                    <p><strong>Recomendo este carro:</strong> {recommends ? 'Sim' : 'Não'}</p>

                    <p><strong>Sou/Fui Proprietário por:</strong> {ownerTime}</p>

                    <button on:click={() => avaliationPage--} class="btn btn-outline-primary"
                        >Voltar</button
                    >
                    <button type="submit" disabled={!submitReviewEnabled} class="btn btn-primary"
                        >Continuar</button
                    >
                </div>
            </div>
        {/if}
    </form>
</main>

<style>
    div {
        margin-top: 15px;
    }

    button {
        margin-top: 30px;
    }
    textarea {
        resize: none;
    }
    .charsleft {
        font-size: 10px;
        color: #5f5f5f;
    }
    ::placeholder {
        color: #c0c0c0;
        opacity: 0.9; /* Firefox */
    }
    .mr-3 {
        margin-right: 10px;
    }
    .rating-value {
        margin-left: 5px;
    }
</style>
