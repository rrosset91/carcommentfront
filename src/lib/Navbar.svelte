<script>
    export let display = true;
    let style = display ? 'block' : 'hidden';
    let isUserLogged = false;
    let loginLabel = isUserLogged ? 'Meu Perfil' : 'Entrar';
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

{#if display}
    <main>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <!-- Container wrapper -->
            <div class="container-fluid">
                <!-- Toggle button -->
                <button
                    class="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i class="fas fa-bars" />
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <a class="navbar-brand mt-2 mt-lg-0" href="#">
                        <img
                            src="images/favicon.svg"
                            height="30"
                            alt="Carro Comentario Logo"
                            loading="lazy"
                            on:click={() => {
                                dispatch('refreshApp');
                            }}
                        />
                    </a>
                    <!-- Left links -->
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                                on:click={() => {
                                    dispatch('openModal', 'about');
                                }}>Sobre</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                                on:click={() => {
                                    dispatch('openModal', 'about');
                                }}>Sobre</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                                on:click={() => {
                                    dispatch('openModal', 'about');
                                }}>Sobre</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                                on:click={() => {
                                    dispatch('openModal', 'about');
                                }}>Sobre</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                                on:click={() => {
                                    dispatch('openModal', 'about');
                                }}>Sobre</a
                            >
                        </li>
                    </ul>
                    <!-- Left links -->
                </div>
                <!-- Collapsible wrapper -->

                <!-- Right elements -->
                <div class="d-flex align-items-center">
                    <!-- Avatar -->
                    <div class="dropdown">
                        <a
                            class="dropdown-toggle d-flex align-items-center hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuAvatar"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                class="rounded-circle"
                                height="25"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                            />
                        </a>

                        <ul
                            class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuAvatar"
                        >
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    on:click={() => {
                                        dispatch(
                                            'openModal',
                                            isUserLogged ? 'my-profile' : 'login',
                                        );
                                    }}>{loginLabel}</a
                                >
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Right elements -->
            </div>
            <!-- Container wrapper -->
        </nav>
    </main>
{/if}
