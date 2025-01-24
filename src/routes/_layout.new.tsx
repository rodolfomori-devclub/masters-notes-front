import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/new')({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO Criar página de criação de Artigos

  return <div>Hello "/_layout/new"!</div>;
}
