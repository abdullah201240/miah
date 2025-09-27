'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-between hover:bg-gray-50 ${
              selectedCategory === category.id 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'text-gray-700'
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="text-left">{category.name}</span>
            <Badge 
              variant={selectedCategory === category.id ? "secondary" : "outline"}
              className={selectedCategory === category.id ? "bg-gray-700 text-white" : ""}
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
