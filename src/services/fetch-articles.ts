import {
  type Article,
  type FetchArticlesParams,
  type PaginatedAPIResponse,
  api,
} from '.';

export async function fetchArticles(
  params?: FetchArticlesParams,
): Promise<PaginatedAPIResponse<Article[]>> {
  const { data } = await api.get<PaginatedAPIResponse<Article[]>>('/articles', {
    params,
  });

  return data;
}
