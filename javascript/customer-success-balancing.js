/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway,
) {
  const allCss = customerSuccess.map((cs) => ({ id: cs.id, score: cs.score }));
  const csAway = customerSuccessAway || [];

  const availableCSs = allCss.filter((cs) => !csAway.includes(cs.id));

  const csScores = availableCSs.sort((a, b) => a.score - b.score);
  const customerScores = customers.sort((a, b) => a.score - b.score);

  let csIndex = 0;
  let customerIndex = 0;
  let customerCountByCS = Array(availableCSs.length).fill(0);

  while (csIndex < availableCSs.length && customerIndex < customers.length) {
    if (customerScores[customerIndex].score <= csScores[csIndex].score) {
      customerCountByCS[csIndex]++;
      customerIndex++;
    } else {
      csIndex++;
    }
  }

  const maxCustomerCount = Math.max(...customerCountByCS);

  if (
    customerCountByCS.filter((count) => count === maxCustomerCount).length > 1
  ) {
    return 0; // Empate
  }

  const maxCustomerIndex = customerCountByCS.findIndex(
    (count) => count === maxCustomerCount,
  );

  return csScores[maxCustomerIndex].id;
}
module.exports = { customerSuccessBalancing };
