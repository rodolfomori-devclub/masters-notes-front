import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format-date';
import { getArticle } from '@/services/get-article';
import { toggleArticleLike } from '@/services/toggle-article-like';
import { createFileRoute } from '@tanstack/react-router';
import getBrowserFingerprint from 'get-browser-fingerprint';
import { ThumbsUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { MarkdownViewer } from 'react-github-markdown';

export const Route = createFileRoute('/_layout/$slug')({
  component: Article,
  loader: ({ params }) => {
    return getArticle(params.slug);
  },
});

function Article() {
  const loaderArticle = Route.useLoaderData();
  const [likes, setLikes] = useState(loaderArticle.likes);
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  const getFingerprint = useCallback(async () => {
    const value = (await getBrowserFingerprint()).toString();

    setFingerprint(value);
  }, []);

  const toggleLike = useCallback(() => {
    const index = likes.findIndex((item) => item === fingerprint);

    if (index === -1) {
      setLikes((old) => [...old, fingerprint as string]);

      return;
    }

    const newLikes = likes.slice(index, index);

    setLikes(newLikes);
  }, [fingerprint, likes]);

  const handleToggleLike = useCallback(async () => {
    toggleLike();

    await toggleArticleLike(loaderArticle._id, fingerprint as string);
  }, [fingerprint, loaderArticle, toggleLike]);

  useEffect(() => {
    getFingerprint();
  }, []);

  return (
    <section className="flex flex-col max-w-screen-md w-full mx-auto px-4 py-8">
      <header className="pb-6 border-b">
        <h1 className="text-5xl font-bold">{loaderArticle.title}</h1>
        <div className="flex justify-between items-center">
          <p className="mt-6 text-sm font-light">
            {loaderArticle.author.fullName},{' '}
            {formatDate(new Date(loaderArticle.createdAt))}
          </p>
          <Button
            onClick={handleToggleLike}
            variant={
              likes.includes(fingerprint as string) ? 'default' : 'ghost'
            }>
            <ThumbsUp className="h-4 w-4 mr-1" />
            {likes.length}
          </Button>
        </div>
      </header>
      <div className="flex-1 mt-6">
        <MarkdownViewer
          isDarkTheme={false}
          value={String(loaderArticle.content)}
        />
      </div>
    </section>
  );
}
