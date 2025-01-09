import axios from 'axios';

export type Page = {
  number: number;
  totalPages: number;
  items: number;
  totalItems: number;
};

export type PaginatedAPIResponse<T> = {
  data: T;
  page: Page;
};

export type Author = {
  _id: string;
  fullName: string;
};

export type Article = {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  content?: string;
  tags: string[];
  author: Author;
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

export type FetchArticlesParams = {
  title?: string;
  tags?: string;
  page?: number;
};

export const api = axios.create({
  baseURL: 'http://localhost:4000',
});
