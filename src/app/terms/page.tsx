'use client';

import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  User, 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = 'September 17, 2025';

  return (
    <MobileLayout showBack={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Please read these terms carefully before using our services</p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: {lastUpdated}
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <FileText className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Introduction</h2>
                  <p className="text-gray-600 mt-2">
                    Welcome to our e-commerce platform. These Terms of Service govern your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms and all applicable laws and regulations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Acceptance of Terms</h2>
                  <p className="text-gray-600 mt-2">
                    By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not access or use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <User className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">User Accounts</h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Account Registration</h3>
                  <p className="text-gray-600">
                    To access certain features of our services, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Account Security</h3>
                  <p className="text-gray-600">
                    You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Account Termination</h3>
                  <p className="text-gray-600">
                    We reserve the right to terminate or suspend your account at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users of our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products and Services */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <ShoppingCart className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Products and Services</h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Product Descriptions</h3>
                  <p className="text-gray-600">
                    We attempt to be as accurate as possible in describing products and services. However, we do not warrant that product descriptions or other content on our site are accurate, complete, reliable, current, or error-free.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
                  <p className="text-gray-600">
                    All products and services are subject to availability. We reserve the right to discontinue any product or service at any time without notice. We are not liable to you or any third party for any modification, suspension, or discontinuance of our services.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Pricing</h3>
                  <p className="text-gray-600">
                    All prices are subject to change without notice. We reserve the right to modify or discontinue, temporarily or permanently, any promotion or pricing structure with or without notice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders and Payments */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <CreditCard className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Orders and Payments</h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Order Acceptance</h3>
                  <p className="text-gray-600">
                    Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order. We reserve the right at any time after receipt of your order to accept or decline your order for any reason.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Payment Terms</h3>
                  <p className="text-gray-600">
                    You agree to pay all charges incurred by your account at the prices in effect when the charges are incurred. You are responsible for paying any applicable taxes relating to your purchases.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Shipping and Delivery</h3>
                  <p className="text-gray-600">
                    Shipping times and delivery dates are estimates only and cannot be guaranteed. We are not liable for any delays in shipping or delivery. Risk of loss and title for items purchased pass to you upon delivery to the carrier.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <AlertTriangle className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">User Conduct</h2>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. You agree not to:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Attempt to gain unauthorized access to our services</li>
                <li>Interfere with or disrupt the operation of our services</li>
                <li>Transmit any material that contains viruses or other harmful components</li>
                <li>Use our services to transmit spam or unsolicited commercial email</li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Intellectual Property</h2>
                  <p className="text-gray-600 mt-2">
                    All content included on our website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of our company or its content suppliers and protected by United States and international copyright laws.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <AlertTriangle className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Limitation of Liability</h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Disclaimer of Warranties</h3>
                  <p className="text-gray-600">
                    Our services are provided on an "as is" and "as available" basis. We make no warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Limitation of Damages</h3>
                  <p className="text-gray-600">
                    In no event shall we be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from the use of or inability to use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indemnification */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Indemnification</h2>
                  <p className="text-gray-600 mt-2">
                    You agree to indemnify and hold us harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of our services, your violation of these Terms, or your violation of any rights of another.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Globe className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Governing Law</h2>
                  <p className="text-gray-600 mt-2">
                    These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within New York, New York.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <FileText className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Changes to Terms</h2>
                  <p className="text-gray-600 mt-2">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Mail className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
                  <p className="text-gray-600 mt-2">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600 text-sm">terms@furniture.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Phone</h3>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Mailing Address</h3>
                    <p className="text-gray-600 text-sm">
                      Legal Department<br />
                      123 Terms Street<br />
                      New York, NY 10001<br />
                      USA
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Business Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
}