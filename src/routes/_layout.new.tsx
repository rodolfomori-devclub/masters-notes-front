import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createArticle } from '@/services/create-article';
import { useUserStore } from '@/stores/use-user-store';
import {
  type CreateArticleData,
  createArticleSchema,
} from '@/validators/create-article';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { LoaderCircle, Paintbrush, Plus } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { MarkdownEditor } from 'react-github-markdown';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/_layout/new')({
  component: CreateArticle,
});

function CreateArticle() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  if (!user?.token) {
    navigate({ to: '/' });
  }

  const form = useForm<CreateArticleData>({
    defaultValues: {
      title: '',
      subtitle: '',
      content: '',
      tags: [],
    },
    resolver: zodResolver(createArticleSchema),
  });

  const tagsInputRef = useRef<HTMLInputElement>(null);

  async function addTags() {
    if (!tagsInputRef.current || !tagsInputRef.current?.value?.length) {
      return;
    }

    const tag = tagsInputRef.current?.value?.toLowerCase().trim();

    const currentTags = form.getValues().tags;

    if (currentTags?.includes(tag)) {
      return;
    }

    form.setValue('tags', [tag, ...currentTags]);

    tagsInputRef.current.value = '';
  }

  async function clearTags() {
    form.setValue('tags', []);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateArticle = useCallback(async (data: CreateArticleData) => {
    try {
      setIsLoading(true);

      const article = await createArticle(data, user.token);

      navigate({ to: `/${article.slug}` });
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="max-w-screen-md w-full mx-auto px-4 py-8">
      <h1 className="font-bold text-4xl mb-6">Create article</h1>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleCreateArticle)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Article's title..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-40 resize-none"
                    maxLength={500}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-right">
                  {field.value?.length}/500
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        ref={tagsInputRef}
                        type="text"
                        placeholder="Tags..."
                      />

                      <Button
                        type="button"
                        onClick={addTags}
                        className="h-10 w-10">
                        <Plus className="w-4 h-4" />
                      </Button>

                      <Button
                        type="button"
                        onClick={clearTags}
                        className="h-10 w-10">
                        <Paintbrush className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      {field.value.slice(0, 3).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}

                      {field.value?.length > 3 && (
                        <Badge>{`+ ${field.value?.length - 3}`}</Badge>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MarkdownEditor
                    isDarkTheme={false}
                    value={field.value as string}
                    onChange={field.onChange}
                    monospace={true}
                    maxLines={40}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-destructive text-sm mt-2">{error}</p>}

          <Button
            disabled={isLoading || !form.formState.isDirty}
            type="submit"
            className="sm:w-fit ml-auto">
            {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Create article
          </Button>
        </form>
      </Form>
    </section>
  );
}
