export async function fetchParsedTransactions(
  connection,
  transactionSignatures
) {
  const transactionMap = new Map();

  const fetched = await connection.getParsedConfirmedTransactions(
    transactionSignatures
  );
  fetched.forEach((parsed, index) => {
    if (parsed !== null) {
      transactionMap.set(transactionSignatures[index], parsed);
    }
  });

  return transactionMap;
}

export async function getAccountInfo(pubKey, connection, LAMPORT) {
  const balance = await connection.getBalance(pubKey);
  return { balance: balance * LAMPORT, address: pubKey };
}
