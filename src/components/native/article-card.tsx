import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

type ArticleCardProps = {
  title: string;
  tags: string[];
  subtitle: string;
  authorName: string;
  createdAt: Date;
};

export function ArticleCard({
  authorName,
  createdAt,
  subtitle,
  tags,
  title,
}: ArticleCardProps) {
  // TODO Adicionar quantidade de likes

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardDescription className="space-x-3">
          {tags.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{subtitle}</CardContent>
      <CardFooter>
        {authorName},{' '}
        {new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'medium',
          timeZone: 'America/Sao_Paulo',
        }).format(createdAt)}
      </CardFooter>
    </Card>
  );
}
