
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const MovieDetails = () => {
  const { theatreId, movieId } = useParams();
  const navigate = useNavigate();

  // Sample movies - in a real app, these would come from Supabase
  const movies = [
    {
      id: '1',
      title: 'Interstellar',
      poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    },
    {
      id: '2',
      title: 'Dune',
      poster: 'https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
      description: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.'
    },
    {
      id: '3',
      title: 'The Batman',
      poster: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg',
      description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.'
    }
  ];

  // Sample showtimes - in a real app, these would come from Supabase
  const showtimes = [
    { id: '1', screen: 'Screen 1', time: '10:00 AM', date: '2025-05-09' },
    { id: '2', screen: 'Screen 1', time: '01:30 PM', date: '2025-05-09' },
    { id: '3', screen: 'Screen 2', time: '04:45 PM', date: '2025-05-09' },
    { id: '4', screen: 'Screen 2', time: '08:00 PM', date: '2025-05-09' },
  ];

  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
        <div className="container mx-auto max-w-md text-center text-white">
          <h2 className="text-2xl">Movie not found</h2>
          <Button 
            onClick={() => navigate(`/theatre/${theatreId}`)}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Back to Theatre
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <div className="container mx-auto max-w-md">
        <Button 
          variant="ghost" 
          className="text-purple-300 mb-4" 
          onClick={() => navigate(`/theatre/${theatreId}`)}
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </Button>
        
        <div className="flex mb-6 bg-black/70 rounded-lg overflow-hidden border border-purple-500">
          <div className="w-1/3">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="h-full object-cover"
            />
          </div>
          <div className="w-2/3 p-4">
            <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
            <p className="text-purple-300 text-sm mt-2">{movie.description}</p>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-4">Select Showtime</h2>
        
        <div className="mb-6">
          <Card className="bg-black/70 border-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <Calendar size={18} className="text-purple-400 mr-2" />
                <span className="text-white">{formatDate(showtimes[0].date)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {showtimes.map(show => (
                  <Button
                    key={show.id}
                    variant="outline"
                    className="border-purple-500 hover:bg-purple-800/30"
                    onClick={() => navigate(`/seats/${show.id}`)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-purple-300 text-sm">{show.screen}</span>
                      <div className="flex items-center text-white">
                        <Clock size={14} className="mr-1" />
                        {show.time}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
