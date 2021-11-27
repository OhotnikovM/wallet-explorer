<template>
  <div>
    <cv-data-table :columns="transactionColumns" :data="transactionData" ref="table"></cv-data-table>
    <cv-button
      v-if="transactionData.length"
      @click="$emit('load-more')"
      class="attract-screen_load_more"
    >
      <span v-if="!isLoading">Load more</span>
      <span v-else class="spinner"></span>
    </cv-button>
  </div>
</template>

<script>
export default {
  name: "TransactionHistory",
  props: {
    transactionData: Array
  },
  data() {
    return {
      transactionColumns: ["SIGNATURE", "DATE", "STATUS", "BALANCE", "CHANGE"]
    };
  }
};
</script>

<style scoped>
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
</style>