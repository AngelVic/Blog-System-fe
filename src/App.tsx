import { FC, useState, useEffect } from 'react';
import { LinkFormDialog } from './components/LinkFormDialog';
import LinkList from './components/LinkList';
import { SearchBar } from './components/SearchBar';
import type { Link, LinkFormData } from './types';
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const App: FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedType) params.append('type', selectedType);
      if (search) params.append('search', search);

      const response = await fetch(`${API_URL}/api/links?${params}`);
      if (!response.ok) throw new Error('Failed to fetch links');
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch links. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/types`);
      if (!response.ok) throw new Error('Failed to fetch types');
      const data = await response.json();
      setTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch resource types. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (data: LinkFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to add link');

      toast({
        title: "Success",
        description: "Learning resource added successfully!",
      });

      await fetchLinks();
      await fetchTypes();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add learning resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/links/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete link');

      toast({
        title: "Success",
        description: "Learning resource deleted successfully!",
      });

      await fetchLinks();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete learning resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [selectedType, search]);

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">个人学习站</h1>
      <div className="grid gap-8 md:grid-cols-[350px,1fr]">
        <div className="space-y-6">
          <LinkFormDialog onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <SearchBar
            types={types}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            search={search}
            onSearchChange={setSearch}
          />
          <LinkList links={links} isLoading={isLoading} onDelete={handleDelete} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
