<template>
  <div>
    <!-- <cv-data-table :columns="transactionColumns" :data="transactionData" ref="table"></cv-data-table> -->
    <cv-data-table
      :columns="transactionColumns"
      :pagination="false"
      :overflow-menu="true"
      ref="table"
    >
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in transactionData"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <cv-data-table-cell>
            <input :value="row[0]" style="border: none; background: none; width: 100%;" />
          </cv-data-table-cell>
          <cv-data-table-cell>{{ row[1] }}</cv-data-table-cell>
          <cv-data-table-cell>{{ row[2] }}</cv-data-table-cell>
          <cv-data-table-cell>
            <a href="http://vue.carbondesignsystem.com">{{ row[3] }}</a>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <cv-tag :kind="row[4] > 0 ? 'green' : 'red'" :label="row[4] | addSign" />
          </cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>

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
    transactionData: Array,
    isLoading: Boolean
  },
  data() {
    return {
      transactionColumns: ["SIGNATURE", "DATE", "STATUS", "BALANCE", "CHANGE"]
    };
  },
  filters: {
    addSign(value) {
      return value > 0 ? `+${value}` : value;
    }
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