
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [seatCount, setSeatCount] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate seat layout
  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 10;
    const seats = [];
    
    // Generate all seats
    rows.forEach((row, rowIndex) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        // First two rows are premium seats (cheaper)
        const isPremium = rowIndex < 2;
        seats.push({
          id: seatId,
          row,
          number: i,
          price: isPremium ? 70 : 150,
          isAvailable: Math.random() > 0.2, // Randomly make some seats unavailable
        });
      }
    });
    
    return seats;
  };

  const [seats, setSeats] = useState(generateSeats());

  const handleSelectSeat = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    
    if (!seat.isAvailable) {
      return;
    }
    
    if (selectedSeats.includes(seatId)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Check if we've reached the seat limit
      if (selectedSeats.length >= seatCount) {
        toast({
          title: "Maximum seats selected",
          description: `You can only select ${seatCount} seats`,
          variant: "destructive"
        });
        return;
      }
      
      // Select seat
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const incrementSeatCount = () => {
    if (seatCount < 10) {
      setSeatCount(seatCount + 1);
      // Clear selected seats when changing count
      setSelectedSeats([]);
    }
  };

  const decrementSeatCount = () => {
    if (seatCount > 1) {
      setSeatCount(seatCount - 1);
      // Clear selected seats when changing count
      setSelectedSeats([]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + seat.price;
    }, 0);
  };

  const handleContinue = () => {
    if (selectedSeats.length !== seatCount) {
      toast({
        title: "Seat selection incomplete",
        description: `Please select ${seatCount} seats to continue`,
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would save this to the database
    navigate(`/payment/${showId}`);
  };

  const groupSeatsByRow = () => {
    const grouped = {};
    seats.forEach(seat => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    return grouped;
  };

  const seatsByRow = groupSeatsByRow();

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
          <h1 className="text-2xl font-bold text-white">Select Seats</h1>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0 border-purple-500"
                onClick={decrementSeatCount}
              >
                <Minus size={16} />
              </Button>
              <span className="text-white font-medium">{seatCount} Seats</span>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0 border-purple-500"
                onClick={incrementSeatCount}
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="text-purple-300 text-sm">
              {selectedSeats.length} of {seatCount} selected
            </div>
          </div>
        </div>
        
        <Card className="bg-black/70 border-purple-500 mb-4">
          <div className="p-4 text-center border-b border-purple-500/30">
            <div className="w-4/5 h-2 bg-purple-600 mx-auto mb-1"></div>
            <p className="text-purple-300 text-sm">SCREEN</p>
          </div>
          <CardContent className="p-4 overflow-x-auto">
            <div className="min-w-[500px]">
              {Object.keys(seatsByRow).map(row => (
                <div key={row} className="flex mb-2">
                  <div className="mr-2 w-6 flex items-center justify-center text-purple-300">
                    {row}
                  </div>
                  <div className="flex flex-1 justify-center gap-1">
                    {seatsByRow[row].map(seat => (
                      <button
                        key={seat.id}
                        className={`
                          w-7 h-7 text-xs rounded-sm flex items-center justify-center
                          ${!seat.isAvailable ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 
                            selectedSeats.includes(seat.id) ? 'bg-green-500 text-white' : 
                            seat.price === 70 ? 'bg-purple-800 text-white hover:bg-purple-700' : 
                            'bg-purple-600 text-white hover:bg-purple-500'}
                        `}
                        onClick={() => handleSelectSeat(seat.id)}
                        disabled={!seat.isAvailable}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t border-purple-500/30">
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-600 mr-2"></div>
                <span className="text-purple-300 text-sm">Regular (₹150)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-800 mr-2"></div>
                <span className="text-purple-300 text-sm">Premium (₹70)</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span className="text-purple-300 text-sm">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 mr-2"></div>
                <span className="text-purple-300 text-sm">Unavailable</span>
              </div>
            </div>
          </div>
          <CardFooter className="flex flex-col p-4 border-t border-purple-500/30">
            <div className="w-full flex justify-between items-center mb-3">
              <div className="text-purple-300">
                Selected seats: <span className="text-white">{selectedSeats.join(', ') || 'None'}</span>
              </div>
              <div className="text-white font-bold">
                Total: ₹{calculateTotal()}
              </div>
            </div>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={selectedSeats.length !== seatCount || loading}
              onClick={handleContinue}
            >
              {loading ? 'Processing...' : 'Continue to Payment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SeatSelection;
