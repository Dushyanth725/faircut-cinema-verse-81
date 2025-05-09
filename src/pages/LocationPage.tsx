
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LocationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(true);
  const navigate = useNavigate();

  const cities = [
    'Chennai', 'Mumbai', 'Delhi', 'Kolkata', 'Bangalore', 'Hyderabad', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Coimbatore', 'Madurai'
  ];

  const [filteredCities, setFilteredCities] = useState(cities);

  useEffect(() => {
    if (searchQuery) {
      setFilteredCities(cities.filter(city => 
        city.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredCities(cities);
    }
  }, [searchQuery]);

  const handleLocationAccess = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use a reverse geocoding service
          // For now, we'll just pretend we found Chennai
          setLocation('Chennai');
          setIsLoading(false);
          setShowLocationDialog(false);
          toast({
            title: "Location detected",
            description: "Your location has been detected as Chennai",
          });
        },
        () => {
          setIsLoading(false);
          toast({
            title: "Location access denied",
            description: "Please manually select your city",
            variant: "destructive",
          });
          setShowLocationDialog(false);
        }
      );
    } else {
      setIsLoading(false);
      toast({
        title: "Geolocation not supported",
        description: "Please manually select your city",
        variant: "destructive",
      });
      setShowLocationDialog(false);
    }
  };

  const selectCity = (city) => {
    setLocation(city);
    toast({
      title: "Location selected",
      description: `You've selected ${city}`,
    });
    navigate('/theatres');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="bg-gray-900 border-purple-500 text-white">
          <DialogHeader>
            <DialogTitle className="text-purple-300">Allow Location Access</DialogTitle>
          </DialogHeader>
          <p className="text-purple-200 mb-4">
            Fair-Cut needs access to your location to find nearby theatres. Allow access to continue.
          </p>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowLocationDialog(false)}
              className="border-purple-500 text-purple-300"
            >
              Skip
            </Button>
            <Button 
              onClick={handleLocationAccess}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Allow
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Select Your Location</h1>
          <p className="text-purple-200">Find theatres near you</p>
        </div>

        <Card className="bg-black/70 border-purple-500">
          <CardContent className="pt-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 text-purple-400" size={18} />
              <Input
                type="text"
                placeholder="Search for your city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-purple-500 text-white"
              />
            </div>
            
            <div className="grid gap-2">
              {location && (
                <div className="bg-purple-900/50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin size={18} className="text-purple-400 mr-2" />
                    <span className="text-white">{location}</span>
                  </div>
                  <Button 
                    onClick={() => navigate('/theatres')}
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Continue
                  </Button>
                </div>
              )}
              
              <h3 className="text-lg font-medium text-purple-300 mb-2 mt-2">Popular Cities</h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredCities.map(city => (
                  <Button
                    key={city}
                    variant="outline"
                    className="justify-start border-purple-500 text-purple-200 hover:bg-purple-800/30"
                    onClick={() => selectCity(city)}
                  >
                    <MapPin size={16} className="mr-2 text-purple-400" />
                    {city}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocationPage;
