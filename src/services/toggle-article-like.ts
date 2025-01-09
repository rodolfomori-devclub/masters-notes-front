import { api } from '.';

export async function toggleArticleLike(
  articleId: string,
  fingerprint: string,
) {
  await api.patch(`/articles/${articleId}/likes`, {
    fingerprint,
  });
}
