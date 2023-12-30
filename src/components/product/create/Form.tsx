import { CatDropdown } from "@/components/shared/category/Dropdown"
import { formatAsRupiah } from "@/utils/rupiahFormat"
import { ChangeEvent, useState } from "react"

export default function ProductForm() {
  const [inputBuy, setInputBuy] = useState(0)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let amount = parseFloat(event.target.value.replace(/[^\d.-]/g, "")) // Extract numerical value
    console.log(amount)
    // if (!isNaN(amount)) {
    //   setInputBuy(formatAsRupiah(amount)) // Format as Indonesian Rupiah
    // } else {
    //   setInputBuy("") // Clear input if invalid number
    // }
  }

  // console.log(inputBuy, "HALLO INPUTBUY")
  return (
    <form>
      <div className='grid gap-6 mb-6 md:grid-cols-3'>
        <div>
          <label
            htmlFor='category'
            className='block mb-2 text-sm font-semibold text-gray-900'>
            Kategori
          </label>
          <CatDropdown />
        </div>
        <div className='col-span-2'>
          <label
            htmlFor='barang'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Masukkan nama barang
          </label>
          <input
            type='barang'
            id='barang'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Masukkan nama barang'
            required
          />
        </div>
        <div>
          <label
            htmlFor='buyPrice'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Harga Beli
          </label>
          <input
            type='text'
            id='buyPrice'
            // value={inputBuy}
            onChange={handleInputChange}
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Rp.'
            required
          />
        </div>
        <div>
          <label
            htmlFor='sellPrice'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Harga Jual
          </label>
          <input
            type='number'
            id='sellPrice'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Rp.'
            required
          />
        </div>
        <div>
          <label
            htmlFor='stock'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Stock Barang
          </label>
          <input
            type='number'
            id='stock'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='0'
            required
          />
        </div>

        <div className='col-span-3'>
          <h1 className='mb-2 text-sm font-medium text-gray-900'>
            Upload Image
          </h1>
          <div className='flex items-center justify-center'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-md cursor-pointer bg-white'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg
                  className='w-8 h-8 mb-4 text-blue-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 16'>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                  />
                </svg>
                <p className='mb-2 text-sm text-blue-500'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-blue-500'>
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>
              <input
                id='dropzone-file'
                type='file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-5'>
        <button
          type='button'
          className='text-blue-700 bg-white border border-blue-300 focus:outline-none hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-md text-sm px-16 py-2.5'>
          Batalkan
        </button>
        <button
          type='button'
          className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-16 py-2.5'>
          Simpan
        </button>
      </div>
    </form>
  )
}
