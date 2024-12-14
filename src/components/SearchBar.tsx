import { FC } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  types: string[];
  onTypeChange: (type: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  search,
  onSearchChange,
  selectedType,
  types,
  onTypeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 transition-colors focus:ring-2"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <div className="flex gap-2">
        {Array.isArray(types) && types.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => onTypeChange(type)}
            className="transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <Filter className="mr-2 h-4 w-4" />
            {type}
          </Button>
        ))}
        {selectedType && (
          <Button
            variant="ghost"
            onClick={() => onTypeChange("")}
            className="transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
