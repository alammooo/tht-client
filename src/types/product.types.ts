export type Product = {
  id: number;
  name: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  image: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type UpdateInput = Partial<Product>;

export type FindInput = {
  id: number;
};

export type DeleteInput = {
  id: number;
};
