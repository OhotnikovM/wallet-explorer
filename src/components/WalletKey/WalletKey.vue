<template>
  <div class="attract-screen_header">
    <h1 class="attract-screen_title">Wallet Explorer</h1>
    <hr />
    <div class="attract-screen_form-group">
      <cv-text-input
        :invalid-message="invalidMessage"
        v-model="accountKey"
        class="attract-screen_key-input"
        label="Account public key"
        placeholder="Enter key here"
      />
      <cv-button kind="secondary" @click="onKeyChanged">Submit</cv-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletKey",
  data() {
    return { accountKey: "", invalidMessage: "" };
  },
  methods: {
    onKeyChanged() {
      this.invalidMessage = this.accountKey
        ? ""
        : "You should enter public key";
      this.$emit("key-changed", this.accountKey);
    }
  }
};
</script>

<style scoped>
.attract-screen_header {
  width: 100%;
  text-align: center;
}

.attract-screen_title {
  margin: 3rem;
}

.attract-screen_key-input {
  width: 75%;
}
.attract-screen_key-input ::v-deep .bx--form-requirement {
  position: absolute;
  top: 68%;
}

.attract-screen_form-group {
  width: 70%;
  display: inline-flex;
  justify-content: space-around;
  align-items: end;
  margin: 2rem 1rem;
}
</style>