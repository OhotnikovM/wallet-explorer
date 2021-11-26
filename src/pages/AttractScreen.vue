<template>
  <div class="attract-screen">
    <wallet-key @key-changed="getWalletData" />
    <wallet-data
      @load-more="onLoadMore"
      :account-data="accountData"
      :transaction-data="transactionData"
    />
  </div>
</template>

<script>
import WalletKey from "../components/WalletKey.vue";
import WalletData from "../components/WalletData.vue";
import * as web3 from "@solana/web3.js";

import {
  fetchParsedTransactions,
  getAccountInfo
} from "../helpers/providers.js";

export default {
  name: "AttractScreen",
  components: { WalletKey, WalletData },
  data() {
    return {
      accountData: {
        balance: 0,
        address: ""
      },
      transactionData: [],
      LAMPORT: 0.000000001,
      signatureLimit: 20,
      lastSignature: ""
    };
  },
  methods: {
    async getWalletData(key) {
      const pubKey = new web3.PublicKey(key);

      const connection = new web3.Connection(
        web3.clusterApiUrl("mainnet-beta"),
        "confirmed"
      );

      this.accountData = await getAccountInfo(pubKey, connection, this.LAMPORT);

      const confirmedData = await connection.getConfirmedSignaturesForAddress2(
        pubKey,
        { limit: this.signatureLimit }
      );

      const confirmedSignatures = confirmedData.map(i => i.signature);
      this.lastSignature = confirmedSignatures[confirmedData.length - 1];

      this.transactionData = await fetchParsedTransactions(
        connection,
        confirmedSignatures,
        pubKey,
        this.LAMPORT
      );

    },
    onLoadMore() {}
  }
};
</script>

<style>
.attract-screen {
  width: 90vw;
  min-height: 100vh;
  background: #262626;
  color: #ffffff;
  border-radius: 15px;
  display: flex;
  margin: 0 auto;
  padding: 2rem 0;
  align-items: center;
  flex-direction: column;
}

.attract-screen .bx--label {
  color: #ffffff;
}

.attract-screen .cv-button {
  min-height: auto;
  margin-left: 1rem;
}

.attract-screen .bx--text-input {
  background-color: rgb(72 71 71);
  color: #ffffff;
}

.attract-screen .bx--accordion--start .bx--accordion__content {
  padding: 0px;
  margin: 0px;
}

.attract-screen .bx--btn--tertiary {
  color: #7c73cb;
  border-color: #7c73cb;
}

.attract-screen .bx--btn--tertiary:hover,
.attract-screen .bx--btn--tertiary:focus {
  background-color: #7c73cb;
  color: #ffffff;
  border-color: #7c73cb;
}

.attract-screen .bx--text-input:focus,
.bx--text-input:active {
  outline: 2px solid #7c73cb;
}

.attract-screen .bx--accordion__heading:focus::before {
  border: 2px solid #7c73cb;
}
</style>