
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import Index from "./pages/Index";
import Search from "./pages/Search";
import MedicineDetail from "./pages/MedicineDetail";
import PharmacyDetail from "./pages/PharmacyDetail";
import Pharmacies from "./pages/Pharmacies";
import Premium from "./pages/Premium";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/medicine/:id" element={<MedicineDetail />} />
            <Route path="/pharmacy/:id" element={<PharmacyDetail />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/services" element={<Services />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
