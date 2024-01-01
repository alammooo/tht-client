import { UserType } from '@/enums/UserType';

export type User = {
  id: number;
  fullName: string;
  position: string;
  profilePicture?: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type UpdateInput = Partial<User>;

export type GenerateInput = {
  userId: number;
};

export type FindInput = {
  id?: number;
  username?: string;
};

export type DeleteInput = {
  id?: number;
};
