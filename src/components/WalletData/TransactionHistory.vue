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
        <cv-data-table-row v-for="(row, rowIndex) in transactionData" :key="String(rowIndex)">
          <cv-data-table-cell>
            <cv-code-snippet>{{ row[0] }}</cv-code-snippet>
          </cv-data-table-cell>
          <cv-data-table-cell>{{ row[1] }}</cv-data-table-cell>
          <cv-data-table-cell>
            <span :class="row[2].includes('Success') ? 'green' : 'red'">{{ row[2] }}</span>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <span>◎{{ row[3] }}</span>
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
      transactionColumns: ["Signature", "Date", "Status", "Balance", "Change"]
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

.green {
  color: #26e97e;
}
.red {
  color: #ff0000;
}
 ::v-deep .bx--data-table th:last-of-type {
  display: none;
}
</style>