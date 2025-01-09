import { formatDate } from '@/lib/format-date';
import { MarkdownViewer } from 'react-github-markdown';
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
  likes: string[];
  subtitle: string;
  authorName: string;
  createdAt: Date;
  onClick: () => void;
};

export function ArticleCard({
  authorName,
  createdAt,
  subtitle,
  tags,
  likes,
  title,
  onClick,
}: ArticleCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-shadow">
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
      <CardContent>
        {<MarkdownViewer isDarkTheme={false} value={subtitle} />}
      </CardContent>
      <CardFooter className="flex justify-between font-light text-sm">
        <p>
          {authorName}, {formatDate(createdAt)}
        </p>
        <p>{likes.length} likes</p>
      </CardFooter>
    </Card>
  );
}
