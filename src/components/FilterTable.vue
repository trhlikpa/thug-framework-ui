<template>
  <div class="row">
    <div class="form-inline form-group page-form">
      <label class="control-label">Show</label>
      <select class="form-control input-sm">
          <option value=5>5</option>
					<option value=10>10</option>
					<option value=25>25</option>
					<option value=50>50</option>
					<option value=100>100</option>
				</select>
      <label class="control-label">Entries</label>
    </div>
    <div class="form-inline form-group pull-right">
      <label class="control-label">Search:</label>
      <input class="form-control">
      <button class="btn btn-default">Go</button>
      <button class="btn btn-default">Advanced search</button>
    </div>
  </div>
</template>

<style scoped>
  .row {
    justify-content: space-between;
    display: flex;
  }
  
  .page-form {
    width: 20%;
    float: left;
    margin-right: auto;
  }
  
  .control-label {
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
  }

</style>
