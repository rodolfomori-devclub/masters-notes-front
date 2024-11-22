import { ArticleCard } from '@/components/native/article-card';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  // TODO Conectar na API
  // TODO Adicionar paginação
  // TODO Adicionar os filtros

  return (
    <section className="max-w-screen-md w-full mx-auto px-4 py-8 flex flex-col gap-4">
      <ArticleCard
        title="Meu Primeiro Artigo"
        subtitle="Olá! Sejam bem-vindos(as) ao meu primeiro artigo!"
        tags={['javascript', 'react', 'nodejs', 'docker']}
        authorName="Agustinho Neto"
        createdAt={new Date('2024-11-14T23:16:05.359Z')}
      />
      <ArticleCard
        title="Meu Primeiro Artigo"
        subtitle="Olá! Sejam bem-vindos(as) ao meu primeiro artigo!"
        tags={['javascript', 'react', 'nodejs', 'docker']}
        authorName="Agustinho Neto"
        createdAt={new Date('2024-11-14T23:16:05.359Z')}
      />
      <ArticleCard
        title="Meu Primeiro Artigo"
        subtitle="Olá! Sejam bem-vindos(as) ao meu primeiro artigo!"
        tags={['javascript', 'react', 'nodejs', 'docker']}
        authorName="Agustinho Neto"
        createdAt={new Date('2024-11-14T23:16:05.359Z')}
      />
      <ArticleCard
        title="Meu Primeiro Artigo"
        subtitle="Olá! Sejam bem-vindos(as) ao meu primeiro artigo!"
        tags={['javascript', 'react', 'nodejs', 'docker']}
        authorName="Agustinho Neto"
        createdAt={new Date('2024-11-14T23:16:05.359Z')}
      />
      <ArticleCard
        title="Meu Primeiro Artigo"
        subtitle="Olá! Sejam bem-vindos(as) ao meu primeiro artigo!"
        tags={['javascript', 'react', 'nodejs', 'docker']}
        authorName="Agustinho Neto"
        createdAt={new Date('2024-11-14T23:16:05.359Z')}
      />
      <ArticleCard
        title="Meu Primeiro Artigo"
        subtitle="Olá! Sejam bem-vindos(as) ao meu primeiro artigo!"
        tags={['javascript', 'react', 'nodejs', 'docker']}
        authorName="Agustinho Neto"
        createdAt={new Date('2024-11-14T23:16:05.359Z')}
      />
    </section>
  );
}
