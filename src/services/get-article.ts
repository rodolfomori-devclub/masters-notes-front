import { type Article, api } from '.';

export async function getArticle(slug: string): Promise<Article> {
  const { data } = await api.get<Article>(`/articles/slug/${slug}`);

  return data;
}
