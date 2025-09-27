"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/contexts/AdminContext";
import { formatPrice } from "@/lib/currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Download,
  Upload,
  Settings,
  Copy,
  Star,
  StarOff,
  ExternalLink,
  X,
  Save,
  Image as ImageIcon,
  DollarSign,
  Weight,
  FileText,
  Wrench,
  ListChecks,
} from "lucide-react";

// Product Status Badge Component
function ProductStatusBadge({
  inStock,
  featured,
}: {
  inStock: boolean;
  featured: boolean;
}) {
  if (!inStock) {
    return (
      <Badge variant="destructive" className="text-xs">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Out of Stock
      </Badge>
    );
  }

  if (featured) {
    return (
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
        <TrendingUp className="h-3 w-3 mr-1" />
        Featured
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs"
    >
      <CheckCircle className="h-3 w-3 mr-1" />
      In Stock
    </Badge>
  );
}

// Product Row Component
interface ProductRowProps {
  product: (typeof products)[0];
  onEdit: (product: (typeof products)[0]) => void;
  onDelete: (productId: string) => void;
  onView: (product: (typeof products)[0]) => void;
  onToggleFeatured: (product: (typeof products)[0]) => void;
  onDuplicate: (product: (typeof products)[0]) => void;
  currency: string;
}

function ProductRow({
  product,
  onEdit,
  onDelete,
  onView,
  onToggleFeatured,
  onDuplicate,
  currency,
}: ProductRowProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
      {/* Product Info */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground truncate">
              {product.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground capitalize">
                {product.category}
              </p>
              {product.subCategory && (
                <>
                  <span className="text-xs text-muted-foreground">→</span>
                  <p className="text-xs text-muted-foreground capitalize">
                    {product.subCategory}
                  </p>
                </>
              )}
            </div>
            {product.productCode && (
              <p className="text-xs text-muted-foreground font-mono">
                Code: {product.productCode}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* SKU/ID */}
      <td className="py-4 px-4 text-sm text-muted-foreground font-mono">
        #{product.id}
      </td>

      {/* Price & Inventory */}
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">
            {formatPrice(product.price, currency)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice, currency)}
            </span>
          )}
          {product.discountPrice && product.discountPrice !== product.price && (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Sale: {formatPrice(product.discountPrice, currency)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
              -{discountPercentage}% off
            </span>
          )}
          {product.quantity !== undefined && (
            <span className="text-xs text-muted-foreground">
              Stock: {product.quantity} {product.unitName || "units"}
            </span>
          )}
        </div>
      </td>

      {/* Weight & Unit */}
      <td className="py-4 px-4">
        <div className="text-sm">
          {product.weight ? (
            <span className="text-foreground">{product.weight} kg</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
          {product.unitName && (
            <div className="text-xs text-muted-foreground">
              per {product.unitName}
            </div>
          )}
        </div>
      </td>

      {/* Stock Status */}
      <td className="py-4 px-4">
        <ProductStatusBadge
          inStock={product.inStock}
          featured={product.featured}
        />
      </td>

      {/* Rating */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">{product.rating}</span>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-muted-foreground/30"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          {/* View Product Sheet */}
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                title="View Product"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw] sm:w-[600px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Product Details</span>
                </SheetTitle>
                <SheetDescription>
                  Complete information for {product.name}
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Product Images */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Product Images
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {product.images && product.images.length > 0 ? (
                      product.images.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-lg overflow-hidden bg-muted border"
                        >
                          <img
                            src={img}
                            alt={`${product.name} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="aspect-square rounded-lg bg-muted border flex items-center justify-center col-span-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Product Name
                    </label>
                    <p className="text-foreground font-medium">
                      {product.name}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Product Code
                    </label>
                    <p className="text-foreground font-mono text-sm">
                      {product.productCode || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Category
                    </label>
                    <p className="text-foreground capitalize">
                      {product.category}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Sub-Category
                    </label>
                    <p className="text-foreground capitalize">
                      {product.subCategory || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pricing Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Current Price
                      </label>
                      <p className="text-foreground font-semibold text-lg">
                        {formatPrice(product.price, currency)}
                      </p>
                    </div>
                    {product.originalPrice && (
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Original Price
                        </label>
                        <p className="text-muted-foreground line-through">
                          {formatPrice(product.originalPrice, currency)}
                        </p>
                      </div>
                    )}
                    {product.discountPrice &&
                      product.discountPrice !== product.price && (
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Discount Price
                          </label>
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            {formatPrice(product.discountPrice, currency)}
                          </p>
                        </div>
                      )}
                  </div>
                </div>

                {/* Physical Properties */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <Weight className="h-4 w-4 mr-2" />
                    Physical Properties
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Weight
                      </label>
                      <p className="text-foreground">
                        {product.weight ? `${product.weight} kg` : "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Unit
                      </label>
                      <p className="text-foreground capitalize">
                        {product.unitName || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Quantity
                      </label>
                      <p className="text-foreground">
                        {product.quantity || 0} units
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stock Status & Rating */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Stock Status
                      </label>
                      <div className="mt-1">
                        <ProductStatusBadge
                          inStock={product.inStock}
                          featured={product.featured}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Rating
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-foreground font-medium">
                          {product.rating}
                        </span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-muted-foreground/30"}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-muted-foreground text-sm">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Description
                  </label>
                  <p className="text-foreground text-sm leading-relaxed bg-muted/30 p-3 rounded-lg">
                    {product.description}
                  </p>
                </div>

                {/* Applications */}
                {product.applications && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                      <Wrench className="h-4 w-4 mr-2" />
                      Applications
                    </label>
                    <p className="text-foreground text-sm leading-relaxed bg-muted/30 p-3 rounded-lg">
                      {product.applications}
                    </p>
                  </div>
                )}

                {/* Warranty */}
                {product.warranty && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Warranty
                    </label>
                    <p className="text-foreground">{product.warranty}</p>
                  </div>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                      <ListChecks className="h-4 w-4 mr-2" />
                      Features
                    </label>
                    <div className="space-y-1">
                      {product.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Specifications
                      </label>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center text-sm border-b border-border/50 last:border-0 pb-1 last:pb-0"
                            >
                              <span className="text-muted-foreground font-medium">
                                {key}:
                              </span>
                              <span className="text-foreground">{value}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>

              <SheetFooter>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(`/products/${product.id}`, "_blank")
                  }
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View in Store
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Edit Product Sheet */}
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                title="Edit Product"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw] sm:w-[600px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <Edit3 className="h-5 w-5" />
                  <span>Edit Product</span>
                </SheetTitle>
                <SheetDescription>
                  Make changes to {product.name}
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Product Name
                      </label>
                      <Input defaultValue={product.name} className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Product Code
                      </label>
                      <Input
                        defaultValue={product.productCode || ""}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Category
                      </label>
                      <select
                        aria-label="Product category"
                        defaultValue={product.category}
                        className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      >
                        {categories
                          .filter((cat) => cat.id !== "all")
                          .map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Sub-Category
                      </label>
                      <Input
                        defaultValue={product.subCategory || ""}
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pricing & Inventory
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Price
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        defaultValue={product.price}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Original Price
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        defaultValue={product.originalPrice || ""}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Discount Price
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        defaultValue={product.discountPrice || ""}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Quantity
                      </label>
                      <Input
                        type="number"
                        defaultValue={product.quantity || 0}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Weight (kg)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        defaultValue={product.weight || ""}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Unit
                      </label>
                      <select
                        aria-label="Product unit"
                        defaultValue={product.unitName || "piece"}
                        className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      >
                        <option value="piece">Piece</option>
                        <option value="set">Set</option>
                        <option value="pair">Pair</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Product Details
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Description
                      </label>
                      <textarea
                        aria-label="Description"
                        id="description"
                        defaultValue={product.description}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Applications
                      </label>
                      <textarea
                        aria-label="Applications"
                        id="applications"
                        defaultValue={product.applications || ""}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                        rows={2}
                        placeholder="Describe where and how this product can be used"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Warranty
                      </label>
                      <Input
                        aria-label="Warranty"
                        id="warranty"
                        defaultValue={product.warranty || ""}
                        className="h-10"
                        placeholder="e.g., 2 years manufacturer warranty"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground flex items-center">
                      <ListChecks className="h-4 w-4 mr-2" />
                      Features
                    </h4>
                    <div className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Input
                            aria-label="Feature"
                            id="feature"
                            defaultValue={feature}
                            className="h-10 flex-1"
                            placeholder="Enter product feature"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 w-10 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full h-10 border-dashed"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Specifications
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div key={key} className="grid grid-cols-2 gap-2">
                              <Input
                                defaultValue={key}
                                className="h-10"
                                placeholder="Specification name"
                              />
                              <div className="flex space-x-2">
                                <Input
                                  defaultValue={value}
                                  className="h-10 flex-1"
                                  placeholder="Specification value"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-10 w-10 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ),
                        )}
                        <Button
                          variant="outline"
                          className="w-full h-10 border-dashed"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Specification
                        </Button>
                      </div>
                    </div>
                  )}

                {/* Product Status */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">
                    Product Status
                  </h4>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`featured-${product.id}`}
                        defaultChecked={product.featured}
                        className="rounded border-border"
                      />
                      <label
                        htmlFor={`featured-${product.id}`}
                        className="text-sm text-foreground"
                      >
                        Featured Product
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`instock-${product.id}`}
                        defaultChecked={product.inStock}
                        className="rounded border-border"
                      />
                      <label
                        htmlFor={`instock-${product.id}`}
                        className="text-sm text-foreground"
                      >
                        In Stock
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <SheetFooter>
                <div className="flex space-x-2 w-full">
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Delete Product Sheet */}
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                title="Delete Product"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Delete Product</SheetTitle>
                <SheetDescription>
                  Are you sure you want to delete {product.name}? This action
                  cannot be undone.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <div className="bg-muted/50 dark:bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: #{product.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price, currency)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <div className="flex space-x-2 w-full">
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* More Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                title="More Actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDuplicate(product)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleFeatured(product)}>
                {product.featured ? (
                  <>
                    <StarOff className="h-4 w-4 mr-2" />
                    Remove from Featured
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Add to Featured
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => window.open(`/products/${product.id}`, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Store
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}

export default function AdminProductsPage() {
  const router = useRouter();
  const { state: adminState } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Status filter
    if (statusFilter === "instock") {
      filtered = filtered.filter((product) => product.inStock);
    } else if (statusFilter === "outofstock") {
      filtered = filtered.filter((product) => !product.inStock);
    } else if (statusFilter === "featured") {
      filtered = filtered.filter((product) => product.featured);
    }

    // Sort
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Event handlers
  const handleEdit = (product: (typeof products)[0]) => {
    console.log("Edit product:", product);
    // TODO: Open edit sheet or navigate to edit page
  };

  const handleDelete = (productId: string) => {
    console.log("Delete product:", productId);
    // TODO: Show confirmation dialog and delete
  };

  const handleView = (product: (typeof products)[0]) => {
    console.log("View product:", product);
    // TODO: Open product details sheet or navigate to view page
  };

  const handleToggleFeatured = (product: (typeof products)[0]) => {
    console.log("Toggle featured:", product);
    // TODO: Update product featured status
  };

  const handleDuplicate = (product: (typeof products)[0]) => {
    console.log("Duplicate product:", product);
    // TODO: Create a copy of the product
  };

  const handleAddProduct = () => {
    router.push("/admin/products/add");
  };

  // Stats
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const featuredProducts = products.filter((p) => p.featured).length;

  return (
    <AdminLayout
      title="Products"
      subtitle="Manage your product catalog and inventory"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {totalProducts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Stock
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {inStockProducts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Out of Stock
                  </p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {outOfStockProducts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Featured
                  </p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {featuredProducts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products by name, category, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <select
                  aria-label="Category Filter"
                  id="categoryFilter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value="all">All Categories</option>
                  {categories
                    .filter((cat) => cat.id !== "all")
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>

                {/* Status Filter */}
                <select
                  aria-label="Status Filter"
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value="all">All Status</option>
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                  <option value="featured">Featured</option>
                </select>

                {/* Sort */}
                <select
                  aria-label="Sort"
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/admin/categories")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Categories
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products ({filteredProducts.length})</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)}{" "}
                  of {filteredProducts.length}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <div className="min-w-full">
                <table className="w-full table-fixed">
                  <thead className="bg-muted/50 dark:bg-muted/30 border-b border-border sticky top-0 z-10">
                    <tr>
                      <th className="text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground w-[25%]">
                        <div className="truncate">Product</div>
                      </th>
                      <th className="text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground w-[10%]">
                        <div className="truncate">SKU</div>
                      </th>
                      <th className="text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground w-[15%]">
                        <div className="truncate">Price & Stock</div>
                      </th>
                      <th className="text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground w-[10%]">
                        <div className="truncate">Weight/Unit</div>
                      </th>
                      <th className="text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground w-[15%]">
                        <div className="truncate">Status</div>
                      </th>
                      <th className="text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground w-[10%]">
                        <div className="truncate">Rating</div>
                      </th>
                      <th className="text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground w-[15%]">
                        <div className="truncate">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.length > 0 ? (
                      paginatedProducts.map((product) => (
                        <ProductRow
                          key={product.id}
                          product={product}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onView={handleView}
                          onToggleFeatured={handleToggleFeatured}
                          onDuplicate={handleDuplicate}
                          currency={adminState.settings?.currency || 'USD'}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center">
                          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-foreground">No products found</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Try adjusting your search or filter criteria
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-lg p-4 space-y-3"
                  >
                    {/* Product Header */}
                    <div className="flex items-start space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-medium text-foreground text-sm truncate"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          SKU: {product.id}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-lg font-bold text-foreground">
                            {formatPrice(product.price, adminState.settings?.currency || 'USD')}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            Stock: {product.quantity || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(product)}
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1"
                          title="View Product"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => handleEdit(product)}
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDuplicate(product)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleFeatured(product)}
                            >
                              {product.featured ? (
                                <>
                                  <StarOff className="mr-2 h-4 w-4" />
                                  Remove Featured
                                </>
                              ) : (
                                <>
                                  <Star className="mr-2 h-4 w-4" />
                                  Mark Featured
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium text-foreground">
                          {product.category}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <div className="mt-1">
                          <Badge
                            variant={
                              product.inStock ? "default" : "destructive"
                            }
                            className="text-xs"
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Weight:</span>
                        <p className="font-medium text-foreground">
                          {product.weight || 0} kg
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center mt-1">
                          <span className="font-medium text-foreground">
                            {product.rating}
                          </span>
                          <div className="flex ml-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
