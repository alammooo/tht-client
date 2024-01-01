export type Category = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type UpdateInput = Partial<Category>;

export type FindInput = {
  id: number;
};

export type DeleteInput = {
  id: number;
};
