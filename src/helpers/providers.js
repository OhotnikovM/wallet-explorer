import dateFormat from "dateformat";
import { BigNumber } from "bignumber.js";

const LAMPORT = 0.000000001;

export function getActualBalance(accountKeys, meta, pubKey) {
  const accountIdx = accountKeys.findIndex(
    key => key.pubkey.toString() === pubKey.toString()
  );
  const pre = (meta.preBalances[accountIdx] * LAMPORT).toFixed(9);
  const post = (meta.postBalances[accountIdx] * LAMPORT).toFixed(9);
  const delta = new BigNumber(post).minus(new BigNumber(pre)).toFixed(6);

  return { pre, post, delta };
}

export async function getParsedTransactions(
  connection,
  transactionSignatures,
  pubKey
) {
  const confirmedTransactions = await connection.getParsedConfirmedTransactions(
    transactionSignatures
  );

  return confirmedTransactions.map(
    ({ blockTime, meta, transaction }, index) => {
      const { post, delta } = getActualBalance(
        transaction.message.accountKeys,
        meta,
        pubKey
      );

      return [
        transactionSignatures[index],
        dateFormat(blockTime * 1000, "mm/dd/yyyy, h:MM"),
        meta.status.hasOwnProperty("Ok") ? "Success" : "Failed",
        post,
        delta
      ];
    }
  );
}

export async function getAccountInfo(pubKey, connection) {
  const balance = await connection.getBalance(pubKey);
  return { balance: balance * LAMPORT, address: pubKey };
}
