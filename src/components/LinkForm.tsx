import { FC, useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Plus } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { PRESET_TAGS } from '../constants/tags';
import type { LinkFormData } from '../types';

interface LinkFormProps {
  onSubmit: (data: LinkFormData) => Promise<void>;
  isLoading?: boolean;
}

export const LinkForm: FC<LinkFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    overview: '',
    url: '',
    types: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ title: '', overview: '', url: '', types: [] });
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(tag)
        ? prev.types.filter(t => t !== tag)
        : [...prev.types, tag]
    }));
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Add New Learning Resource</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="transition-colors focus:ring-2"
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Overview"
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="transition-colors focus:ring-2"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="transition-colors focus:ring-2"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.types.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full transition-transform active:scale-95"
            disabled={isLoading || formData.types.length === 0}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Adding...
              </div>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Resource
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
