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

export const api = axios.create({
  baseURL: 'http://localhost:4000',
});
