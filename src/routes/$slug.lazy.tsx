import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$slug')({
  component: Article,
});

function Article() {
  const { slug } = Route.useParams();
  // FIXME bug visual na logo
  return <h1>{slug}</h1>;
}
