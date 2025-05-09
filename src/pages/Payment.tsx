
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, QrCode } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payment = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentTab, setPaymentTab] = useState('card');
  const [bookingInfo, setBookingInfo] = useState(null);

  // In a real app, this would come from previous pages via state management or from an API
  useEffect(() => {
    // Simulate fetching booking details
    const fetchBookingInfo = async () => {
      // Mocked data
      setBookingInfo({
        movieTitle: 'Interstellar',
        theatre: 'Light House Cinemas',
        showtime: '10:00 AM',
        date: 'May 9, 2025',
        screen: 'Screen 1',
        seats: ['A1', 'A2'],
        seatPrices: [150, 150],
        totalAmount: 300
      });
    };
    
    fetchBookingInfo();
  }, [showId]);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // In a real app, we would initialize Razorpay here
      // This is just a simulation for now
      
      // Simulating payment process
      toast({
        title: "Processing payment",
        description: "Please wait..."
      });
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      // Generate a random booking ID
      const bookingId = 'BK' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      
      toast({
        title: "Payment successful",
        description: "Your tickets have been booked!"
      });
      
      // Navigate to tickets page
      navigate(`/ticket/${bookingId}`);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: error.message || "An error occurred during payment",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!bookingInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading booking information...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <div className="container mx-auto max-w-md">
        <Button 
          variant="ghost" 
          className="text-purple-300 mb-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </Button>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Payment</h1>
          <p className="text-purple-300">Complete your booking</p>
        </div>
        
        <Card className="bg-black/70 border-purple-500 mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-white mb-3">Booking Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-purple-300">Movie:</span>
                <span className="text-white font-medium">{bookingInfo.movieTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Theatre:</span>
                <span className="text-white">{bookingInfo.theatre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Show:</span>
                <span className="text-white">{bookingInfo.date}, {bookingInfo.showtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Screen:</span>
                <span className="text-white">{bookingInfo.screen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Seats:</span>
                <span className="text-white">{bookingInfo.seats.join(', ')}</span>
              </div>
              <div className="border-t border-purple-500/30 my-2 pt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-purple-300">Total Amount:</span>
                  <span className="text-white">₹{bookingInfo.totalAmount}</span>
                </div>
                <div className="text-green-400 text-sm mt-1">No convenience fee!</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/70 border-purple-500">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-white mb-3">Payment Method</h3>
            
            <Tabs value={paymentTab} onValueChange={setPaymentTab}>
              <TabsList className="grid grid-cols-2 bg-gray-900">
                <TabsTrigger value="card" className="data-[state=active]:bg-purple-600">
                  <CreditCard size={16} className="mr-2" /> Card
                </TabsTrigger>
                <TabsTrigger value="upi" className="data-[state=active]:bg-purple-600">
                  <QrCode size={16} className="mr-2" /> UPI
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="mt-4">
                <div className="space-y-4">
                  {/* In a real app, we'd integrate Razorpay Elements or a similar solution here */}
                  <div className="p-4 border border-purple-500/30 rounded-md text-center">
                    <p className="text-white">Razorpay Test Payment Gateway</p>
                    <p className="text-xs text-purple-300 mt-1">KEY ID: rzp_test_1v4w1diaSwnTNf</p>
                  </div>
                  <p className="text-purple-300 text-sm">
                    This is a test payment gateway. No actual charges will be made.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="upi" className="mt-4">
                <div className="space-y-4 flex flex-col items-center">
                  <div className="p-4 bg-white rounded-md">
                    {/* This would be a real QR code in production */}
                    <div className="w-32 h-32 bg-gray-900 flex items-center justify-center">
                      <QrCode size={64} className="text-white" />
                    </div>
                  </div>
                  <p className="text-purple-300 text-sm text-center">
                    Scan this QR code using any UPI app to pay
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="p-4 border-t border-purple-500/30">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loading}
              onClick={handlePayment}
            >
              {loading ? 'Processing...' : `Pay ₹${bookingInfo.totalAmount}`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
