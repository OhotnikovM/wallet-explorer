<template>
  <cv-grid>
    <cv-row class="row">
      <cv-column :sm="1">
        <div class="cv-grid-story__preview-col">
          <h6>Address</h6>
        </div>
      </cv-column>
      <cv-column :sm="3">
        <div class="cv-grid-story__preview-col">
          <cv-code-snippet>{{ accountData.address }}</cv-code-snippet>
        </div>
      </cv-column>
    </cv-row>
    <cv-row class="row">
      <cv-column :sm="1">
        <div class="cv-grid-story__preview-col">
          <h6>Balance</h6>
        </div>
      </cv-column>
      <cv-column :sm="3">
        <div class="cv-grid-story__preview-col balance">{{ accountData.balance }} (SOL)</div>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script>
export default {
  name: "AccountOverview",
  props: {
    accountData: Object
  }
};
</script>

<style scoped>
.cv-grid-story__preview-col.balance {
  color: #000000;
}
.attract-screen_content .row.cv-row.row.bx--row {
  color: rgb(139, 139, 139);
  align-self: center;
  align-items: center;
  margin-bottom: 0.5rem;
  min-height: 40px;
}
.attract-screen_content .row.cv-row.row.bx--row .cv-colum {
  align-self: center;
}
.attract-screen_content .row.cv-row.row.bx--row:first-child {
  margin-top: 0.5rem;
}
</style>