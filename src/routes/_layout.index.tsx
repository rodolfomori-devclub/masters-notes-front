import { ArticleCard } from '@/components/native/article-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type {
  Article,
  FetchArticlesParams,
  Page,
  PaginatedAPIResponse,
} from '@/services';
import { fetchArticles } from '@/services/fetch-articles';
import { fetchMyArticles } from '@/services/fetch-my-articles';
import { useUserStore } from '@/stores/use-user-store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  Plus,
  Search,
} from 'lucide-react';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const Route = createFileRoute('/_layout/')({
  loaderDeps: ({ search }) => search as FetchArticlesParams,
  loader: ({ deps }) => {
    const { title, page, tags } = deps;

    const params: FetchArticlesParams = {
      title: title && title.replace(/[+]/g, ' '),
      page: page && Number(page),
      tags,
    };

    return fetchArticles(params);
  },
  component: Index,
});

function Index() {
  const loaderArticles = Route.useLoaderData();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [articles, setArticles] = useState<{ data: Article[]; page: Page }>(
    loaderArticles,
  );

  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const [params, setParams] = useQueryStates({
    title: parseAsString.withDefault(''),
    tags: parseAsArrayOf(parseAsString, ','),
    page: parseAsInteger.withDefault(1),
  });

  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagsInputRef = useRef<HTMLInputElement>(null);
  const switchInputRef = useRef<HTMLButtonElement>(null);

  async function addTags() {
    if (!tagsInputRef.current || !tagsInputRef.current.value.length) {
      return;
    }

    const tag = tagsInputRef.current.value.toLowerCase().trim();

    if (tags.includes(tag)) {
      return;
    }

    setTags((old) => [...old, tag]);

    tagsInputRef.current.value = '';
  }

  async function clearTags() {
    setTags([]);
  }

  const handleSearch = useCallback(
    async (event?: FormEvent<HTMLFormElement>, newPage?: number) => {
      event?.preventDefault();

      const isOnlyMyArticles =
        switchInputRef.current?.getAttribute('data-state') === 'checked';

      const title = titleInputRef.current?.value;

      let data: PaginatedAPIResponse<Article[]> = {} as PaginatedAPIResponse<
        Article[]
      >;

      const filters = {
        title,
        tags: tags.join(','),
        page: event ? 1 : (newPage ?? page),
      };

      if (isOnlyMyArticles) {
        data = await fetchMyArticles(user?.token, filters);
      } else {
        data = await fetchArticles(filters);
      }

      setArticles(data);

      setParams({
        title,
        tags,
      });
    },
    [page, tags, titleInputRef],
  );

  async function handleNextPage() {
    const newPage = page + 1;

    setPage(newPage);

    setParams({
      page: newPage,
    });

    await handleSearch(undefined, newPage);
  }

  async function handlePreviousPage() {
    const newPage = page - 1;

    setPage(newPage);

    setParams({
      page: newPage,
    });

    await handleSearch(undefined, page - 1);
  }

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.value = params.title;
    }
  }, [titleInputRef]);

  useEffect(() => {
    setTags(params.tags || []);

    setPage(params.page);
  }, []);

  return (
    <section className="max-w-screen-md w-full mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4">
        <div className="flex flex-col gap-2">
          <Input
            ref={titleInputRef}
            type="text"
            placeholder="Article's title..."
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Input ref={tagsInputRef} type="text" placeholder="Tags..." />

              <Button type="button" onClick={addTags} className="h-10 w-10">
                <Plus className="w-4 h-4" />
              </Button>

              <Button type="button" onClick={clearTags} className="h-10 w-10">
                <Paintbrush className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}

              {tags.length > 3 && <Badge>{`+ ${tags.length - 3}`}</Badge>}
            </div>
          </div>
          <div className="flex items-center justify-between">
            {user?.token && (
              <div className="flex items-center gap-2">
                <Switch ref={switchInputRef} />
                <Label>Only my articles</Label>
              </div>
            )}

            <Button
              type="submit"
              className={cn('w-fit', !user?.token && 'ml-auto')}>
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {articles.data.map((article) => {
          const belongsToLoggedUser = article.author._id === user?.id;

          return (
            <ArticleCard
              onClick={() =>
                navigate({
                  to: belongsToLoggedUser
                    ? `/${article.slug}/edit`
                    : `/${article.slug}/edit`,
                })
              }
              key={article._id}
              title={article.title}
              subtitle={article.subtitle}
              tags={article.tags}
              authorName={article.author.fullName}
              createdAt={new Date(article.createdAt)}
              likes={article.likes}
              belongsToLoggedUser={belongsToLoggedUser}
            />
          );
        })}
      </div>

      <div className="mt-2 flex w-full justify-center gap-2 items-center mx-auto">
        <Button
          onClick={handlePreviousPage}
          size="sm"
          variant="ghost"
          disabled={articles.page.number === 1}>
          <ChevronLeft className="mr-2 w-4 h-4" />
          Previous
        </Button>
        <p className="text-sm font-medium">
          {articles.page.number}/{articles.page.totalPages || 1}
        </p>
        <Button
          onClick={handleNextPage}
          size="sm"
          variant="ghost"
          disabled={
            articles.page.number === articles.page.totalPages ||
            articles.page.totalPages === 0
          }>
          Next
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
