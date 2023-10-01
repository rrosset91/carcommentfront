<script>
	import { createEventDispatcher } from 'svelte';
	export let type = '';
	export let disabled = true;
	let typeName = type;
	const dispatch = createEventDispatcher();
  
	function selectItem(typeName) {
	  dispatch('itemSelected', { type:typeName, name: 'Fusca', id: 1 });
	}
  </script>
  
  <button disabled={disabled} on:click={() => selectItem(typeName)}>{typeName}</button>
 