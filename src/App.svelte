<script>
    import MainButtons from './components/MainButtons.svelte';
    import Modal from './lib/Modal.svelte';
    import ItemSelector from './components/ItemSelector.svelte';
    let selectedBrand = {};
    let selectedModel = {};
    let selectedYear;
    let brandDisabled = false;
    let modelDisabled = true;
    let yearDisabled = true;
    let showDetails = false;
    let openModal = false;
    let selectedItemId;
    let selectedItemName;
    let selectionType;
    let dataset = [];
    function closeModal() {
        openModal = false;
    }
    function handleItemSelected(event) {
        const { selectionType, name, id } = event.detail.detail;
        if (selectionType === 'Marca') {
            selectedBrand = { id, name };
            openModal = false;
            if (selectedBrand) modelDisabled = false;
        } else if (selectionType === 'Modelo') {
            selectedModel = { id, name };
            openModal = false;
            if (selectedBrand && selectedModel) yearDisabled = false;
        } else if (selectionType === 'Ano') {
            selectedYear = parseInt(name);
            openModal = false;
            showDetails = true;
        }
    }

    async function handleBtnClicked(event) {
        selectionType = event.detail.type;
        switch (event.detail.type) {
            case 'Marca':
                let cachedBrands = document.cookie.split(';').find((item) => item.includes('ccb'));
                try {
                    if (cachedBrands) {
                        dataset = JSON.parse(cachedBrands.split('=')[1]);
                    } else {
                        await fetchData(event.detail.type);
                    }
                    openModal = true;
                } catch (error) {}
                break;
            case 'Modelo':
                break;
            case 'Ano':
                break;
            default:
                break;
        }
    }

    async function fetchData(type) {
        // document.cookie = `ccb=${JSON.stringify(
        //                 fetchedResponse,
        //             )}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        //tbd
    }
</script>

<div class="centered-content">
    <img
        style="width:100%; margin-bottom: 20px;"
        src="images/logo.svg"
        alt="Logo"
        width="200"
        height="200"
    />
    <p>O que andam a dizer sobre...</p>
    <MainButtons disabled={brandDisabled} type="Marca" on:btnClicked={handleBtnClicked} />
    <MainButtons disabled={modelDisabled} type="Modelo" on:btnClicked={handleBtnClicked} />
    <MainButtons disabled={yearDisabled} type="Ano" on:btnClicked={handleBtnClicked} />
</div>
{#if showDetails}
    <div class="centered-content details">
        <h3>{selectedBrand + ' ' + selectedModel + ' ' + selectedYear}</h3>
        <button class="btn secondary">Ver Comentários</button>
        <button class="btn secondary">Comentar</button>
    </div>
{/if}
<Modal isOpen={openModal} close={closeModal}>
    <div slot="header">
        <h1>Modal Header</h1>
    </div>
    <div slot="content">
        <ItemSelector
            type={selectionType}
            data={dataset}
            bind:selectedItemId
            bind:selectedItemName
            mockMode={true}
            on:itemSelected={handleItemSelected}
        />
    </div>
    <div
        slot="footer"
        style="display: flex; justify-content: space-between; align-items: flex-end; padding: 20px;"
    >
        <button on:click={closeModal}>Close</button>
    </div>
</Modal>
<!--

-Ajustar a seléção de model
-Ajustar a seleção de year
-Ajustar paginação do modal
-Ajustar filter do modal
-Ajustar o details na posição certa
-->

<style>
    .centered-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
</style>
