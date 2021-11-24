<template>
  <div class="attract-screen">
    <wallet-key @key-changed="onKeyChanged" />
    <wallet-data :data="data" :columns="columns" />
  </div>
</template>

<script>
import WalletKey from "../components/Header.vue";
import WalletData from "../components/WalletData.vue";

import * as web3 from "@solana/web3.js";
/* 
1. getConfirmedSignaturesForAddress2 (pubKey)
2. getAccountInfo (pubKey)
3. getConfirmedTransaction (signature)
4. getTokenAccountsByOwner
*/
console.log(web3.clusterApiUrl("mainnet-beta"));

(async () => {
  // Connect to cluster
  var connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  // Generate a new wallet keypair and airdrop SOL
  var publicKey = "8YmMhex5Vd5JPsyNhCwFPDx5vqeedpCuyFE2W7VtRXQT";
  var airdropSignature = await connection.requestAirdrop(
    publicKey,
    web3.LAMPORTS_PER_SOL
  );

  //wait for airdrop confirmation
  await connection.confirmTransaction(airdropSignature);

  // get account info
  // account data is bytecode that needs to be deserialized
  // serialization and deserialization is program specic
  let account = await connection.getAccountInfo(publicKey);
  console.log(account);
})();


// 108367915
// curl http://api.mainnet-beta.solana.com/ -X POST -H "Content-Type: application/json" -d '
//   {"jsonrpc": "2.0","id":1,"method":"getBlock","params":[108367915, {"encoding": "json","transactionDetails":"full","rewards":false}]}
// '
export default {
  name: "AttractScreen",
  components: { Header, WalletData },
  data() {
    return {
      columns: ["Hash", "Date", "Status", "Value", "Change"],
      data: [
        [
          "Load Balancer 11",
          "HTTP",
          "80",
          "Round Robin",
          "Maureen’s VM Groups"
        ],
        ["Load Balancer 4", "HTTP", "81", "Round Robin", "Maureen’s VM Groups"],
        ["Load Balancer 2", "HTTP", "82", "Round Robin", "Maureen’s VM Groups"],
        [
          "Load Balancer 3",
          "HTTP",
          "8080",
          "Round Robin",
          "Maureen’s VM Groups"
        ],
        ["Load Balancer 23", "HTTP", "1080", "Round Robin", "Max’s VM Groups"],
        ["Load Balancer 25", "HTTP", "1001", "Round Robin", "Max’s VM Groups"],
        ["Load Balancer 311", "HTTP", "280", "Round Robin", "John’s VM Groups"]
      ]
    };
  },
  methods: {
    onKeyChanged(key) {
      //   fetch key and emit data to Attract screen
      console.log(key);
    }
  }
};
</script>

<style>
.attract-screen {
  width: 70vw;
  min-height: 100vh;
  background: #262626;
  color: #ffffff;
  border-radius: 15px;
  display: flex;
  margin: 0 auto;
  padding: 3rem;
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
}
.attract-screen .bx--btn--tertiary:hover,
.attract-screen .bx--btn--tertiary:focus {
  background-color: #7c73cb;
  color: #ffffff;
}
</style>