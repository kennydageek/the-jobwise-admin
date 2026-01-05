export function formatAsMoney(number) {
  if (number)
    return `$${number?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  else return `$0.00`;
}
