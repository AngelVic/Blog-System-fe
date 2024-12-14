export interface Link {
  id: number;
  title: string;
  overview: string;
  url: string;
  types: string[];  // Changed from type to types for multi-tag support
  created_at: string;
}

export interface LinkFormData {
  title: string;
  overview: string;
  url: string;
  types: string[];  // Changed from type to types for multi-tag support
}
