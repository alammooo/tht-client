import { ChangeEvent } from "react"

const InputFormat = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { onChangeValue: (val: number) => void }
) => {
  const addDot = (num?: string) =>
    num?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  const removeNonNumeric = (num: string) => num.replace(/[^0-9]/g, "")
  const handleBuyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputBuyPrice = Number(removeNonNumeric(event.target.value))
    props.onChangeValue(inputBuyPrice)
  }
  return (
    <input
      {...props}
      value={addDot(String(props.value))}
      onChange={handleBuyChange}
    />
  )
}

export default InputFormat
