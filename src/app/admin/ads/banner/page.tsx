'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BannerAdManagement() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [banners, setBanners] = useState([
    {
      id: 1,
      imageUrl: '/1.jpg',
      linkUrl: '/products',
      altText: 'Special Offer Banner 1',
      position: 'left'
    },
    {
      id: 2,
      imageUrl: '/2.jpg',
      linkUrl: '/products',
      altText: 'Special Offer Banner 2',
      position: 'right-top'
    },
    {
      id: 3,
      imageUrl: '/3.png',
      linkUrl: '/products',
      altText: 'Special Offer Banner 3',
      position: 'right-bottom'
    }
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a database or API
    alert('Banner ad settings saved successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, bannerId: number) => {
    // In a real app, this would upload the image and return a URL
    alert(`Image upload functionality for banner ${bannerId} would be implemented here`);
  };

  const updateBanner = (id: number, field: string, value: string) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, [field]: value } : banner
    ));
  };

  return (
    <AdminLayout title="Banner Ad Management" subtitle="Manage your homepage banner advertisements">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card className="border-none shadow-md rounded-none">
            <CardHeader>
              <CardTitle>Banner Ad Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Banner Ads</h3>
                  <p className="text-sm text-muted-foreground">Turn on/off the banner advertisements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isEnabled} 
                    onChange={() => setIsEnabled(!isEnabled)} 
                    aria-label="Toggle banner ads"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Banner Configuration */}
              <div className="space-y-4">
                <h3 className="font-medium">Banner Configuration</h3>
                
                {banners.map((banner) => (
                  <Card key={banner.id} className="border-none shadow-md rounded-none">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Banner {banner.id}</h4>
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {banner.position}
                        </span>
                      </div>
                      
                      {/* Image Upload */}
                      <div className="space-y-2">
                        <label htmlFor={`image-url-${banner.id}`} className="text-sm font-medium">Image</label>
                        <div className="flex items-center space-x-2">
                          <Input 
                            id={`image-url-${banner.id}`}
                            type="text" 
                            value={banner.imageUrl} 
                            onChange={(e) => updateBanner(banner.id, 'imageUrl', e.target.value)} 
                            placeholder="Enter image URL"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => document.getElementById(`image-upload-${banner.id}`)?.click()}
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </Button>
                          <input 
                            id={`image-upload-${banner.id}`} 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, banner.id)}
                            aria-label={`Upload image for banner ${banner.id}`}
                          />
                        </div>
                      </div>
                      
                      {/* Link URL */}
                      <div className="space-y-2">
                        <label htmlFor={`link-url-${banner.id}`} className="text-sm font-medium">Link URL</label>
                        <Input 
                          id={`link-url-${banner.id}`}
                          type="text" 
                          value={banner.linkUrl} 
                          onChange={(e) => updateBanner(banner.id, 'linkUrl', e.target.value)} 
                          placeholder="Enter destination URL"
                        />
                      </div>
                      
                      {/* Alt Text */}
                      <div className="space-y-2">
                        <label htmlFor={`alt-text-${banner.id}`} className="text-sm font-medium">Alt Text</label>
                        <Input 
                          id={`alt-text-${banner.id}`}
                          type="text" 
                          value={banner.altText} 
                          onChange={(e) => updateBanner(banner.id, 'altText', e.target.value)} 
                          placeholder="Enter alt text for accessibility"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
              <CardTitle>Banner Ad Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Banner ads are displayed on the homepage. The layout consists of one large banner on the left (8 columns)</p>
                <p>and two smaller banners stacked vertically on the right (4 columns). Make sure your images are optimized</p>
                <p>for fast loading and have the correct aspect ratios.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="border-none shadow-md rounded-none">
            <CardHeader>
              <CardTitle>Banner Ad Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 min-h-[400px]">
                {showPreview ? (
                  <div className="w-full min-h-[300px] md:min-h-[400px] grid grid-cols-12 gap-4">
                    {/* Left banner - 8 columns */}
                    <div className="col-span-12 md:col-span-8 relative min-h-[300px] md:min-h-[400px]">
                      <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed flex items-center justify-center">
                        <span className="text-muted-foreground">Banner 1 Preview</span>
                      </div>
                    </div>

                    {/* Right column - 4 columns */}
                    <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                      {/* Right top banner */}
                      <div className="relative min-h-[140px] md:min-h-[190px] flex-1">
                        <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed flex items-center justify-center">
                          <span className="text-muted-foreground">Banner 2 Preview</span>
                        </div>
                      </div>

                      {/* Right bottom banner */}
                      <div className="relative min-h-[140px] md:min-h-[190px] flex-1">
                        <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed flex items-center justify-center">
                          <span className="text-muted-foreground">Banner 3 Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="h-12 w-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <p className="text-muted-foreground">Click "Show Preview" to see how your banner ads will look</p>
                    </div>
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
                    <p className="font-medium">Banner Ads are {isEnabled ? 'Enabled' : 'Disabled'}</p>
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