import { type PaginatedAPIResponse, api } from '.';

export type Author = {
  _id: string;
  fullName: string;
};

export type Article = {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  author: Author;
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

export type FetchArticlesParams = {
  title?: string;
  tags?: string[];
  page?: number;
};

export async function fetchArticles(
  params?: FetchArticlesParams,
): Promise<PaginatedAPIResponse<Article[]>> {
  const { data } = await api.get<PaginatedAPIResponse<Article[]>>('/articles', {
    params,
  });

  return data;
}
