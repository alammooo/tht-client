import ProductForm from "./Form"
import { MdArrowForwardIos } from "react-icons/md"

export default function ProductList() {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-4 items-center'>
        <h1 className='font-bold text-2xl text-gray-300'>Daftar Produk</h1>
        <h1 className='font-bold'>
          <MdArrowForwardIos />
        </h1>
        <h1 className='font-bold text-2xl'>Tambah Produk</h1>
      </div>
      <ProductForm />
    </div>
  )
}
