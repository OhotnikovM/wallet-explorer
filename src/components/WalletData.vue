<template>
  <div class="attract-screen_content">
    <cv-accordion ref="acc">
      <cv-accordion-item>
        <template slot="title">Wallet tokens ($)</template>
        <template slot="content">
          <cv-data-table :columns="columns" :data="data" ref="table"></cv-data-table>
        </template>
      </cv-accordion-item>
    </cv-accordion>
  </div>
</template>

<script>
export default {
  name: "WalletData",
  props: {
    data: {
      type: [Array],
      default: []
    },
    columns: {
      type: [String],
      default: []
    }
  }
};
</script>

<style scoped>
.attract-screen_content {
  width: 95%;
  background: #ffffff;
}
</style>