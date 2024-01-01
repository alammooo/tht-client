import { CatDropdown } from "@/components/shared/category/Dropdown"
import ProductTable from "./Table"
import { useRouter } from "next/router"
import { Counter } from "@/features/counter/Counter"
import CategoryList from "@/features/category/CategoryList"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"
import { useAppDispatch } from "@/app/hooks"
import { fetchProduct } from "@/features/product/productSlice"

export default function ProductList() {
  const router = useRouter()
  const [value, setValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(value, 500)
  const dispatch = useAppDispatch()

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  console.log(value, "HALLO VALUE✅✅✅✅✅")

  useEffect(() => {
    dispatch(
      fetchProduct({
        name: debouncedValue,
      })
    )
  }, [debouncedValue])

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='font-bold text-2xl'>Daftar Produk</h1>
      <div className='flex justify-between'>
        <div className='flex gap-7'>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-white focus:border-white'
              placeholder='Cari Barang...'
              required
              onChange={handleSearch}
            />
          </div>
          <CategoryList />
        </div>
        <div className='flex gap-7'>
          <button
            type='button'
            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2 me-2 mb-2'>
            Export Excel
          </button>
          <button
            type='button'
            onClick={() => router.push("/product/create")}
            className='focus:outline-none text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-5 py-2 me-2 mb-2'>
            Tambahkan Produk
          </button>
        </div>
      </div>
      <ProductTable />
    </div>
  )
}
