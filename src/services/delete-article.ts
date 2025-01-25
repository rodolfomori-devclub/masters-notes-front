import { type Article, api } from '.';

export async function deleteArticle(id: string, token: string): Promise<void> {
  await api.delete<Article>(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
