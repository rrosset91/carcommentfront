<script>
    import MainButtons from './lib/MainButtons.svelte';
    import Modal from './lib/Modal.svelte';
    import Pagination from './lib/Pagination.svelte';
    import About from './lib/About.svelte';
    import ItemSelector from './lib/ItemSelector.svelte';
    import { mockResponses } from './assets/mockResponses.js';
    import LoginRegistration from './lib/LoginRegistration.svelte';
    import { fade } from 'svelte/transition';
    import Loader from './lib/Loader.svelte';
    import Result from './Result.svelte';
    let showResults = false;
    let mockMode = true;
    let isUserLogged = false;
    let isLoading = false;
    let selectedBrand = {};
    let selectedModel = {};
    let selectedYear;
    let brandDisabled = false;
    let modelDisabled = true;
    let yearDisabled = true;
    let showDetails = false;
    let openModal = false;
    let openAboutModal = false;
    let openLoginModal = false;
    let selectedItemId;
    let selectedItemName;
    let selectionType;
    let dataset = [];
    let filteredDataset;
    let filterValue;
    let pages;
    let itemsPerPage = 20;
    let currentPage = 1;
    let lastPage;

    function closeModal() {
        filterValue = '';
        openModal = false;
    }
    function closeAboutModal() {
        openAboutModal = false;
    }
    function closeLoginModal() {
        openLoginModal = false;
    }

    function filterDataset() {
        if (filterValue) {
            filteredDataset = dataset.filter((item) =>
                item.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        } else {
            filteredDataset = dataset;
        }
        paginateDataset();
    }

    function paginateDataset() {
        filteredDataset = filteredDataset.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
        );
    }

    function refreshAppState() {
        showResults = false;
        selectedBrand = {};
        selectedModel = {};
        selectedYear = null;
        brandDisabled = false;
        modelDisabled = true;
        yearDisabled = true;
        showDetails = false;
        openModal = false;
        selectedItemId = null;
        selectedItemName = null;
        selectionType = null;
    }

    function handleItemSelected(event) {
        const { selectionType, name, id } = event.detail.detail;
        if (selectionType === 'Marca') {
            selectedBrand = { id, name };
            openModal = false;
            if (selectedBrand) modelDisabled = false;
            currentPage = 1;
        } else if (selectionType === 'Modelo') {
            selectedModel = { id, name };
            openModal = false;
            if (selectedBrand && selectedModel) yearDisabled = false;
            currentPage = 1;
        } else if (selectionType === 'Ano') {
            selectedYear = parseInt(name);
            openModal = false;
            showDetails = true;
            currentPage = 1;
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
                try {
                    await fetchData(event.detail.type);
                    openModal = true;
                } catch (error) {}
                break;
            case 'Ano':
                try {
                    await fetchData(event.detail.type);
                    openModal = true;
                } catch (error) {}
                break;
            default:
                break;
        }
    }

    function handlePaginationNavigation(e) {
        currentPage = e.detail.page;
        filteredDataset = dataset.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
        );
    }

    async function fetchData(type) {
        switch (type) {
            case 'Marca':
                if (mockMode) dataset = mockResponses.brands;
                else {
                }
                break;
            case 'Modelo':
                if (mockMode) dataset = mockResponses.models;
                else {
                }
                break;
            case 'Ano':
                if (mockMode) dataset = mockResponses.years;
                else {
                }
                break;
            default:
                break;
        }
    }

    function watcher(data) {
        pages = Math.ceil(data.length / itemsPerPage);
        lastPage = pages;
        filteredDataset = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }

    $: {
        watcher(dataset);
    }
</script>

<main translate="no" transition:fade={{ delay: 150, duration: 600 }}>
    {#if isLoading}
        <Loader />
    {:else if !showResults}
        <div class="component">
            <div class="centered-content">
                <img
                    style="width:100%; margin-bottom: 20px;"
                    src="images/logo.svg"
                    alt="Logo"
                    width="200"
                    height="200"
                />
                <MainButtons
                    disabled={brandDisabled}
                    type="Marca"
                    on:btnClicked={handleBtnClicked}
                />
                <MainButtons
                    disabled={modelDisabled}
                    type="Modelo"
                    on:btnClicked={handleBtnClicked}
                />
                <MainButtons disabled={yearDisabled} type="Ano" on:btnClicked={handleBtnClicked} />
            </div>
            {#if showDetails}
                <div
                    class="centered-content details"
                    transition:fade={{ delay: 250, duration: 500 }}
                >
                    <h3>
                        {selectedBrand.name +
                            ' ' +
                            selectedModel.name +
                            ' ' +
                            selectedYear.toString()}
                    </h3>
                    <button
                        class="btn btn-secondary"
                        on:click={() => {
                            showResults = true;
                        }}>O que dizem?</button
                    >
                </div>
            {/if}
            <!-- ITEMS SELECTION MODAL -->
            <Modal on:filter={filterDataset} isOpen={openModal} close={closeModal}>
                <div slot="header">
                    <input
                        type="text"
                        id="filterInput"
                        name="filter"
                        bind:value={filterValue}
                        on:input={filterDataset}
                        placeholder="Filtrar..."
                    />
                </div>
                <div slot="content">
                    <ItemSelector
                        type={selectionType}
                        data={filteredDataset ? filteredDataset : dataset}
                        bind:selectedItemId
                        bind:selectedItemName
                        mockMode={false}
                        on:itemSelected={handleItemSelected}
                    />
                </div>
                <div
                    slot="footer"
                    style="display: flex; justify-content: space-between; align-items: flex-end; padding: 20px;"
                >
                    {#if pages > 1}
                        <Pagination {pages} on:pagination={handlePaginationNavigation} />
                    {/if}
                </div>
            </Modal>
            <!-- ABOUT MODAL -->
            <Modal isOpen={openAboutModal} close={closeAboutModal}>
                <div slot="header">
                    <h3>Sobre</h3>
                </div>
                <div slot="content">
                    <About />
                </div>
            </Modal>
            <!-- LOGIN MODAL -->
            <Modal isOpen={openLoginModal} close={closeLoginModal}>
                <div slot="header">
                    {#if isUserLogged}
                        <h3>Meu Perfil</h3>
                    {:else}
                        <h3>Entrar</h3>
                    {/if}
                </div>
                <div slot="content">
                    <LoginRegistration />
                </div>
            </Modal>
        </div>
    {:else}
        <Result
            on:refreshApp={refreshAppState}
            on:scroll={(e) => {
                console.log(e);
            }}
        />
    {/if}
</main>

<!-- To dos:
	NAVBAR ARRUMAR OS ITENS PARA FUNCIONAREM, E INCLUSIVE O REFRESH
	CRIAR LOGICA DE ISLOGGEDIN
	CRIAR BOTAO DE PARA O TOPO
	
MUDAR PARA SVELTEKIT====
implementar localstorage e sessionstorage
Implementar página meu perfil
repensar o logo
RESPONSIVIDADE DOS MODAIS
-->

<style>
    main {
        height: 100vh;
    }
    .component {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .centered-content {
        text-align: center;
        margin-top: 20px;
        border-radius: 5px;
    }

    .details {
        margin-top: 20px;
        border: 1px solid #ccc;
        padding: 10px;
    }
    input[type='text'] {
        width: 90%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
</style>
