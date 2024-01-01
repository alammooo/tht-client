export type Product = {
  id: number
  name: string
  buyPrice: number
  sellPrice: number
  stock: number
  image: string
  categoryId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateInput = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "deletedAt" | "image"
> & {
  image: File[]
}

export type UpdateInput = Partial<Product>

export type FindInput = {
  id?: number
  categoryId?: number
  name?: string
}
export type Pagination = {
  offset?: number
}

export type DeleteInput = {
  id: number
}
