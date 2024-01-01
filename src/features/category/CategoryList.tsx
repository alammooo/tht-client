import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { Category } from "@/types/category.types"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { fetchCategory, categoryData, setSelectedCategoryId } from "./categorySlice"
import { baseUrl } from "@/utils/baseUrl"
import axios from "axios"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function CategoryList() {
  const categories = useAppSelector(categoryData)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {value ? <span className='capitalize'>{value}</span> : "Semua"}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput
            placeholder='Cari Kategori ...'
            className='h-9'
          />
          <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
          <CommandGroup>
            {categories?.map((data) => (
              <CommandItem
                key={data.id}
                value={data.name}
                onSelect={(currentValue) => {
                  setValue(currentValue)
                  setOpen(false)
                  dispatch(setSelectedCategoryId(data.id))
                }}>
                <span className='capitalize'>{data.name}</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === data.name ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
