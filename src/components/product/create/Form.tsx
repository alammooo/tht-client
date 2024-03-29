import { useAppDispatch, useAppSelector } from "@/app/hooks"
import InputFormat from "@/components/shared/InputFormat"
import { CatDropdown } from "@/components/shared/category/Dropdown"
import CategoryList from "@/features/category/CategoryList"
import { categoryId } from "@/features/category/categorySlice"
import { createProduct } from "@/features/product/productSlice"
import { CreateInput, Product } from "@/types/product.types"
import { ChangeEvent, useState } from "react"
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form"

export default function ProductForm() {
  const [inputBuy, setInputBuy] = useState("")
  const [inputSell, setInputSell] = useState("")
  const catId = useAppSelector(categoryId)
  const dispatch = useAppDispatch()
  const [imagePreview, setImagePreview] = useState<string>("")
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      sellPrice: 0,
      buyPrice: 0,
      categoryId: 0,
      image: undefined,
    },
  })

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage: File = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.result) {
          const preview: string = reader.result as string
          setImagePreview(preview) // Assuming setImagePreview sets the preview state
        }
      }

      reader.readAsDataURL(selectedImage)
    }
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data, "HALLO DATA✅✅✅✅✅")
    const formData = new FormData()
    formData.append("file", data.image?.[0])
    formData.append("name", data.name)
    formData.append("categoryId", String(catId))
    formData.append("sellPrice", String(data.sellPrice))
    formData.append("buyPrice", String(data.buyPrice))
    formData.append("stock", String(data.stock))

    dispatch(createProduct(formData))
  })
  return (
    <form onSubmit={onSubmit}>
      <div className='grid gap-6 mb-6 md:grid-cols-3'>
        <div>
          <label
            htmlFor='category'
            className='block mb-2 text-sm font-semibold text-gray-900'>
            Kategori
          </label>
          <CategoryList />
        </div>
        <div className='col-span-2'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Masukkan nama barang
          </label>
          <input
            type='text'
            id='name'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Masukkan nama barang'
            required
            {...register("name")}
          />
        </div>
        <div>
          <label
            htmlFor='buyPrice'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Harga Beli
          </label>
          <Controller
            control={control}
            name='buyPrice'
            render={({ field }) => (
              <InputFormat
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                {...field}
                value={field.value || ""}
                onChangeValue={(val) => {
                  field.onChange(val)
                  setValue("sellPrice", val * 0.3 + val)
                }}
              />
            )}
          />
        </div>
        <div>
          <label
            htmlFor='sellPrice'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Harga Jual
          </label>
          <Controller
            control={control}
            name='sellPrice'
            render={({ field }) => (
              <InputFormat
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                {...field}
                value={field.value || ""}
                onChangeValue={field.onChange}
              />
            )}
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
            {...register("stock")}
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
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={`Preview ${imagePreview}`}
                    className='h-60 w-full object-cover rounded-lg shadow-md'
                  />
                ) : (
                  <>
                    <svg
                      className='w-8 h-8 mb-4 text-blue-500'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 16'>
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                      />
                    </svg>
                    <p className='mb-2 text-sm text-blue-500'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-blue-500'>
                      PNG, JPG (MAX. 800x400px)
                    </p>
                  </>
                )}
              </div>
              <input
                id='dropzone-file'
                type='file'
                accept='.png, .jpeg, .jpg'
                className='hidden'
                {...register("image")}
                // onChange={handleImageChange}
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
          type='submit'
          className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-16 py-2.5'>
          Simpan
        </button>
      </div>
    </form>
  )
}
