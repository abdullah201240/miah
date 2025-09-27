'use client';

import React, { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  HelpCircle, 
  ShoppingCart, 
  User, 
  Package, 
  CreditCard, 
  Shield, 
  Truck, 
  RotateCcw, 
  Mail, 
  Phone, 
  Search,
  ChevronRight,
  ChevronDown,
  FileText,
  Lock,
  Settings,
  ArrowRight
} from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const helpCategories = [
    {
      id: 'ordering',
      title: 'Ordering & Purchasing',
      icon: <ShoppingCart className="h-5 w-5" />,
      articles: [
        {
          id: 1,
          title: 'How do I place an order?',
          excerpt: 'Learn how to browse products and complete your purchase'
        },
        {
          id: 2,
          title: 'What payment methods do you accept?',
          excerpt: 'Information about accepted payment options'
        },
        {
          id: 3,
          title: 'Can I modify or cancel my order?',
          excerpt: 'Steps to change or cancel your order after placement'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: <User className="h-5 w-5" />,
      articles: [
        {
          id: 4,
          title: 'How do I create an account?',
          excerpt: 'Step-by-step guide to setting up your account'
        },
        {
          id: 5,
          title: 'How do I reset my password?',
          excerpt: 'Instructions for resetting your account password'
        },
        {
          id: 6,
          title: 'How do I update my personal information?',
          excerpt: 'Updating your profile and contact details'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: <Truck className="h-5 w-5" />,
      articles: [
        {
          id: 7,
          title: 'What are your shipping options?',
          excerpt: 'Details about delivery methods and timeframes'
        },
        {
          id: 8,
          title: 'How much does shipping cost?',
          excerpt: 'Shipping fees for different order values and locations'
        },
        {
          id: 9,
          title: 'How can I track my order?',
          excerpt: 'Tracking your shipment with our tracking system'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      icon: <RotateCcw className="h-5 w-5" />,
      articles: [
        {
          id: 10,
          title: 'What is your return policy?',
          excerpt: 'Conditions and time limits for returns'
        },
        {
          id: 11,
          title: 'How do I initiate a return?',
          excerpt: 'Process for returning items and getting refunds'
        },
        {
          id: 12,
          title: 'When will I receive my refund?',
          excerpt: 'Timeline for processing refunds after returns'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Pricing',
      icon: <CreditCard className="h-5 w-5" />,
      articles: [
        {
          id: 13,
          title: 'Why was my payment declined?',
          excerpt: 'Common reasons for payment failures and solutions'
        },
        {
          id: 14,
          title: 'Do you offer financing options?',
          excerpt: 'Information about payment plans and financing'
        },
        {
          id: 15,
          title: 'Are taxes included in the price?',
          excerpt: 'Tax calculations and display in your order'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Lock className="h-5 w-5" />,
      articles: [
        {
          id: 16,
          title: 'How do you protect my personal information?',
          excerpt: 'Our commitment to data security and privacy'
        },
        {
          id: 17,
          title: 'Is it safe to shop on your website?',
          excerpt: 'Security measures we implement to protect your transactions'
        },
        {
          id: 18,
          title: 'How can I report suspicious activity?',
          excerpt: 'Steps to report security concerns'
        }
      ]
    }
  ];

  const popularTopics = [
    { id: 1, title: 'Track Your Order', icon: <Package className="h-4 w-4" /> },
    { id: 2, title: 'Return Policy', icon: <RotateCcw className="h-4 w-4" /> },
    { id: 3, title: 'Payment Methods', icon: <CreditCard className="h-4 w-4" /> },
    { id: 4, title: 'Shipping Information', icon: <Truck className="h-4 w-4" /> }
  ];

  const filteredCategories = helpCategories.filter(category => 
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <MobileLayout 
      mobileTitle="Help Center" 
      showBack={true}
    >
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <HelpCircle className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90 mb-8">
              Find answers to common questions about our products, services, and policies
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 w-full rounded-full text-gray-900 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="container mx-auto px-4 py-8 -mt-8 relative z-10">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {popularTopics.map((topic) => (
                  <Button
                    key={topic.id}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 p-4 hover:bg-blue-50 transition-colors duration-300 group"
                    onClick={() => setSearchQuery(topic.title)}
                  >
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full mb-2 group-hover:bg-blue-200">
                      {topic.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
                      {topic.title}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="container mx-auto px-4 py-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery ? 'Search Results' : 'Browse Help Topics'}
            </h2>
            <p className="text-gray-600">
              {searchQuery 
                ? `Found ${filteredCategories.length} categories matching "${searchQuery}"` 
                : 'Select a category to find answers to your questions'}
            </p>
          </div>

          <div className="space-y-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Card key={category.id} className="border-0 shadow-lg">
                  <CardHeader 
                    className="cursor-pointer flex flex-row items-center justify-between pb-3"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        {category.icon}
                      </div>
                      <CardTitle className="text-lg font-semibold">{category.title}</CardTitle>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </CardHeader>
                  {expandedCategory === category.id && (
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {category.articles.map((article) => (
                          <div 
                            key={article.id} 
                            className="p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 border border-gray-100"
                          >
                            <h3 className="font-medium text-gray-900 mb-1 flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 ml-6">{article.excerpt}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any help articles matching your search.
                  </p>
                  <Button 
                    onClick={() => setSearchQuery('')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Browse All Topics
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="container mx-auto px-4 py-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-600 text-white rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Still Need Help?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6"
                  asChild
                >
                  <a href="/contact">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Support
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-6"
                  asChild
                >
                  <a href="tel:+15551234567">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
}