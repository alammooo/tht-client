export const formatAsRupiah = (amount: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
  return formatter.format(amount)
}
