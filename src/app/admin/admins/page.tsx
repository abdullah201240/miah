'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

// Simple Alert component using Radix UI primitives
const Alert = ({ 
  title, 
  description, 
  isOpen, 
  onClose, 
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel"
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-background border border-border rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            <Button onClick={() => {
              onConfirm();
              onClose();
            }}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Types
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin' | 'manager';
  avatar?: string;
  permissions: string[];
  lastLogin?: string;
  status: 'active' | 'inactive';
}

// Mock data - in a real app this would come from an API
const mockAdmins: AdminUser[] = [
  {
    id: 'admin-001',
    name: 'John Admin',
    email: 'admin@furnistore.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    permissions: [
      'manage_products',
      'manage_orders',
      'manage_customers',
      'view_analytics',
      'manage_admin_users',
      'system_settings'
    ],
    lastLogin: new Date().toISOString(),
    status: 'active'
  },
  {
    id: 'admin-002',
    name: 'Jane Manager',
    email: 'manager@furnistore.com',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    permissions: [
      'manage_products',
      'manage_orders',
      'manage_customers'
    ],
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: 'admin-003',
    name: 'Bob Support',
    email: 'support@furnistore.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    permissions: [
      'manage_customers',
      'view_analytics'
    ],
    lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: 'admin-004',
    name: 'Sarah Content',
    email: 'content@furnistore.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    permissions: [
      'manage_products'
    ],
    lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'inactive'
  }
];

// Role definitions with permissions
const roles = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full access to all admin features',
    permissions: [
      'manage_products',
      'manage_orders',
      'manage_customers',
      'view_analytics',
      'manage_admin_users',
      'system_settings'
    ]
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Manage products, orders, and customers',
    permissions: [
      'manage_products',
      'manage_orders',
      'manage_customers'
    ]
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Limited admin access based on assigned permissions',
    permissions: []
  }
];

