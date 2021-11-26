import dateFormat from "dateformat";
import { BigNumber } from "bignumber.js";

export function getTransactionBalance(accountKeys, meta, pubKey, LAMPORT) {
  const accountIdx = accountKeys.findIndex(
    i => i.pubkey.toString() === pubKey.toString()
  );

  const pre = (meta.preBalances[accountIdx] * LAMPORT).toFixed(9);
  const post = (meta.postBalances[accountIdx] * LAMPORT).toFixed(9);
  const delta = (new BigNumber(post).minus(new BigNumber(pre))).toFixed(5);

  return { pre, post, delta};
}

export async function fetchParsedTransactions(
  connection,
  transactionSignatures,
  pubKey,
  LAMPORT
) {
  const fetched = await connection.getParsedConfirmedTransactions(
    transactionSignatures
  );

  return fetched.map(({ blockTime, meta, transaction }, index) => {
    const { post, delta } = getTransactionBalance(
      transaction.message.accountKeys,
      meta,
      pubKey,
      LAMPORT
    );

    return [
      transactionSignatures[index],
      dateFormat(blockTime * 1000, "mm/dd/yyyy, h:MM"),
      meta.status.hasOwnProperty("Ok") ? "Success" : "Failed",
      post,
      delta
    ];
  });
}

export async function getAccountInfo(pubKey, connection, LAMPORT) {
  const balance = await connection.getBalance(pubKey);
  return { balance: balance * LAMPORT, address: pubKey };
}
