'use client';

import React, { useState, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { categories, Product } from '@/data/products';
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  Eye,
  Package,
  DollarSign,
  FileText,
  Settings,
  Camera,
  Star,
  Hash,
  Weight,
  ShoppingCart,
  Tag,
  Layers,
  ListChecks,
  Wrench
} from 'lucide-react';

interface AddProductFormData {
  name: string;
  productCode: string;
  category: string;
  subCategory: string;
  weight: number;
  unitName: string;
  description: string;
  applications: string;
  warranty: string;
  price: number;
  discountPrice: number;
  originalPrice: number;
  quantity: number;
  images: string[];
  videos: string[];
  features: string[];
  specifications: { [key: string]: string };
}

const initialFormData: AddProductFormData = {
  name: '',
  productCode: '',
  category: '',
  subCategory: '',
  weight: 0,
  unitName: 'piece',
  description: '',
  applications: '',
  warranty: '',
  price: 0,
  discountPrice: 0,
  originalPrice: 0,
  quantity: 0,
  images: [],
  videos: [],
  features: [''],
  specifications: {},
};

// Image/Video Upload Component
interface MediaUploadProps {
  type: 'image' | 'video';
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
  maxFiles?: number;
}

function MediaUpload({ type, urls, onUrlsChange, maxFiles = 10 }: MediaUploadProps) {
  const [newUrl, setNewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addUrl = () => {
    if (newUrl.trim() && urls.length < maxFiles) {
      onUrlsChange([...urls, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const removeUrl = (index: number) => {
    onUrlsChange(urls.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you would upload these files to a server and get URLs
    // For demo purposes, we'll create blob URLs
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      if (urls.length < maxFiles) {
        onUrlsChange([...urls, url]);
      }
    });
  };

  const Icon = type === 'image' ? ImageIcon : Video;
  const accept = type === 'image' ? 'image/*' : 'video/*';

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="p-4 border border-dashed border-border rounded-lg bg-muted/20">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <Input
              type="url"
              placeholder={`Add ${type} URL`}
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addUrl()}
              className="h-11"
            />
          </div>
          <Button 
            type="button" 
            onClick={addUrl} 
            disabled={!newUrl.trim() || urls.length >= maxFiles}
            className="h-11 w-11 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center my-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="h-px bg-border flex-1"></div>
            <span>or</span>
            <div className="h-px bg-border flex-1"></div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={urls.length >= maxFiles}
          className="w-full h-11 border-dashed"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload {type === 'image' ? 'Images' : 'Videos'}
        </Button>
        <input
          aria-label="Upload {type === 'image' ? 'Images' : 'Videos'}"
          id="fileInput"
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Media Grid */}
      {urls.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {urls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border shadow-sm">
                  {type === 'image' ? (
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkw4IDEySDExVjhIMTNWMTJIMTZMMTIgMTZaIiBmaWxsPSIjOTBBNEFFIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                      <Video className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  onClick={() => removeUrl(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  onClick={() => window.open(url, '_blank')}
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {index + 1}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
            <span>{urls.length}/{maxFiles} {type}s added</span>
            {urls.length >= maxFiles && (
              <span className="text-orange-500 font-medium">Maximum limit reached</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Dynamic Features Component
interface DynamicListProps {
  label: string;
  items: string[];
  onItemsChange: (items: string[]) => void;
  placeholder: string;
}

function DynamicList({ label, items, onItemsChange, placeholder }: DynamicListProps) {
  const addItem = () => {
    onItemsChange([...items, '']);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onItemsChange(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      onItemsChange(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center text-sm font-medium">
        <ListChecks className="h-4 w-4 mr-2 text-muted-foreground" />
        {label}
      </label>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 items-center">
            <div className="flex-1">
              <Input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={placeholder}
                className="h-11"
              />
            </div>
            {items.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeItem(index)}
                className="h-11 w-11 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button 
        type="button" 
        variant="outline" 
        onClick={addItem}
        className="h-11 w-full border-dashed hover:border-solid transition-all"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  );
}

// Dynamic Specifications Component
interface SpecificationsProps {
  specifications: { [key: string]: string };
  onSpecificationsChange: (specs: { [key: string]: string }) => void;
}

function Specifications({ specifications, onSpecificationsChange }: SpecificationsProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const addSpecification = () => {
    if (newKey.trim() && newValue.trim()) {
      onSpecificationsChange({
        ...specifications,
        [newKey.trim()]: newValue.trim(),
      });
      setNewKey('');
      setNewValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    onSpecificationsChange(newSpecs);
  };

  const updateSpecification = (oldKey: string, newKey: string, value: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[oldKey];
    if (newKey.trim()) {
      newSpecs[newKey.trim()] = value;
    }
    onSpecificationsChange(newSpecs);
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center text-sm font-medium">
        <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
        Product Specifications
      </label>
      
      {/* Existing Specifications */}
      <div className="space-y-3">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex gap-3 items-center">
            <div className="flex-1">
              <Input
                type="text"
                value={key}
                onChange={(e) => updateSpecification(key, e.target.value, value)}
                placeholder="Specification name"
                className="h-11"
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                value={value}
                onChange={(e) => updateSpecification(key, key, e.target.value)}
                placeholder="Specification value"
                className="h-11"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeSpecification(key)}
              className="h-11 w-11 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add New Specification */}
      <div className="border-t border-border pt-4">
        <div className="space-y-3">
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <Input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="Specification name"
                className="h-11"
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Specification value"
                className="h-11"
                onKeyPress={(e) => e.key === 'Enter' && addSpecification()}
              />
            </div>
            <Button
              type="button"
              onClick={addSpecification}
              disabled={!newKey.trim() || !newValue.trim()}
              className="h-11 w-11 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<AddProductFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get subcategories for selected category
  const selectedCategory = categories.find(cat => cat.id === formData.category);
  const subcategories = selectedCategory?.subcategories || [];

  const handleInputChange = (field: keyof AddProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create product object
      const newProduct: Partial<Product> = {
        id: `product-${Date.now()}`,
        name: formData.name,
        productCode: formData.productCode,
        price: formData.price,
        originalPrice: formData.originalPrice,
        discountPrice: formData.discountPrice,
        category: formData.category,
        subCategory: formData.subCategory,
        image: formData.images[0] || '',
        images: formData.images,
        videos: formData.videos,
        description: formData.description,
        applications: formData.applications,
        warranty: formData.warranty,
        features: formData.features.filter(f => f.trim()),
        specifications: formData.specifications,
        weight: formData.weight,
        unitName: formData.unitName,
        pricePerUnit: formData.price,
        quantity: formData.quantity,
        rating: 0,
        reviews: 0,
        inStock: formData.quantity > 0,
        featured: false,
      };

      console.log('New product:', newProduct);
      
      // TODO: Submit to API
      // await createProduct(newProduct);
      
      alert('Product added successfully!');
      // Reset form or redirect
      setFormData(initialFormData);
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Add Product" subtitle="Create a new product for your catalog">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add New Product</h1>
              <p className="text-muted-foreground">Fill in the details below to add a product to your catalog</p>
            </div>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => window.history.back()}
            className="h-10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Package className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                    Product Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
                    Product Code
                  </label>
                  <Input
                    type="text"
                    value={formData.productCode}
                    onChange={(e) => handleInputChange('productCode', e.target.value)}
                    placeholder="Enter product code/SKU"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Layers className="h-4 w-4 mr-2 text-muted-foreground" />
                    Category <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    aria-label="Category"
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full h-11 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.filter(cat => cat.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Layers className="h-4 w-4 mr-2 text-muted-foreground" />
                    Sub-Category
                  </label>
                  <select
                    aria-label="Sub-Category"
                    id="subCategory"
                    value={formData.subCategory}
                    onChange={(e) => handleInputChange('subCategory', e.target.value)}
                    className="w-full h-11 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all disabled:opacity-50"
                    disabled={!formData.category || subcategories.length === 0}
                  >
                    <option value="">Select Sub-Category</option>
                    {subcategories.map(subcategory => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Weight className="h-4 w-4 mr-2 text-muted-foreground" />
                    Weight (kg)
                  </label>
                  <Input
                    aria-label="Weight (kg)"
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                    placeholder="Enter weight in kg"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                    Unit Name
                  </label>
                  <select
                    aria-label="Unit Name"
                    id="unitName"
                    value={formData.unitName}
                    onChange={(e) => handleInputChange('unitName', e.target.value)}
                    className="w-full h-11 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  >
                    <option value="piece">Piece</option>
                    <option value="set">Set</option>
                    <option value="pair">Pair</option>
                    <option value="box">Box</option>
                    <option value="pack">Pack</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle className="text-lg">Pricing & Inventory</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    Price Per Unit <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                    Original Price
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                    Discount Price
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.discountPrice}
                    onChange={(e) => handleInputChange('discountPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="max-w-md">
                <label className="flex items-center text-sm font-medium mb-2">
                  <ShoppingCart className="h-4 w-4 mr-2 text-muted-foreground" />
                  Quantity in Stock <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="h-11"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle className="text-lg">Product Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium mb-2">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  Product Description <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter detailed product description"
                  className="w-full px-3 py-3 border border-input rounded-md bg-background text-foreground resize-none h-32 focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Wrench className="h-4 w-4 mr-2 text-muted-foreground" />
                  Applications
                </label>
                <textarea
                  value={formData.applications}
                  onChange={(e) => handleInputChange('applications', e.target.value)}
                  placeholder="Describe where and how this product can be used"
                  className="w-full px-3 py-3 border border-input rounded-md bg-background text-foreground resize-none h-24 focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
              </div>

              <div className="max-w-md space-y-2">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                  Warranty Information
                </label>
                <Input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => handleInputChange('warranty', e.target.value)}
                  placeholder="e.g., 2 years manufacturer warranty"
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Features & Specifications */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <ListChecks className="h-5 w-5 text-orange-500" />
                </div>
                <CardTitle className="text-lg">Features & Specifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <DynamicList
                label="Features"
                items={formData.features}
                onItemsChange={(features) => handleInputChange('features', features)}
                placeholder="Enter product feature"
              />

              <Specifications
                specifications={formData.specifications}
                onSpecificationsChange={(specs) => handleInputChange('specifications', specs)}
              />
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Camera className="h-5 w-5 text-pink-500" />
                </div>
                <CardTitle className="text-lg">Product Media</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h4 className="flex items-center text-sm font-medium">
                  <ImageIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  Product Images
                </h4>
                <MediaUpload
                  type="image"
                  urls={formData.images}
                  onUrlsChange={(images) => handleInputChange('images', images)}
                  maxFiles={10}
                />
              </div>

              <div className="space-y-4">
                <h4 className="flex items-center text-sm font-medium">
                  <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                  Product Videos
                </h4>
                <MediaUpload
                  type="video"
                  urls={formData.videos}
                  onUrlsChange={(videos) => handleInputChange('videos', videos)}
                  maxFiles={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border pt-6 mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-end max-w-6xl mx-auto">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => window.history.back()}
                className="h-11 px-8"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="h-11 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-white dark:text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}