// Permission definitions
const permissions = [
  { id: 'manage_products', name: 'Manage Products', description: 'Create, edit, and delete products' },
  { id: 'manage_orders', name: 'Manage Orders', description: 'View and update orders' },
  { id: 'manage_customers', name: 'Manage Customers', description: 'View and manage customer accounts' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Access to analytics and reports' },
  { id: 'manage_admin_users', name: 'Manage Admin Users', description: 'Create and manage other admin accounts' },
  { id: 'system_settings', name: 'System Settings', description: 'Modify system-wide settings' }
];

export default function AdminManagementPage() {
  const { state } = useAdmin();
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'admin' as 'admin' | 'super_admin' | 'manager',
    permissions: [] as string[],
    status: 'active' as 'active' | 'inactive'
  });

  // Filter admins based on search and filters
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || admin.role === filterRole;
    const matchesStatus = filterStatus === 'all' || admin.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle adding a new admin
  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) return;
    
    const rolePermissions = roles.find(r => r.id === newAdmin.role)?.permissions || [];
    
    const adminToAdd: AdminUser = {
      id: `admin-${Date.now()}`,
      ...newAdmin,
      permissions: newAdmin.role === 'admin' ? newAdmin.permissions : rolePermissions,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newAdmin.name)}&background=random`
    };
    
    setAdmins([...admins, adminToAdd]);
    setNewAdmin({
      name: '',
      email: '',
      role: 'admin',
      permissions: [],
      status: 'active'
    });
    setIsAdding(false);
  };

  // Handle updating an admin
  const handleUpdateAdmin = () => {
    if (!editingAdmin) return;
    
    const rolePermissions = roles.find(r => r.id === editingAdmin.role)?.permissions || [];
    
    const updatedAdmins = admins.map(admin => 
      admin.id === editingAdmin.id 
        ? {
            ...editingAdmin,
            permissions: editingAdmin.role === 'admin' ? editingAdmin.permissions : rolePermissions
          }
        : admin
    );
    
    setAdmins(updatedAdmins);
    setEditingAdmin(null);
  };

  // Show alert for activating/deactivating an admin
  const showStatusChangeAlert = (admin: AdminUser) => {
    const newStatus = admin.status === 'active' ? 'inactive' : 'active';
    setAlert({
      isOpen: true,
      title: `${newStatus === 'active' ? 'Activate' : 'Deactivate'} Admin`,
      description: `Are you sure you want to ${newStatus} the admin account for ${admin.name}?`,
      onConfirm: () => {
        const updatedAdmins = admins.map(a => 
          a.id === admin.id 
            ? {...a, status: newStatus} as AdminUser
            : a
        );
        setAdmins(updatedAdmins);
      }
    });
  };

  // Toggle permission for new admin
  const toggleNewAdminPermission = (permission: string) => {
    setNewAdmin(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  // Toggle permission for editing admin
  const toggleEditingAdminPermission = (permission: string) => {
    if (!editingAdmin) return;
    
    setEditingAdmin({
      ...editingAdmin,
      permissions: editingAdmin.permissions.includes(permission)
        ? editingAdmin.permissions.filter(p => p !== permission)
        : [...editingAdmin.permissions, permission]
    });
  };

  // Get role name for display
  const getRoleName = (role: string) => {
    const roleObj = roles.find(r => r.id === role);
    return roleObj ? roleObj.name : role;
  };

  // Get permission name for display
  const getPermissionName = (permission: string) => {
    const permObj = permissions.find(p => p.id === permission);
    return permObj ? permObj.name : permission;
  };

  return (
    <AdminLayout title="Admin Management" subtitle="Manage admin users and permissions">
      <div className="space-y-6">
        {/* Controls */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Admin Users</h3>
                <p className="text-muted-foreground">Manage access and permissions for admin users</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-48"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button onClick={() => setIsAdding(true)} className="whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Admin Form */}
        {isAdding && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Admin User
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <Input
                      type="text"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <Input
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                    <select
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value as any})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {roles.find(r => r.id === newAdmin.role)?.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                    <select
                      value={newAdmin.status}
                      onChange={(e) => setNewAdmin({...newAdmin, status: e.target.value as any})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                {newAdmin.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Permissions</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {permissions.map(permission => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`new-perm-${permission.id}`}
                            checked={newAdmin.permissions.includes(permission.id)}
                            onChange={() => toggleNewAdminPermission(permission.id)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <label htmlFor={`new-perm-${permission.id}`} className="text-sm text-foreground">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAdmin}>
                    Add Admin User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Admin Form */}
        {editingAdmin && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="h-5 w-5 mr-2" />
                Edit Admin User
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <Input
                      type="text"
                      value={editingAdmin.name}
                      onChange={(e) => setEditingAdmin({...editingAdmin, name: e.target.value})}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <Input
                      type="email"
                      value={editingAdmin.email}
                      onChange={(e) => setEditingAdmin({...editingAdmin, email: e.target.value})}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                    <select
                      value={editingAdmin.role}
                      onChange={(e) => setEditingAdmin({...editingAdmin, role: e.target.value as any})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {roles.find(r => r.id === editingAdmin.role)?.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                    <select
                      value={editingAdmin.status}
                      onChange={(e) => setEditingAdmin({...editingAdmin, status: e.target.value as any})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                {editingAdmin.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Permissions</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {permissions.map(permission => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`edit-perm-${permission.id}`}
                            checked={editingAdmin.permissions.includes(permission.id)}
                            onChange={() => toggleEditingAdminPermission(permission.id)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <label htmlFor={`edit-perm-${permission.id}`} className="text-sm text-foreground">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setEditingAdmin(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateAdmin}>
                    Update Admin User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admins Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Admin Users ({filteredAdmins.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">User</th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">Permissions</th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">Last Login</th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={admin.avatar}
                            alt={admin.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{admin.name}</p>
                            <p className="text-sm text-muted-foreground">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          {getRoleName(admin.role)}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {admin.permissions.slice(0, 3).map(permission => (
                            <span key={permission} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground">
                              {getPermissionName(permission)}
                            </span>
                          ))}
                          {admin.permissions.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground">
                              +{admin.permissions.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-foreground">
                        {admin.lastLogin 
                          ? new Date(admin.lastLogin).toLocaleDateString() 
                          : 'Never'}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          admin.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setEditingAdmin(admin)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => showStatusChangeAlert(admin)}
                          >
                            {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Guide */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Permissions Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissions.map(permission => (
                <div key={permission.id} className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground">{permission.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{permission.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Alert Dialog */}
        {alert && (
          <Alert
            title={alert.title}
            description={alert.description}
            isOpen={alert.isOpen}
            onClose={() => setAlert(null)}
            onConfirm={alert.onConfirm}
          />
        )}
      </div>
    </AdminLayout>
  );
}