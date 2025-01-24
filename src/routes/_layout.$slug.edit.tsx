import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/$slug/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO Criar guard para verificar se o artigo pertence ao usuário logado
  // TODO Criar funcionalidade de update do Artigo
  // TODO Criar funcionalidade de deleção do Artigo

  return <div>Hello "/_layout/$slug/edit"!</div>;
}
