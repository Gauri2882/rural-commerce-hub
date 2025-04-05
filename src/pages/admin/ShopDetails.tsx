
import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminMobileNav from '@/components/layout/AdminMobileNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { Shop } from '@/types';

const ShopDetails: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([
    {
      id: '1',
      name: 'Farm Fresh Produce',
      description: 'Local farm products directly from farmers',
      ownerName: 'John Smith',
      contactNumber: '+1234567890',
      email: 'john@farmfresh.com',
      address: '123 Rural Road, Countryside',
      floorId: '1',
      categoryId: '1',
      imageUrl: '/placeholder.svg',
      rating: 4.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Handmade Crafts',
      description: 'Artisanal handcrafted items from local artisans',
      ownerName: 'Jane Doe',
      contactNumber: '+0987654321',
      email: 'jane@handmade.com',
      address: '456 Artisan Street, Craftville',
      floorId: '2',
      categoryId: '2',
      imageUrl: '/placeholder.svg',
      rating: 4.2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  const [isAddingShop, setIsAddingShop] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const initialShopState: Omit<Shop, 'id' | 'createdAt' | 'updatedAt'> = {
    name: '',
    description: '',
    ownerName: '',
    contactNumber: '',
    email: '',
    address: '',
    floorId: '',
    categoryId: '',
    imageUrl: '/placeholder.svg',
    rating: 0
  };
  
  const [newShop, setNewShop] = useState<Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>>(initialShopState);
  
  const handleAddShop = () => {
    const shopToAdd: Shop = {
      ...newShop,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setShops([...shops, shopToAdd]);
    setNewShop(initialShopState);
    setIsAddingShop(false);
    
    toast({
      title: 'Shop added',
      description: `${shopToAdd.name} has been successfully added.`
    });
  };
  
  const handleUpdateShop = () => {
    if (!editingShop) return;
    
    const updatedShops = shops.map(shop => 
      shop.id === editingShop.id ? { ...editingShop, updatedAt: new Date() } : shop
    );
    
    setShops(updatedShops);
    setEditingShop(null);
    
    toast({
      title: 'Shop updated',
      description: `${editingShop.name} has been successfully updated.`
    });
  };
  
  const handleDeleteShop = (id: string) => {
    const shopToDelete = shops.find(shop => shop.id === id);
    if (!shopToDelete) return;
    
    const updatedShops = shops.filter(shop => shop.id !== id);
    setShops(updatedShops);
    
    toast({
      title: 'Shop deleted',
      description: `${shopToDelete.name} has been successfully deleted.`,
      variant: 'destructive'
    });
  };
  
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <AdminMobileNav />
      
      <div className="flex-1">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Shop Management</h1>
              <p className="text-gray-600">Manage all shops in the SuperMall</p>
            </div>
            
            <Button onClick={() => setIsAddingShop(true)} className="bg-primary">
              <Plus size={16} className="mr-2" />
              Add New Shop
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Search Shops</CardTitle>
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    type="text" 
                    placeholder="Search by name, description or owner..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
          
          {isAddingShop && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Shop Name</label>
                      <Input 
                        value={newShop.name} 
                        onChange={(e) => setNewShop({...newShop, name: e.target.value})}
                        placeholder="Enter shop name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Owner Name</label>
                      <Input 
                        value={newShop.ownerName} 
                        onChange={(e) => setNewShop({...newShop, ownerName: e.target.value})}
                        placeholder="Enter owner name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Contact Number</label>
                      <Input 
                        value={newShop.contactNumber} 
                        onChange={(e) => setNewShop({...newShop, contactNumber: e.target.value})}
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input 
                        type="email"
                        value={newShop.email} 
                        onChange={(e) => setNewShop({...newShop, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea 
                        value={newShop.description} 
                        onChange={(e) => setNewShop({...newShop, description: e.target.value})}
                        placeholder="Enter shop description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <Input 
                        value={newShop.address} 
                        onChange={(e) => setNewShop({...newShop, address: e.target.value})}
                        placeholder="Enter shop address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Floor</label>
                        <Input 
                          value={newShop.floorId} 
                          onChange={(e) => setNewShop({...newShop, floorId: e.target.value})}
                          placeholder="Floor ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <Input 
                          value={newShop.categoryId} 
                          onChange={(e) => setNewShop({...newShop, categoryId: e.target.value})}
                          placeholder="Category ID"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setNewShop(initialShopState);
                      setIsAddingShop(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddShop}>
                    Save Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {editingShop && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Edit Shop: {editingShop.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Shop Name</label>
                      <Input 
                        value={editingShop.name} 
                        onChange={(e) => setEditingShop({...editingShop, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Owner Name</label>
                      <Input 
                        value={editingShop.ownerName} 
                        onChange={(e) => setEditingShop({...editingShop, ownerName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Contact Number</label>
                      <Input 
                        value={editingShop.contactNumber} 
                        onChange={(e) => setEditingShop({...editingShop, contactNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input 
                        type="email"
                        value={editingShop.email} 
                        onChange={(e) => setEditingShop({...editingShop, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea 
                        value={editingShop.description} 
                        onChange={(e) => setEditingShop({...editingShop, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <Input 
                        value={editingShop.address} 
                        onChange={(e) => setEditingShop({...editingShop, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Floor</label>
                        <Input 
                          value={editingShop.floorId} 
                          onChange={(e) => setEditingShop({...editingShop, floorId: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <Input 
                          value={editingShop.categoryId} 
                          onChange={(e) => setEditingShop({...editingShop, categoryId: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingShop(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateShop}>
                    Update Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <Card key={shop.id}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={shop.imageUrl || "/placeholder.svg"} 
                    alt={shop.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shop.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Owner:</p>
                      <p className="font-medium">{shop.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Contact:</p>
                      <p className="font-medium">{shop.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Floor:</p>
                      <p className="font-medium">{shop.floorId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Category:</p>
                      <p className="font-medium">{shop.categoryId}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingShop(shop)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteShop(shop.id)}
                    >
                      <Trash size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredShops.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No shops found. Try a different search term or add a new shop.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
