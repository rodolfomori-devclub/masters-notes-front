import type { CreateArticleData } from '@/validators/create-article';
import { type Article, api } from '.';

export async function createArticle(
  payload: CreateArticleData,
  token: string,
): Promise<Article> {
  const response = await api.post<Article>('/articles', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
