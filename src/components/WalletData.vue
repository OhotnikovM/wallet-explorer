<template>
  <div class="attract-screen_content">
    <cv-accordion ref="acc">
      <cv-accordion-item :open="true">
        <template slot="title">
          <h5>Account Overview</h5>
        </template>
        <template slot="content">
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
      </cv-accordion-item>
      <cv-accordion-item>
        <template slot="title">
          <h5>Transaction History</h5>
        </template>
        <template slot="content">
          <cv-data-table :columns="transactionColumns" :data="transactionData" ref="table"></cv-data-table>
          <cv-button v-show="!transactionData" @click="$emit('load-more')" class="attract-screen_load_more">
            <span v-if="!isLoading">Load more</span>
            <span v-else class="spinner"></span>
          </cv-button>
        </template>
      </cv-accordion-item>
    </cv-accordion>
  </div>
</template>

<script>
export default {
  name: "WalletData",
  props: {
    accountData: Object,
    transactionData: Array
  },
  data() {
    return {
      isLoading: false,
      accountColumns: ["Address", "Balance (SOL)"],
      transactionColumns: ["Hash", "Date", "Status", "Value", "Change"]
    };
  }
};
</script>

<style scoped>
.attract-screen_content {
  width: 95%;
  background: #ffffff;
}
.attract-screen_load_more.cv-button.bx--btn.bx--btn--primary {
  margin: 0.2rem;
  width: 99%;
  min-height: 42px;
  text-align: center;
  max-width: none;
  display: block;
  background-color: #7c73cb;
}

.attract-screen_load_more.cv-button.bx--btn--primary:focus {
  border-color: #7c73cb;
  box-shadow: inset 0 0 0 1px #7c73cb, inset 0 0 0 2px #ffffff;
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
.attract-screen_content ::v-deep .bx--snippet .cv-feedback-button.bx--copy-btn:focus {
  outline: 2px solid #7c73cb;
  outline-offset: -2px;
  outline-color: #7c73cb;
}
.cv-grid-story__preview-col.balance {
  color: #000000;
}
</style>