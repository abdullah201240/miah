'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { categories, Category } from '@/data/products';
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  FolderPlus,
  Upload,
  Download,
  Tags,
  List,
} from 'lucide-react';

// Add Category Modal Component
interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Partial<Category>) => void;
  editingCategory?: Category | null;
  parentCategory?: Category | null;
}

function AddCategoryModal({ isOpen, onClose, onSave, editingCategory, parentCategory }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: editingCategory?.name || '',
    description: editingCategory?.description || '',
    image: editingCategory?.image || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: editingCategory?.id || `cat-${Date.now()}`,
      count: editingCategory?.count || 0,
    });
    onClose();
    setFormData({ name: '', description: '', image: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingCategory 
              ? 'Edit Category' 
              : parentCategory 
                ? `Add Subcategory to ${parentCategory.name}`
                : 'Add Category'
            }
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter category name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter category description"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none h-20 dark:bg-background dark:border-border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>
            
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {editingCategory ? 'Update' : 'Add'} Category
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Category Card Component
interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  onAddSubcategory: (category: Category) => void;
  level?: number;
}

function CategoryCard({ category, onEdit, onDelete, onAddSubcategory, level = 0 }: CategoryCardProps) {
  if (category.id === 'all') return null;

  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-muted pl-4' : ''}`}>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            {/* Category Image */}
            <div className="flex-shrink-0">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                  <Tags className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Category Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.count} products
                </Badge>
                {level === 0 && category.subcategories && (
                  <Badge variant="outline" className="text-xs">
                    {category.subcategories.length} subcategories
                  </Badge>
                )}
              </div>
              
              {category.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {level === 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddSubcategory(category)}
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                  title="Add Subcategory"
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(category)}
                className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                title="Edit Category"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(category.id)}
                className="text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                title="Delete Category"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Render Subcategories */}
      {category.subcategories && category.subcategories.map((subcategory) => (
        <CategoryCard
          key={subcategory.id}
          category={subcategory}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddSubcategory={onAddSubcategory}
          level={level + 1}
        />
      ))}
    </div>
  );
}

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentCategory, setParentCategory] = useState<Category | null>(null);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Event handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setParentCategory(null);
    setIsModalOpen(true);
  };

  const handleAddSubcategory = (category: Category) => {
    setEditingCategory(null);
    setParentCategory(category);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setParentCategory(null);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      console.log('Delete category:', categoryId);
      // TODO: Implement delete functionality
    }
  };

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    console.log('Save category:', categoryData);
    // TODO: Implement save functionality
  };

  // Calculate stats
  const totalCategories = categories.filter(cat => cat.id !== 'all').length;
  const totalSubcategories = categories.reduce((sum, cat) => 
    sum + (cat.subcategories?.length || 0), 0
  );
  const totalProducts = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <AdminLayout title="Categories" subtitle="Manage product categories and subcategories">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
                  <p className="text-3xl font-bold text-foreground">{totalCategories}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Tags className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subcategories</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalSubcategories}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <List className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <FolderPlus className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button onClick={handleAddCategory} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Categories ({filteredCategories.length - 1})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCategories.length > 1 ? (
              <div className="space-y-0">
                {filteredCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                    onAddSubcategory={handleAddSubcategory}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Tags className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground">No categories found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or add a new category
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        editingCategory={editingCategory}
        parentCategory={parentCategory}
      />
    </AdminLayout>
  );
}