import Image from "next/image"
import frameBg from "@/assets/CMS Assets/Frame 98699.png"
import handbag from "@/assets/CMS Assets/Handbag.png"
import { Button } from "@/components/ui/button"

export default function () {
  return (
    <section className='w-screen grid grid-cols-2'>
      <div className='flex flex-col items-center justify-center gap-10 w-full'>
        <h3 className='flex gap-1 font-semibold text-2xl'>
          <Image
            className='fill-oranye'
            src={handbag}
            alt='handbag'
          />
          SIMS Web App
        </h3>
        <h1 className='text-3xl font-bold max-w-sm text-center'>
          Masuk atau buat akun untuk memulai
        </h1>

        <form className='w-1/2 mx-auto'>
          <div className='mb-5'>
            <input
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='@ masukkan email anda'
              required
            />
          </div>
          <div className='mb-5'>
            <input
              type='password'
              id='password'
              placeholder='masukkan password anda'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
          <button
            type='submit'
            className='block text-white bg-oranye hover:bg-oranye focus:ring-4 focus:outline-none focus:ring-oranye font-medium rounded-md text-sm w-full px-5 py-2.5 text-center'>
            Masuk
          </button>
        </form>
      </div>
      <div className=''>
        <Image
          className='w-full h-screen object-cover'
          src={frameBg}
          alt='frameBg'
        />
      </div>
    </section>
  )
}
