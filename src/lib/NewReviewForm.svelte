<script>
  let comment = "";
  let tipsForBuyers = "";
  let version = "";
  let generalRating = 0;
  let comfortRating = 0;
  let repairCostRating = 0;
  let fuelConsumptionRating = 0;
  let performanceRating = 0;
  let owner = "< 6 months";
  let isCurrentCar = false;
  let recommends = false;
	let avaliationPage = 1	;
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
      owner,
      isCurrentCar,
      recommends,
    };

    // You can now send this data to your backend to save it in the "reviews" table.
    console.log("Review Data:", reviewData);

    // Optionally, you can reset the form values after submission.
    resetForm();
  }

  // Function to reset the form
  function resetForm() {
    comment = "";
    tipsForBuyers = "";
    version = "";
    generalRating = 0;
    comfortRating = 0;
    repairCostRating = 0;
    fuelConsumptionRating = 0;
    performanceRating = 0;
    owner = "< 6 months";
    isCurrentCar = false;
    recommends = false;
  }
</script>
<main class="container">
	<form on:submit={submitForm}>
	  {#if avaliationPage == 1}
		<div class="form-group">
		  <label for="comment">Comentários Gerais:</label>
		  <textarea class="form-control" id="comment" bind:value={comment} rows="3" maxlength="255"></textarea>
		</div>
  
		<div class="form-group">
		  <label for="tips">Dicas a possíveis compradores:</label>
		  <textarea class="form-control" id="tips" bind:value={tipsForBuyers} rows="3" maxlength="255"></textarea>
		</div>
  
		<div class="form-group">
		  <label for="version">Qual é a versão que tens?</label>
		  <input type="text" class="form-control" id="version" bind:value={version} maxlength="100">
		</div>
		<button on:click={()=>avaliationPage++} class="btn btn-primary">Continuar</button>
	  {/if}
	  {#if avaliationPage == 2}
		<div class="row">
		  <div class="col-md-3">
			<div class="form-group">
			  <label for="comfortRating">Conforto</label>
			  <input required type="number" class="form-control" id="comfortRating" bind:value={comfortRating} min="0" max="10">
			</div>
		  </div>
  
		  <div class="col-md-3">
			<div class="form-group">
			  <label for="repairCostRating">Manutenção</label>
			  <input required type="number" class="form-control" id="repairCostRating" bind:value={repairCostRating} min="0" max="10">
			</div>
		  </div>
  
		  <div class="col-md-3">
			<div class="form-group">
			  <label for="fuelConsumptionRating">Consumo</label>
			  <input required type="number" class="form-control" id="fuelConsumptionRating" bind:value={fuelConsumptionRating} min="0" max="10">
			</div>
		  </div>
  
		  <div class="col-md-3">
			<div class="form-group">
			  <label for="performanceRating">Performance</label>
			  <input required type="number" class="form-control" id="performanceRating" bind:value={performanceRating} min="0" max="10">
			</div>
		  </div>
		</div>
  
		<div class="form-check">
			<input type="checkbox" class="form-check-input" id="isCurrentCar" bind:checked={isCurrentCar}>
			<label class="form-check-label" for="isCurrentCar">Este é meu carro atual</label>
		  </div>
	  
		  <div class="form-check">
			<input type="checkbox" class="form-check-input" id="recommends" bind:checked={recommends}>
			<label class="form-check-label  text-left" for="recommends">Recomendo este carro</label>
		  </div>
  
		<div class="form-group">
		  <label for="owner">Sou/Fui Proprietário por</label>
		  <select class="form-control" id="owner" bind:value={owner}>
			<option value="< 6 months">Menos de 6 meses</option>
			<option value="1-6 months">Entre 1 e 6 meses</option>
			<option value="1 year or more">Mais de 1 ano</option>
			<option value="5 years or more">Entre 1 e 5 anos</option>
			<option value="1 year or more">Mais de 5 anos</option>
		  </select>
		</div>
		<button on:click={()=>avaliationPage--} class="btn btn-outline-primary">Voltar</button>
		<button type="submit" class="btn btn-primary">Continuar</button>
			{/if}
  </main>
  
<style>
	div{
		margin-top: 15px;
	}

	button{
		margin-top: 30px;
	}
	textarea{
		resize: none;
	}
  </style>