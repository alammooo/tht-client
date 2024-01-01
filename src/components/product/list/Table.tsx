import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { fetchProduct, productData } from "@/features/product/productSlice"
import Image from "next/image"
import { useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProductTable() {
  const products = useAppSelector(productData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchProduct({
        categoryId: undefined,
        offset: 0,
        name: undefined,
      })
    )
  }, [])

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3'>
              No
            </th>
            <th
              scope='col'
              className='px-6 py-3'>
              Image
            </th>
            <th
              scope='col'
              className='px-6 py-3'>
              Nama Produk
            </th>
            <th
              scope='col'
              className='px-6 py-3'>
              Kategori Produk
            </th>
            <th
              scope='col'
              className='px-6 py-3'>
              Harga Beli {`(Rp)`}
            </th>
            <th
              scope='col'
              className='px-6 py-3'>
              Harga Jual {`(Rp)`}
            </th>
            <th
              scope='col'
              className='px-6 py-3'>
              Stok Produk
            </th>
            <th
              scope='col'
              className='px-6 py-3'>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((pro, i) => (
            <tr className='odd:bg-white even:bg-gray-50 border-b'>
              <td className='px-6 py-4'>{i + 1}</td>
              <td className='px-6 py-4'>
                <img
                  src={pro.image}
                  alt={pro.name}
                />
              </td>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {pro.name}
              </th>
              <td className='px-6 py-4'>{pro.categoryId}</td>
              <td className='px-6 py-4'>{pro.buyPrice}</td>
              <td className='px-6 py-4'>{pro.sellPrice}</td>
              <td className='px-6 py-4'>{pro.stock}</td>
              <td className='px-6 py-4'>
                <a
                  href='#'
                  className='font-medium text-blue-600 hover:underline'>
                  Edit
                </a>
                <a
                  href='#'
                  className='font-medium text-red-600 hover:underline'>
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='my-3'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href='#'
                isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
