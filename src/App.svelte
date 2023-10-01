<script>
	import ItemPicker from './components/ItemPicker.svelte';
	let selectedBrand = null;
	let selectedModel = null;
	let selectedYear = null;
	let brandDisabled = false;
	let modelDisabled = true;
	let yearDisabled = true;
	let showDetails = false;
  
	function handleItemSelected(event) {
	  const { type, name, id } = event.detail;
		console.log(event.detail);
	  if (event.detail.type === 'Marca') {
		selectedBrand = `${name} (ID: ${id})`;
		if(selectedBrand) modelDisabled = false;
	  } else if (event.detail.type === 'Modelo') {
		selectedModel = `${name} (ID: ${id})`;
		if(selectedBrand && selectedModel) yearDisabled = false;
	  } else if (event.detail.type === 'Ano') {
		selectedYear = `${name} (ID: ${id})`;
		showDetails = true;
	  }
	}
  </script>
  
  <style>
	/* Estilize seus botões e outros elementos conforme necessário */
	.button {
	  margin-right: 20px;
	}
  </style>
  
  <div class="center-content">
	<ItemPicker disabled={brandDisabled} type="Marca" on:itemSelected={handleItemSelected} />
	<ItemPicker disabled={modelDisabled} type="Modelo"  on:itemSelected={handleItemSelected} />
	<ItemPicker disabled={yearDisabled} type="Ano"  on:itemSelected={handleItemSelected} />
  
	{#if showDetails}
	  <h3>{selectedBrand + ' ' + selectedModel + ' ' + selectedYear}</h3>
	  <button>Ver Comentários</button>
	  <button>Comentar</button>
	{/if}
  </div>
  