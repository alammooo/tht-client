import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  return (
    <div className='flex flex-col gap-3'>
      <Avatar className='h-40 w-40'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className='text-3xl font-semibold mb-3'>Kristianto Wibowo</h1>
      <div className='grid grid-cols-3 gap-7'>
        <div className="col-span-2">
          <label
            htmlFor='sellPrice'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Nama Kandidat
          </label>
          <input
            type='text'
            id='sellPrice'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='@'
            required
          />
        </div>
        <div>
          <label
            htmlFor='stock'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Posisi Kandidat
          </label>
          <input
            type='text'
            id='stock'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='0'
            required
          />
        </div>
      </div>
    </div>
  )
}
