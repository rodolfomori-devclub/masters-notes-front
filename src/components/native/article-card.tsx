import { formatDate } from '@/lib/format-date';
import { NotebookPen } from 'lucide-react';
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
  belongsToLoggedUser?: boolean;
};

export function ArticleCard({
  authorName,
  createdAt,
  subtitle,
  tags,
  likes,
  title,
  onClick,
  belongsToLoggedUser = false,
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
        <p className="flex items-center">
          {belongsToLoggedUser && (
            <NotebookPen className="w-4 h-4 text-green-500 mr-2" />
          )}
          {authorName}, {formatDate(createdAt)}
        </p>
        <p>{likes.length} likes</p>
      </CardFooter>
    </Card>
  );
}
