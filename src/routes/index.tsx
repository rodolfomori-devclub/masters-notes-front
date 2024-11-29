import { ArticleCard } from '@/components/native/article-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  type FetchArticlesParams,
  fetchArticles,
} from '@/services/fetch-articles';
import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { parseAsString, useQueryStates } from 'nuqs';
import { type FormEvent, useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/')({
  loaderDeps: ({ search }) => search as FetchArticlesParams,
  loader: ({ deps }) => {
    const { title, page } = deps;

    const params: FetchArticlesParams = {
      title: title && title.replace(/[+]/g, ' '),
      page: page && Number(page),
    };

    return fetchArticles(params);
  },
  component: Index,
});

function Index() {
  const loaderArticles = Route.useLoaderData();
  const [articles, setArticles] = useState(loaderArticles);
  const [params, setParams] = useQueryStates({
    title: parseAsString.withDefault(''),
  });

  const titleInputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = titleInputRef.current?.value;

    const data = await fetchArticles({ title });

    setArticles(data);
    setParams({
      title,
    });
  }

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.value = params.title;
    }
  }, [titleInputRef]);

  return (
    <section className="max-w-screen-md w-full mx-auto px-4 py-8">
      <form onSubmit={handleSearch}>
        <div className="mb-4 flex gap-2">
          <Input
            ref={titleInputRef}
            type="text"
            placeholder="Título do artigo..."
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-1" />
            Pesquisar
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {articles.data.map((article) => (
          <ArticleCard
            key={article._id}
            title={article.title}
            subtitle={article.subtitle}
            tags={article.tags}
            authorName={article.author.fullName}
            createdAt={new Date(article.createdAt)}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
