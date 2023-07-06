export const displayCurrency = ({
  price,
  locale = 'en-IN',
  currency = 'INR',
}) =>
  new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
  }).format(price)

export const a = 1
