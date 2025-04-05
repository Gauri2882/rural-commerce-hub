
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminMobileNav from '@/components/layout/AdminMobileNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash } from 'lucide-react';
import { Category, Floor } from '@/types';

const CategoryManagement: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'categories';
  
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Fresh Produce',
      description: 'Farm-fresh fruits and vegetables',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Handmade Crafts',
      description: 'Artisanal handcrafted items from local artisans',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Organic Food',
      description: 'Certified organic food products',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Textiles',
      description: 'Traditional and modern textiles',
      imageUrl: '/placeholder.svg'
    }
  ]);
  
  const [floors, setFloors] = useState<Floor[]>([
    {
      id: '1',
      name: 'Ground Floor',
      description: 'Main entrance level with food and essentials',
      level: 1
    },
    {
      id: '2',
      name: 'First Floor',
      description: 'Clothing, textiles, and handmade crafts',
      level: 2
    },
    {
      id: '3',
      name: 'Second Floor',
      description: 'Home goods and furniture',
      level: 3
    }
  ]);
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingFloor, setIsAddingFloor] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingFloor, setEditingFloor] = useState<Floor | null>(null);
  const { toast } = useToast();
  
  const initialCategoryState: Omit<Category, 'id'> = {
    name: '',
    description: '',
    imageUrl: '/placeholder.svg'
  };
  
  const initialFloorState: Omit<Floor, 'id'> = {
    name: '',
    description: '',
    level: 0
  };
  
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>(initialCategoryState);
  const [newFloor, setNewFloor] = useState<Omit<Floor, 'id'>>(initialFloorState);
  
  const handleAddCategory = () => {
    const categoryToAdd: Category = {
      ...newCategory,
      id: Date.now().toString()
    };
    
    setCategories([...categories, categoryToAdd]);
    setNewCategory(initialCategoryState);
    setIsAddingCategory(false);
    
    toast({
      title: 'Category added',
      description: `${categoryToAdd.name} has been successfully added.`
    });
  };
  
  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    
    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    );
    
    setCategories(updatedCategories);
    setEditingCategory(null);
    
    toast({
      title: 'Category updated',
      description: `${editingCategory.name} has been successfully updated.`
    });
  };
  
  const handleDeleteCategory = (id: string) => {
    const categoryToDelete = categories.find(category => category.id === id);
    if (!categoryToDelete) return;
    
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    
    toast({
      title: 'Category deleted',
      description: `${categoryToDelete.name} has been successfully deleted.`,
      variant: 'destructive'
    });
  };
  
  const handleAddFloor = () => {
    const floorToAdd: Floor = {
      ...newFloor,
      id: Date.now().toString()
    };
    
    setFloors([...floors, floorToAdd]);
    setNewFloor(initialFloorState);
    setIsAddingFloor(false);
    
    toast({
      title: 'Floor added',
      description: `${floorToAdd.name} has been successfully added.`
    });
  };
  
  const handleUpdateFloor = () => {
    if (!editingFloor) return;
    
    const updatedFloors = floors.map(floor => 
      floor.id === editingFloor.id ? editingFloor : floor
    );
    
    setFloors(updatedFloors);
    setEditingFloor(null);
    
    toast({
      title: 'Floor updated',
      description: `${editingFloor.name} has been successfully updated.`
    });
  };
  
  const handleDeleteFloor = (id: string) => {
    const floorToDelete = floors.find(floor => floor.id === id);
    if (!floorToDelete) return;
    
    const updatedFloors = floors.filter(floor => floor.id !== id);
    setFloors(updatedFloors);
    
    toast({
      title: 'Floor deleted',
      description: `${floorToDelete.name} has been successfully deleted.`,
      variant: 'destructive'
    });
  };
  
  const handleTabChange = (value: string) => {
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <AdminMobileNav />
      
      <div className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Category & Floor Management</h1>
            <p className="text-gray-600">Manage all categories and floors in the SuperMall</p>
          </div>
          
          <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
            <TabsList className="mb-8">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="floors">Floors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories">
              <div className="flex justify-end mb-6">
                <Button onClick={() => setIsAddingCategory(true)} className="bg-primary">
                  <Plus size={16} className="mr-2" />
                  Add New Category
                </Button>
              </div>
              
              {isAddingCategory && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Category Name</label>
                        <Input 
                          value={newCategory.name} 
                          onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                          placeholder="Enter category name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          value={newCategory.description} 
                          onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                          placeholder="Enter category description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <Input 
                          value={newCategory.imageUrl} 
                          onChange={(e) => setNewCategory({...newCategory, imageUrl: e.target.value})}
                          placeholder="Enter image URL or leave default"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4 mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setNewCategory(initialCategoryState);
                            setIsAddingCategory(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddCategory}>
                          Save Category
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {editingCategory && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Edit Category: {editingCategory.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Category Name</label>
                        <Input 
                          value={editingCategory.name} 
                          onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          value={editingCategory.description} 
                          onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <Input 
                          value={editingCategory.imageUrl} 
                          onChange={(e) => setEditingCategory({...editingCategory, imageUrl: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4 mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingCategory(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateCategory}>
                          Update Category
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={category.imageUrl} 
                        alt={category.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingCategory(category)}
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash size={16} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {categories.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No categories found. Add a new category to get started.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="floors">
              <div className="flex justify-end mb-6">
                <Button onClick={() => setIsAddingFloor(true)} className="bg-primary">
                  <Plus size={16} className="mr-2" />
                  Add New Floor
                </Button>
              </div>
              
              {isAddingFloor && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Add New Floor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Floor Name</label>
                        <Input 
                          value={newFloor.name} 
                          onChange={(e) => setNewFloor({...newFloor, name: e.target.value})}
                          placeholder="Enter floor name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          value={newFloor.description} 
                          onChange={(e) => setNewFloor({...newFloor, description: e.target.value})}
                          placeholder="Enter floor description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Floor Level</label>
                        <Input 
                          type="number"
                          value={newFloor.level} 
                          onChange={(e) => setNewFloor({...newFloor, level: parseInt(e.target.value)})}
                          placeholder="Enter floor level (1, 2, 3, etc.)"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4 mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setNewFloor(initialFloorState);
                            setIsAddingFloor(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddFloor}>
                          Save Floor
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {editingFloor && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Edit Floor: {editingFloor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Floor Name</label>
                        <Input 
                          value={editingFloor.name} 
                          onChange={(e) => setEditingFloor({...editingFloor, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          value={editingFloor.description} 
                          onChange={(e) => setEditingFloor({...editingFloor, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Floor Level</label>
                        <Input 
                          type="number"
                          value={editingFloor.level} 
                          onChange={(e) => setEditingFloor({...editingFloor, level: parseInt(e.target.value)})}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4 mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingFloor(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateFloor}>
                          Update Floor
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="space-y-4">
                {floors.sort((a, b) => a.level - b.level).map((floor) => (
                  <Card key={floor.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center">
                            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                              {floor.level}
                            </span>
                            {floor.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-2">{floor.description}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingFloor(floor)}
                          >
                            <Edit size={16} className="mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteFloor(floor.id)}
                          >
                            <Trash size={16} className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {floors.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No floors found. Add a new floor to get started.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
