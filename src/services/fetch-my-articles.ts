import {
  type Article,
  type FetchArticlesParams,
  type PaginatedAPIResponse,
  api,
} from '.';

export async function fetchMyArticles(
  token: string,
  params?: FetchArticlesParams,
): Promise<PaginatedAPIResponse<Article[]>> {
  const { data } = await api.get<PaginatedAPIResponse<Article[]>>(
    '/articles/my',
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
}
