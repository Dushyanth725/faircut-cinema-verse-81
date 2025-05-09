
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Mail, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Ticket = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    // Simulate fetching ticket information
    const fetchTicketInfo = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch this from an API
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTicketInfo({
          id: bookingId,
          movieTitle: 'Interstellar',
          theatre: 'Light House Cinemas',
          showtime: '10:00 AM',
          date: 'May 9, 2025',
          screen: 'Screen 1',
          seats: ['A1', 'A2'],
          qrCode: 'QR code data would be here', // This would be a real QR code in production
          totalAmount: 300,
          moviePoster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
        });
        
        // Simulate sending email notification
        toast({
          title: "Ticket sent",
          description: "Your ticket has been sent to your email"
        });
      } catch (error) {
        console.error('Error fetching ticket:', error);
        toast({
          title: "Failed to load ticket",
          description: error.message || "An unknown error occurred",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTicketInfo();
  }, [bookingId]);

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF or image
    toast({
      title: "Download started",
      description: "Your ticket is being downloaded"
    });
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share ticket",
      description: "Share functionality will be available soon"
    });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading your ticket...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <div className="container mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Your Ticket</h1>
          <p className="text-purple-300">Booking confirmed!</p>
        </div>
        
        <Card className="bg-black/70 border-purple-500 overflow-hidden mb-6">
          {/* Movie poster banner */}
          <div className="h-40 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <img 
              src={ticketInfo.moviePoster} 
              alt={ticketInfo.movieTitle} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h2 className="text-2xl font-bold text-white">{ticketInfo.movieTitle}</h2>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-purple-300 text-xs">BOOKING ID</div>
              <div className="text-white font-mono">{ticketInfo.id}</div>
            </div>
            
            <div className="flex justify-between mb-2">
              <div className="text-purple-300">Theatre</div>
              <div className="text-white">{ticketInfo.theatre}</div>
            </div>
            
            <div className="flex justify-between mb-2">
              <div className="text-purple-300">Date & Time</div>
              <div className="text-white">{ticketInfo.date}, {ticketInfo.showtime}</div>
            </div>
            
            <div className="flex justify-between mb-2">
              <div className="text-purple-300">Screen</div>
              <div className="text-white">{ticketInfo.screen}</div>
            </div>
            
            <div className="flex justify-between mb-2">
              <div className="text-purple-300">Seats</div>
              <div className="text-white">{ticketInfo.seats.join(', ')}</div>
            </div>
            
            <div className="flex justify-between mb-2">
              <div className="text-purple-300">Amount Paid</div>
              <div className="text-white">₹{ticketInfo.totalAmount}</div>
            </div>
            
            <div className="mt-4 p-4 bg-white rounded-md flex justify-center">
              {/* This would be a real QR code in production */}
              <div className="w-40 h-40 bg-gray-900 flex items-center justify-center">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FairCut-Ticket-12345" alt="Ticket QR Code" className="w-full h-full" />
              </div>
            </div>
            
            <div className="text-center text-purple-300 mt-2 text-sm">
              Show this QR code at the theatre entrance
            </div>
            
            <div className="mt-6 flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 border-purple-500 text-purple-300"
                onClick={handleDownload}
              >
                <Download size={16} className="mr-1" /> Download
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-purple-500 text-purple-300"
                onClick={handleShare}
              >
                <Share2 size={16} className="mr-1" /> Share
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handleBackToHome}
              >
                Book Another Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ticket;
