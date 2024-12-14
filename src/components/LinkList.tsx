import { FC } from 'react';
import { Link } from '../types';
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { ExternalLink, Trash } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

interface LinkListProps {
  links: Link[];
  isLoading?: boolean;
  onDelete: (id: number) => Promise<void>;
}

const LinkList: FC<LinkListProps> = ({ links, isLoading = false, onDelete }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-6 w-20 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无学习资源
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <Card
          key={link.id}
          className="transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{link.title}</h3>
              <time className="text-sm text-gray-500">{new Date(link.created_at).toLocaleString()}</time>
            </div>
            <div className="flex gap-2">
              {link.types.map(type => <Badge key={type}>{type}</Badge>)}
              <Button variant="destructive" size="sm" onClick={() => onDelete(link.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{link.overview}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              访问链接
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default LinkList;
