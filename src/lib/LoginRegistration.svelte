<script>
	export let isUserLogged = false;
</script>
{#if isUserLogged}
<div>
	<img src="images/avatar.svg" alt="Foto do usuário" />
	<h3>Nome do usuário</h3>
	<p>
		Commodo nostrud voluptate tempor ut adipisicing elit nisi aliqua sit
		ut. Fugiat mollit aliqua sint culpa dolore nostrud ut deserunt
		tempor elit
	</p>
</div>
{:else}
<div>
	<input type="text" placeholder="Usuário" />
	<input type="text" placeholder="Senha" />
	<button class="btn primary">Entrar</button>
</div>
{/if}