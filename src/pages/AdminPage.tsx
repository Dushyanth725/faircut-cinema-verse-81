
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Film, Clock, ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('movies');
  
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterUrl: ''
  });
  
  const [showtime, setShowtime] = useState({
    movieId: '',
    screen: '1',
    date: null,
    time: ''
  });
  
  // Initialize with empty array, no default movies
  const [movies, setMovies] = useState([]);
  
  const [showtimes, setShowtimes] = useState([]);
  
  // Time options for the dropdown
  const timeOptions = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', 
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', 
    '09:00 PM', '10:00 PM', '11:00 PM'
  ];

  const handleAddMovie = () => {
    if (!newMovie.title || !newMovie.posterUrl) {
      toast({
        title: "Error",
        description: "Movie title and poster URL are required",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (movies.length + 1).toString();
    const movieToAdd = {
      id: newId,
      title: newMovie.title,
      posterUrl: newMovie.posterUrl,
      description: newMovie.description
    };
    
    setMovies([...movies, movieToAdd]);
    setNewMovie({ title: '', description: '', posterUrl: '' });
    
    toast({
      title: "Movie Added",
      description: `"${newMovie.title}" has been added to the list`
    });
  };

  const handleAddShowtime = () => {
    if (!showtime.movieId || !showtime.time || !showtime.date) {
      toast({
        title: "Error",
        description: "Please select a movie, date, and time",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (showtimes.length + 1).toString();
    const formattedDate = format(showtime.date, "yyyy-MM-dd");
    
    const showtimeToAdd = {
      id: newId,
      movieId: showtime.movieId,
      screen: `Screen ${showtime.screen}`,
      time: showtime.time,
      date: formattedDate
    };
    
    setShowtimes([...showtimes, showtimeToAdd]);
    setShowtime({ movieId: '', screen: '1', time: '', date: null });
    
    toast({
      title: "Showtime Added",
      description: `New showtime has been added successfully`
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Admin session ended"
    });
    navigate('/');
  };

  const getMovieTitle = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    return movie ? movie.title : 'Unknown Movie';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="text-purple-300 mr-2" 
              onClick={handleLogout}
            >
              <ArrowLeft size={18} className="mr-1" /> Logout
            </Button>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="text-purple-300">
            Fair-Cut Theatre Management
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="movies" className="data-[state=active]:bg-purple-600">
              <Film size={16} className="mr-2" /> Movies
            </TabsTrigger>
            <TabsTrigger value="showtimes" className="data-[state=active]:bg-purple-600">
              <Clock size={16} className="mr-2" /> Showtimes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="movies">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add Movie Form */}
              <Card className="bg-black/70 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-300">Add New Movie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-purple-300 mb-1 block">Movie Title</label>
                    <Input 
                      value={newMovie.title}
                      onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                      placeholder="Enter movie title"
                      className="bg-gray-900 border-purple-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-purple-300 mb-1 block">Poster URL</label>
                    <Input 
                      value={newMovie.posterUrl}
                      onChange={(e) => setNewMovie({...newMovie, posterUrl: e.target.value})}
                      placeholder="Enter poster image URL"
                      className="bg-gray-900 border-purple-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-purple-300 mb-1 block">Description (Optional)</label>
                    <Input 
                      value={newMovie.description}
                      onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                      placeholder="Enter movie description"
                      className="bg-gray-900 border-purple-500 text-white"
                    />
                  </div>
                  <Button 
                    onClick={handleAddMovie}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Add Movie
                  </Button>
                </CardContent>
              </Card>
              
              {/* Movie List */}
              <Card className="bg-black/70 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-300">Current Movies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {movies.map(movie => (
                      <div 
                        key={movie.id} 
                        className="flex items-center p-2 border border-purple-500/30 rounded-md"
                      >
                        <div className="w-10 h-14 mr-3 overflow-hidden">
                          <img 
                            src={movie.posterUrl} 
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{movie.title}</h3>
                          <p className="text-purple-300 text-xs truncate">
                            {movie.description || 'No description available'}
                          </p>
                        </div>
                        <div className="text-xs text-purple-400">
                          ID: {movie.id}
                        </div>
                      </div>
                    ))}
                    {movies.length === 0 && (
                      <div className="text-center text-purple-400 py-4">
                        No movies added yet. Please add some movies!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="showtimes">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add Showtime Form */}
              <Card className="bg-black/70 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-300">Add New Showtime</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-purple-300 mb-1 block">Select Movie</label>
                    <select
                      value={showtime.movieId}
                      onChange={(e) => setShowtime({...showtime, movieId: e.target.value})}
                      className="w-full bg-gray-900 border border-purple-500 text-white rounded-md p-2"
                    >
                      <option value="">Select a movie</option>
                      {movies.map(movie => (
                        <option key={movie.id} value={movie.id}>
                          {movie.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-purple-300 mb-1 block">Screen</label>
                    <select
                      value={showtime.screen}
                      onChange={(e) => setShowtime({...showtime, screen: e.target.value})}
                      className="w-full bg-gray-900 border border-purple-500 text-white rounded-md p-2"
                    >
                      <option value="1">Screen 1</option>
                      <option value="2">Screen 2</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-purple-300 mb-1 block">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-900 border-purple-500",
                            !showtime.date && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {showtime.date ? format(showtime.date, "PPP") : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800">
                        <CalendarComponent
                          mode="single"
                          selected={showtime.date}
                          onSelect={(date) => setShowtime({...showtime, date})}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="text-sm text-purple-300 mb-1 block">Time</label>
                    <select
                      value={showtime.time}
                      onChange={(e) => setShowtime({...showtime, time: e.target.value})}
                      className="w-full bg-gray-900 border border-purple-500 text-white rounded-md p-2"
                    >
                      <option value="">Select a time</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={handleAddShowtime}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Add Showtime
                  </Button>
                </CardContent>
              </Card>
              
              {/* Showtime List */}
              <Card className="bg-black/70 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-300">Current Showtimes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {showtimes.map(showtime => (
                      <div 
                        key={showtime.id} 
                        className="p-3 border border-purple-500/30 rounded-md"
                      >
                        <div className="flex justify-between">
                          <h3 className="text-white font-medium">
                            {getMovieTitle(showtime.movieId)}
                          </h3>
                          <span className="text-purple-300 text-sm">
                            {showtime.screen}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-purple-300 text-sm">
                            {showtime.date}
                          </div>
                          <div className="text-white text-sm font-medium">
                            {showtime.time}
                          </div>
                        </div>
                      </div>
                    ))}
                    {showtimes.length === 0 && (
                      <div className="text-center text-purple-400 py-4">
                        No showtimes added yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
