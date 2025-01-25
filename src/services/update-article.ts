import type { UpdateArticleData } from '@/validators/update-article';
import { type Article, api } from '.';

export async function updateArticle(
  id: string,
  payload: UpdateArticleData,
  token: string,
): Promise<Article> {
  const response = await api.put<Article>(`/articles/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
