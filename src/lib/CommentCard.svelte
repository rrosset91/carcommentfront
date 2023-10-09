<script>
    export let review = {};
    let userId = '123123';
    let mockMode = true;
    let alreadyVotedUp = false;
    let alreadyVotedDown = false;
    let reviewData = {
        author_id: '123123',
        id: '1123123',
        likes: 2,
        dislikes: 1,
        date: '01/10/2023',
        userName: 'Usuário Exemplo',
        avatarUrl: 'url-da-foto',
        generalComment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl nec ultrices ultricies, nunc nisl aliquam nunc, nec aliquet nunc nisl nec nunc.',
        buyerTips:
            'Ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl nec ultrices ultricies, nunc nisl aliquam nunc, nec aliquet nunc nisl nec nunc.',
        isCurrentCar: true,
        version: '1.6 CDI',
        ownershipDuration: '5 anos',
        recommendation: true,
        ratings: {
            overall: 9,
            comfort: 8,
            maintenance: 9,
            reliability: 8,
            fuelConsumption: 7,
            performance: 9,
        },
    };
    if (mockMode) review = reviewData;

    let likeClass = '';
    let dislikeClass = '';

    function handleLike() {
        if (alreadyVotedDown) {
            review.dislikes--;
            alreadyVotedDown = false;
        }
        if (alreadyVotedUp) return;
        review.likes++;
        likeClass = 'active-like-dislike';
        dislikeClass = '';
        alreadyVotedUp = true;
    }

    function handleDislike() {
        if (alreadyVotedUp) {
            review.likes--;
            alreadyVotedUp = false;
        }
        if (alreadyVotedDown) return;
        review.dislikes++;
        likeClass = '';
        dislikeClass = 'active-like-dislike';
        alreadyVotedDown = true;
    }

    function handleEdit() {
        console.log('Editando', review.id);
    }

    function handleDelete() {
        console.log('Deletando', review.id);
    }
</script>

<div class="col-sm-6">
    <div class="card hover-shadow">
        <div class="review-header">
            <div class="user-info">
                <p>Em {review.date} {review.userName} disse</p>
            </div>
            <div class="user-avatar">
                <img src="images/avatar.svg" alt="Foto do usuário" />
            </div>
        </div>
        <div class="review-content">
            <label>Comentário</label>
            <p class="buyer-tips">{review.generalComment}</p>
            <label>Dicas a possíveis compradores:</label>
            <p class="buyer-tips">{review.buyerTips}</p>
            <label>Versão que {review.isCurrentCar ? 'possui' : 'possuiu'}</label>
            <p class="buyer-tips">{review.version}</p>
        </div>
        <div class="review-details">
            <div class="owner-info" />
        </div>
        <div class="ratings">
            <div class="container">
                <div class="row">
                    <div class="rating-item">
                        <p class="label">Geral</p>
                        <p class="value">{review.ratings.overall}</p>
                    </div>
                    <div class="rating-item">
                        <p class="label">Conforto</p>
                        <p class="value">{review.ratings.comfort}</p>
                    </div>
                    <div class="rating-item">
                        <p class="label">Manutenção</p>
                        <p class="value">{review.ratings.maintenance}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="rating-item">
                        <p class="label">Fiabilidade</p>
                        <p class="value">{review.ratings.reliability}</p>
                    </div>
                    <div class="rating-item">
                        <p class="label">Consumo</p>
                        <p class="value">{review.ratings.fuelConsumption}</p>
                    </div>
                    <div class="rating-item">
                        <p class="label">Desempenho</p>
                        <p class="value">{review.ratings.performance}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="rating-item">
                        <p class="label">
                            {review.isCurrentCar ? 'Proprietário a' : 'Proprietário por'}
                        </p>
                        <p class="value">{review.ownershipDuration}</p>
                    </div>
                    <div class="rating-item">
                        <p class="label">Carro atual?</p>
                        <p class="value">{review.isCurrentCar ? 'Sim' : 'Não'}</p>
                    </div>
                    <div class="rating-item">
                        <p class="label">Recomenda</p>
                        <p class="value">{review.recommendation ? 'Sim' : 'Não'}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="votes">
                <i
                    class="fa fa-thumbs-up fa-1x like {likeClass}"
                    on:click={handleLike}
                    aria-hidden="true"
                />
                <span>{review.likes}</span>
                <i
                    class="fa fa-thumbs-down fa-1x like {dislikeClass}"
                    on:click={handleDislike}
                    aria-hidden="true"
                />
                <span>{review.dislikes}</span>
            </div>
            {#if userId === review.author_id}
                <div class="actions">
                    <i class="fas fa-edit" on:click={handleEdit} style="color: #4900b7;" />
                    <i class="fa-solid fa-trash" on:click={handleDelete} style="color: #4900b7;" />
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .card {
        margin-bottom: 20px;
    }
    .footer {
        display: flex;
        margin-top: 10px;
        justify-content: space-between; /* Alinha os elementos à esquerda e à direita */
        align-items: center; /* Centraliza verticalmente */
    }

    .actions > i {
        margin: 5px;
        cursor: pointer;
    }

    .votes > i:hover {
        color: rgb(73, 0, 183);
    }

    .active-like-dislike {
        color: rgb(73, 0, 183);
    }
    .rating {
        display: inline-block;
        width: 100%;
        text-align: center;
    }

    .like,
    .dislike {
        display: inline-block;
        cursor: pointer;
        margin: 10px;
    }

    .dislike i:hover,
    .like i:hover {
        color: rgb(73, 0, 183);
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
    .review-card {
        border: 1px solid black;
        border-radius: 5px;
        padding: 15px;
        margin: 20px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        background-color: white;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    }

    .review-header {
        display: flex;
        align-items: center;
        justify-content: space-between; /* Alinhe os elementos à direita */
        margin-bottom: 10px;
    }

    .user-avatar img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    }

    .user-info p {
        font-weight: bold;
        font-size: 20px;
        color: rgb(73, 0, 183);
    }

    label {
        font-size: 14px; /* Alterado o tamanho da fonte */
        margin-top: 10px;
        font-weight: 600;
    }

    .buyer-tips {
        font-size: 14px; /* Tamanho de fonte para os parágrafos */
        font-style: italic;
        color: #777;
        margin-bottom: 5px; /* Reduzido o espaçamento inferior dos parágrafos */
    }

    .review-details {
        display: flex;
        justify-content: space-between;
    }

    .ratings {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center; /* Centralize verticalmente */
        flex-wrap: wrap; /* Quebre para a próxima linha se necessário */
    }

    .rating-item {
        text-align: center; /* Centralize horizontalmente */
        flex: 1; /* Expanda igualmente em largura */
        margin: 5px;
    }

    .label {
        font-size: 15px;
        border-radius: 20px;
        background-color: black;
        color: white;
    }

    .owner-info {
        font-size: 7px;
        text-align: center;
    }
    p {
        margin: 0;
    }
</style>
