
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LocationPage from "./pages/LocationPage";
import TheatrePage from "./pages/TheatrePage";
import TheatreDetails from "./pages/TheatreDetails";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/theatres" element={<TheatrePage />} />
          <Route path="/theatre/:id" element={<TheatreDetails />} />
          <Route path="/movie/:theatreId/:movieId" element={<MovieDetails />} />
          <Route path="/seats/:showId" element={<SeatSelection />} />
          <Route path="/payment/:showId" element={<Payment />} />
          <Route path="/ticket/:bookingId" element={<Ticket />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
