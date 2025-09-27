'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function PopupAdManagement() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [title, setTitle] = useState('Special Discount Offer');
  const [description, setDescription] = useState('Get 30% off on all furniture items this weekend only!');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [imageUrl, setImageUrl] = useState('/discount-sofa-podium.jpg');
  const [linkUrl, setLinkUrl] = useState('/products');
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a database or API
    alert('Popup ad settings saved successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload the image and return a URL
    alert('Image upload functionality would be implemented here');
  };

  return (
    <AdminLayout title="Popup Ad Management" subtitle="Manage your popup advertisement settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card className='border-none shadow-md rounded-none'>
            <CardHeader>
              <CardTitle>Popup Ad Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Popup Ad</h3>
                  <p className="text-sm text-muted-foreground">Turn on/off the popup advertisement</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isEnabled} 
                    onChange={() => setIsEnabled(!isEnabled)} 
                    aria-label="Toggle popup ad"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter popup title"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Enter popup description"
                  rows={3}
                />
              </div>

              {/* CTA Text */}
              <div className="space-y-2">
                <label htmlFor="cta" className="text-sm font-medium">Call to Action</label>
                <Input 
                  id="cta" 
                  value={ctaText} 
                  onChange={(e) => setCtaText(e.target.value)} 
                  placeholder="Enter CTA text"
                />
              </div>

              {/* Link URL */}
              <div className="space-y-2">
                <label htmlFor="link" className="text-sm font-medium">Link URL</label>
                <Input 
                  id="link" 
                  value={linkUrl} 
                  onChange={(e) => setLinkUrl(e.target.value)} 
                  placeholder="Enter destination URL"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label htmlFor="image-url" className="text-sm font-medium">Popup Image</label>
                <div className="flex items-center space-x-4">
                  <Input 
                    id="image-url"
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="Enter image URL"
                  />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload
                  </Button>
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    aria-label="Upload image"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Recommended size: 800x600 pixels</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <Card className="border-none shadow-md rounded-none">
            <CardHeader>
              <CardTitle>Popup Ad Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Popup ads appear once per user session. They will only show to users who haven't seen them yet.</p>
                <p>Make sure your image is optimized for fast loading.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="border-none shadow-md rounded-none">
            <CardHeader>
              <CardTitle>Popup Ad Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                {showPreview ? (
                  <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
                    {/* Close button */}
                    <button 
                      aria-label="Close popup"
                      className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-white/80 p-2 backdrop-blur-sm hover:bg-white focus:outline-none"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Main image */}
                    <div className="relative h-64 w-full">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground">Popup Image Preview</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">{title || 'Popup Title'}</h3>
                      <p className="text-muted-foreground mb-4">{description || 'Popup description will appear here'}</p>
                      <Button>{ctaText || 'Call to Action'}</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="h-12 w-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <p className="text-muted-foreground">Click "Show Preview" to see how your popup ad will look</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="border-none shadow-md rounded-none">
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {isEnabled ? (
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <div>
                    <p className="font-medium">Popup Ad is {isEnabled ? 'Enabled' : 'Disabled'}</p>
                    <p className="text-sm text-muted-foreground">Last updated: Today</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}