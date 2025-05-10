
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Define the window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    
    fetchBookingInfo();
  }, [showId]);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK failed to load');
      }

      // In a production app, you would get an order ID from your backend
      const orderId = 'order_' + Math.floor(Math.random() * 1000000).toString();
      
      // Create a new Razorpay instance
      const options = {
        key: 'rzp_test_1v4w1diaSwnTNf', // Replace with your actual Razorpay key
        amount: bookingInfo.totalAmount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Fair-Cut Cinemas',
        description: `Booking for ${bookingInfo.movieTitle}`,
        image: 'https://i.imgur.com/xELPaag.png', // Your logo
        order_id: orderId,
        handler: function(response) {
          // This function runs when payment is successful
          const paymentId = response.razorpay_payment_id;
          const bookingId = 'BK' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
          
          toast({
            title: "Payment successful",
            description: `Payment ID: ${paymentId}`
          });
          
          // Navigate to tickets page
          navigate(`/ticket/${bookingId}`);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#9333ea' // Purple color to match our theme
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
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
          <CardFooter className="p-4 border-t border-purple-500/30">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
              disabled={loading}
              onClick={handlePayment}
            >
              {loading ? 'Processing...' : `Pay ₹${bookingInfo.totalAmount} with Razorpay`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
