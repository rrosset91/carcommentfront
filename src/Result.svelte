<script>
    import CarCard from './lib/CarCard.svelte';
    import CommentCard from './lib/CommentCard.svelte';
    import NewReviewForm from './lib/NewReviewForm.svelte';
    import { fly } from 'svelte/transition';
    import Modal from './lib/Modal.svelte';
    import FloatingButton from './lib/FloatingButton.svelte';
    let reviewModalOpen = false;
    let currentCar = {
        brand: 'Fiat',
        model: 'Palio',
        year: '2010',
    };

    function newReview(e) {
        openNewCommentModal();
    }

    function closeNewCommentModal() {
        reviewModalOpen = false;
    }

    function openNewCommentModal() {
        reviewModalOpen = true;
    }
</script>

<div id="resultcomponent">
    <div class="container">
        <div class="col-md-12"><CarCard on:newReview={newReview} /></div>
        <div transition:fly={{ y: 1000, duration: 500 }} class="row">
            <CommentCard /><CommentCard /><CommentCard /><CommentCard />
        </div>
    </div>

    <!-- New Review MODAL -->
    <Modal flex={false} textAlign="none" isOpen={reviewModalOpen} close={closeNewCommentModal}>
        <div slot="header">
            <h2 style="color: #4900B7">
                Nova avaliação: {currentCar.brand}
                {currentCar.model}
                {currentCar.year}
            </h2>
        </div>
        <div slot="content">
            <NewReviewForm />
        </div>
    </Modal>
    <FloatingButton label="🔝" animated="true" />
</div>

<style>
    #resultcomponent {
        background: rgb(131, 58, 180);
        background: linear-gradient(
            247deg,
            rgba(131, 58, 180, 0.741976014038428) 0%,
            rgba(140, 123, 255, 1) 56%,
            rgba(9, 145, 255, 1) 100%
        );
    }
</style>
