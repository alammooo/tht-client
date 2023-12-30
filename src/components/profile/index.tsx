import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  return (
    <div className='flex flex-col gap-3'>
      <Avatar className="h-40 w-40">
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-3xl font-semibold mb-3">Kristianto Wibowo</h1>
    </div>
  )
}
