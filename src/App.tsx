
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ShopDetails from "./pages/admin/ShopDetails";
import OfferDetails from "./pages/admin/OfferDetails";
import CategoryManagement from "./pages/admin/CategoryManagement";
import Catalog from "./pages/user/Catalog";
import ShopList from "./pages/user/ShopList";
import OfferProducts from "./pages/user/OfferProducts";
import ProductComparison from "./pages/user/ProductComparison";
import ShopOffers from "./pages/user/ShopOffers";
import FloorDetails from "./pages/user/FloorDetails";
import ShopView from "./pages/user/ShopView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/shops" element={<ShopDetails />} />
          <Route path="/admin/offers" element={<OfferDetails />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          
          {/* User Routes */}
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/shops" element={<ShopList />} />
          <Route path="/offers" element={<OfferProducts />} />
          <Route path="/compare" element={<ProductComparison />} />
          <Route path="/shop-offers/:shopId" element={<ShopOffers />} />
          <Route path="/floors/:floorId" element={<FloorDetails />} />
          <Route path="/shop/:shopId" element={<ShopView />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
