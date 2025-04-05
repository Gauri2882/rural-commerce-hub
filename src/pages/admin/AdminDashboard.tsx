
import React from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminMobileNav from '@/components/layout/AdminMobileNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Tag, Users, Layers } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = [
    { 
      title: 'Total Shops', 
      value: 24, 
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      change: '+12% from last month'
    },
    { 
      title: 'Active Offers', 
      value: 16, 
      icon: <Tag className="h-8 w-8 text-green-500" />,
      change: '+4% from last month'
    },
    { 
      title: 'Total Categories', 
      value: 8, 
      icon: <Layers className="h-8 w-8 text-blue-500" />,
      change: 'No change from last month'
    },
    { 
      title: 'Total Customers', 
      value: 1200, 
      icon: <Users className="h-8 w-8 text-purple-500" />,
      change: '+18% from last month'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <AdminMobileNav />
      
      <div className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome to SuperMall admin panel</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Activity list */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ShoppingBag size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New shop added: "Farm Fresh Produce"</p>
                      <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Tag size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New offer created: "Summer Sale 25% OFF"</p>
                      <p className="text-xs text-gray-500">Yesterday, 3:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Layers size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New category added: "Handmade Crafts"</p>
                      <p className="text-xs text-gray-500">2 days ago, 11:15 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <a href="/admin/shops" className="p-4 bg-primary-light text-white rounded-lg flex flex-col items-center hover:bg-primary transition-colors">
                    <ShoppingBag size={24} />
                    <span className="mt-2 text-sm font-medium">Add Shop</span>
                  </a>
                  
                  <a href="/admin/offers" className="p-4 bg-green-500 text-white rounded-lg flex flex-col items-center hover:bg-green-600 transition-colors">
                    <Tag size={24} />
                    <span className="mt-2 text-sm font-medium">Create Offer</span>
                  </a>
                  
                  <a href="/admin/categories" className="p-4 bg-blue-500 text-white rounded-lg flex flex-col items-center hover:bg-blue-600 transition-colors">
                    <Layers size={24} />
                    <span className="mt-2 text-sm font-medium">Manage Categories</span>
                  </a>
                  
                  <a href="/admin/categories?tab=floors" className="p-4 bg-purple-500 text-white rounded-lg flex flex-col items-center hover:bg-purple-600 transition-colors">
                    <Layers size={24} />
                    <span className="mt-2 text-sm font-medium">Manage Floors</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
