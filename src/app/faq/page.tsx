'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Phone, Mail, Clock, Shield, Truck, Heart, Star, Users, Award, CheckCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

export default function FAQPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 5-7 business days. Express delivery is available for an additional fee and takes 2-3 business days. Delivery times may vary based on your location and product availability.",
      category: "Delivery"
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all furniture items. Items must be in original condition with all packaging. Some items may be subject to a restocking fee. Please contact our customer service team to initiate a return.",
      category: "Returns"
    },
    {
      question: "Do you offer assembly services?",
      answer: "Yes, we provide professional assembly services for most furniture items for an additional fee. Our skilled technicians will assemble your furniture in your home and remove all packaging materials.",
      category: "Services"
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive tracking information via email once your order ships. You can also track your order in your account dashboard. If you have any issues with tracking, please contact our support team.",
      category: "Orders"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also accept PayPal and bank transfers. All payments are processed securely through our encrypted payment system.",
      category: "Payment"
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, we partner with several financing companies to offer flexible payment plans. You can apply for financing at checkout or contact our sales team for more information about available options.",
      category: "Payment"
    },
    {
      question: "How do I care for my furniture?",
      answer: "Each furniture piece comes with specific care instructions. Generally, we recommend dusting regularly with a soft cloth and avoiding harsh chemicals. For fabric items, professional cleaning is recommended for stains.",
      category: "Care"
    },
    {
      question: "What is your warranty policy?",
      answer: "We offer a 1-year limited warranty on all furniture items covering manufacturing defects. Extended warranty options are available for purchase. Please see our warranty page for complete details.",
      category: "Warranty"
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer volume discounts for bulk orders. Contact our sales team for custom pricing on orders of 10 or more items. Special rates are available for businesses and interior designers.",
      category: "Pricing"
    },
    {
      question: "Can I customize furniture pieces?",
      answer: "Many of our furniture pieces can be customized with different colors, fabrics, or finishes. Customization options vary by product. Please contact us to discuss your specific requirements.",
      category: "Customization"
    }
  ];

  const stats = [
    { icon: Users, number: "50K+", label: "Happy Customers", color: "text-blue-500", bg: "bg-blue-100" },
    { icon: Star, number: "4.9", label: "Average Rating", color: "text-yellow-500", bg: "bg-yellow-100" },
    { icon: Truck, number: "99%", label: "On-Time Delivery", color: "text-green-500", bg: "bg-green-100" },
    { icon: Award, number: "5", label: "Years Experience", color: "text-purple-500", bg: "bg-purple-100" }
  ];

  const quickLinks = [
    { icon: MessageCircle, title: "Live Chat", description: "Available 24/7", action: "Start Chat", color: "text-blue-500", bg: "bg-blue-100" },
    { icon: Phone, title: "Call Support", description: "+1 (555) 123-4567", action: "Call Now", color: "text-green-500", bg: "bg-green-100" },
    { icon: Mail, title: "Email Us", description: "support@furniture.com", action: "Send Email", color: "text-red-500", bg: "bg-red-100" },
    { icon: Clock, title: "Business Hours", description: "Mon-Fri 9AM-6PM", action: "View Hours", color: "text-orange-500", bg: "bg-orange-100" }
  ];

  return (
    <MobileLayout 
          showBack={true}
        >
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80')`
          }}
        ></div>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gray-900/70"></div>
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-8 drop-shadow-lg">
              Everything you need to know about our furniture and services
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-white/30 rounded-full animate-pulse z-20"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-white/30 rounded-full animate-bounce z-20"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-white rounded-full animate-ping z-20"></div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bg} rounded-full mb-4 hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section - Updated to show multiple questions in a row */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Common Questions</h2>
              <p className="text-gray-600 text-lg">Find quick answers to your most pressing questions</p>
            </div>

            {/* Grid layout for FAQ items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card 
                  key={index} 
                  className={`border-none shadow-md bg-white hover:shadow-lg transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <span className="text-xs font-semibold text-white bg-gray-800 px-2 py-1 rounded-full whitespace-nowrap">
                        {faq.category}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                        <p className="text-gray-700 text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="py-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-gray-300 text-lg">Choose your preferred way to get in touch</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickLinks.map((link, index) => (
              <Card 
                key={index}
                className={`bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${link.bg} rounded-full mb-4`}>
                    <link.icon className={`w-8 h-8 ${link.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{link.title}</h3>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300">
                    {link.action}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Promise to You</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">Every piece is crafted with premium materials and backed by our quality promise.</p>
              </div>
              <div className="group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Customer First</h3>
                <p className="text-gray-600">Your satisfaction is our priority. We're here to help every step of the way.</p>
              </div>
              <div className="group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Returns</h3>
                <p className="text-gray-600">Not completely happy? Our hassle-free return policy has you covered.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our customer service team is standing by to help you find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium text-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105">
              Start Live Chat
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium text-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105">
              Call +1 (555) 123-4567
            </button>
          </div>
        </div>
      </div>
    </div>
    </MobileLayout>
  );
}