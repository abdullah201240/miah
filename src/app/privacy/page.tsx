'use client';

import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Lock, 
  User, 
  Mail, 
  FileText, 
  Cookie,
  Database,
  Globe,
  Phone,
  MapPin
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 17, 2025';

  return (
    <MobileLayout showBack={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Your privacy is important to us</p>
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
                    This Privacy Policy describes how we collect, use, and protect your personal information when you visit our website or make purchases from us. We are committed to protecting your privacy and ensuring the security of your personal information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Database className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Information We Collect</h2>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-500" />
                    Personal Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Name and contact details (email address, phone number, mailing address)</li>
                    <li>Payment information (credit card details, billing address)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Order history and preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-500" />
                    Automatically Collected Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>IP address and device information</li>
                    <li>Browsing history and interactions with our website</li>
                    <li>Location data (if you grant permission)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Lock className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">How We Use Your Information</h2>
                </div>
              </div>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our website and services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Cookie className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Cookies and Tracking Technologies</h2>
                  <p className="text-gray-600 mt-2">
                    We use cookies and similar tracking technologies to enhance your browsing experience and understand how you use our website.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    These cookies are necessary for the website to function properly and cannot be switched off.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">Performance Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">Marketing Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    These cookies are used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <User className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Data Sharing and Disclosure</h2>
                  <p className="text-gray-600 mt-2">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                </div>
              </div>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>With service providers who assist us in operating our business</li>
                <li>With payment processors to complete transactions</li>
                <li>With shipping carriers to deliver your orders</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Lock className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Data Security</h2>
                  <p className="text-gray-600 mt-2">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Our security measures include:</h3>
                <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Your Rights</h2>
                  <p className="text-gray-600 mt-2">
                    You have certain rights regarding your personal information:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Access and Correction</h3>
                  <p className="text-gray-600 text-sm">
                    You can request access to your personal information and correct any inaccuracies.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Deletion</h3>
                  <p className="text-gray-600 text-sm">
                    You can request deletion of your personal information, subject to certain exceptions.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Objection</h3>
                  <p className="text-gray-600 text-sm">
                    You can object to the processing of your personal information in certain circumstances.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Data Portability</h3>
                  <p className="text-gray-600 text-sm">
                    You can request a copy of your personal information in a structured, machine-readable format.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Mail className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
                  <p className="text-gray-600 mt-2">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600 text-sm">privacy@furniture.com</p>
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
                      Privacy Department<br />
                      123 Privacy Street<br />
                      New York, NY 10001<br />
                      USA
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Changes */}
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Changes to This Policy</h2>
                  <p className="text-gray-600 mt-2">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
}