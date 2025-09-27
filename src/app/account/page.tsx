'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { formatPrice } from '@/lib/currency';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Mail,
  Phone
} from 'lucide-react';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '',
  joinDate: '2023-01-15',
  totalOrders: 12,
  totalSpent: 2450,
  membershipTier: 'Gold'
};

const mockRecentOrders = [
  {
    id: '12345',
    date: '2024-01-15',
    status: 'Delivered',
    total: 299.99,
    items: 2
  },
  {
    id: '12344',
    date: '2024-01-10',
    status: 'In Transit',
    total: 599.99,
    items: 1
  },
  {
    id: '12343',
    date: '2024-01-05',
    status: 'Processing',
    total: 149.99,
    items: 3
  }
];

const accountMenuItems = [
  {
    icon: Package,
    title: 'Orders',
    description: 'Track and manage your orders',
    href: '/orders',
    count: mockUser.totalOrders
  },
  {
    icon: Heart,
    title: 'Wishlist',
    description: 'View your saved items',
    href: '/wishlist',
    count: 5
  },
  {
    icon: MapPin,
    title: 'Addresses',
    description: 'Manage shipping addresses',
    href: '/addresses'
  },
  {
    icon: CreditCard,
    title: 'Payment Methods',
    description: 'Manage payment options',
    href: '/payment-methods'
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Notification preferences',
    href: '/notifications'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Account security settings',
    href: '/privacy'
  },
  {
    icon: HelpCircle,
    title: 'Help & Support',
    description: 'Get help and contact support',
    href: '/support'
  }
];

export default function AccountPage() {
  const { state: adminState } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(mockUser);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the updated user info to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserInfo(mockUser); // Reset to original values
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'in transit':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-20 h-20 md:w-24 md:h-24">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User className="w-10 h-10 md:w-12 md:h-12 text-gray-500" />
                    </div>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -bottom-1 -right-1 bg-white border border-gray-300 rounded-full p-2 h-8 w-8"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <div className="space-y-4 w-full max-w-md">
                      <Input
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        placeholder="Full Name"
                      />
                      <Input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        placeholder="Email"
                      />
                      <Input
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        placeholder="Phone"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>Save</Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {userInfo.name}
                      </h1>
                      <div className="text-gray-600 space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{userInfo.email}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{userInfo.phone}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="mt-4"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>

                {/* Membership Badge */}
                <div className="text-center">
                  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    {mockUser.membershipTier} Member
                  </div>
                  <p className="text-sm text-gray-600">
                    Member since {new Date(mockUser.joinDate).getFullYear()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {mockUser.totalOrders}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${mockUser.totalSpent.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm col-span-2 md:col-span-1">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-600">Wishlist Items</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Menu */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Account Settings
                  </h2>
                  
                  <div className="space-y-1">
                    {accountMenuItems.map((item, index) => (
                      <Link key={index} href={item.href}>
                        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <item.icon className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.count && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                                {item.count}
                              </span>
                            )}
                            <Settings className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Sign Out */}
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Recent Orders
                    </h3>
                    <Link href="/orders">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {mockRecentOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            Order #{order.id}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{new Date(order.date).toLocaleDateString()}</p>
                          <p>{order.items} item{order.items !== 1 ? 's' : ''}</p>
                          <p className="font-medium">{formatPrice(order.total, adminState.settings?.currency || 'USD')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
