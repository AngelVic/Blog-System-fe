import React, { FC, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Plus } from "lucide-react";
import { LinkFormData } from "../types";
import { PRESET_TAGS } from "../constants/tags";
import { Badge } from "../components/ui/badge";

interface LinkFormDialogProps {
  onSubmit: (data: LinkFormData) => Promise<void>;
  isLoading: boolean;
}

export const LinkFormDialog: FC<LinkFormDialogProps> = ({ onSubmit, isLoading }) => {
  const [open, setOpen] = useState(false);
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
    setOpen(false);
  };

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          上传链接
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加学习资源</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">标题</label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="overview" className="text-sm font-medium">概述</label>
            <Textarea
              id="overview"
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">链接</label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">类型</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.types.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTypeSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? '提交中...' : '提交'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
