<template>
  <div class="attract-screen_content">
    <cv-accordion ref="acc">
      <cv-accordion-item :open="true">
        <template slot="title">
          <h5>Account Overview</h5>
        </template>
        <template slot="content">
          <account-overview :account-data="accountData" />
        </template>
      </cv-accordion-item>
      <cv-accordion-item class="attract-screen_transaction_history">
        <template slot="title">
          <h5>Transaction History</h5>
        </template>
        <template slot="content">
          <transaction-history @load-more="$emit('load-more')" :transaction-data="transactionData" :is-loading="isLoading" />
        </template>
      </cv-accordion-item>
    </cv-accordion>
  </div>
</template>

<script>
import AccountOverview from "./AccountOverview.vue";
import TransactionHistory from "./TransactionHistory.vue";

export default {
  name: "WalletData",
  components: { AccountOverview, TransactionHistory },
  props: {
    accountData: Object,
    transactionData: Array
  },
  data() {
    return {
      isLoading: false
    };
  }
};
</script>

<style scoped>
.attract-screen_content {
  width: 90%;
  background: #ffffff;
}

.attract-screen_content
  ::v-deep
  .bx--snippet
  .cv-feedback-button.bx--copy-btn:focus {
  outline: 2px solid #7c73cb;
  outline-offset: -2px;
  outline-color: #7c73cb;
}
</style>