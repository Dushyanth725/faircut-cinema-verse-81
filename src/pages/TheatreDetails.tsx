
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from '@/services/authService';

const TheatreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [theatre, setTheatre] = useState(null);
  const [loading, setLoading] = useState(true);

  // This would come from an API/database in a real app
  const theatres = [
    {
      id: '1',
      name: 'Light House Cinemas',
      image: 'https://whatsupmonterey.com/subscribers/3/uploaded_files/member/profile/f5e208581db49cec4d3e7acb4b86e995.jpg',
      location: 'Chennai',
      hasPaymentGateway: true
    },
    {
      id: '2',
      name: 'KG Cinemas',
      image: 'https://pbs.twimg.com/media/GCvt7mcbgAAjD4S.jpg',
      location: 'Chennai',
      hasPaymentGateway: false
    },
    {
      id: '3',
      name: 'APA Cinemas',
      image: 'https://www.mappls.com/place/ZY9V6T_1661773879954_0.png',
      location: 'Chennai',
      hasPaymentGateway: false
    },
    {
      id: '4',
      name: 'Ratnam Talkies',
      image: 'https://ecoimbatore.com/wp-content/uploads/2021/06/cinema.jpg',
      location: 'Chennai',
      hasPaymentGateway: false
    }
  ];

  // Sample movies - in a real app, these would come from Supabase
  const sampleMovies = [
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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from Supabase
        // const { data, error } = await supabase.from('movies').select('*');
        // if (error) throw error;
        // setMovies(data);

        // For now, use sample data
        setMovies(sampleMovies);
        
        // Find the current theatre
        const selectedTheatre = theatres.find(t => t.id === id);
        setTheatre(selectedTheatre);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!theatre) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
        <div className="container mx-auto max-w-md text-center text-white">
          <h2 className="text-2xl">Theatre not found</h2>
          <Button 
            onClick={() => navigate('/theatres')}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Back to Theatres
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <div className="container mx-auto max-w-md">
        <Button 
          variant="ghost" 
          className="text-purple-300 mb-4" 
          onClick={() => navigate('/theatres')}
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </Button>
        
        <div className="mb-6">
          <div className="h-48 overflow-hidden rounded-lg mb-4">
            <img 
              src={theatre.image} 
              alt={theatre.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">{theatre.name}</h1>
          <p className="text-purple-300">{theatre.location}</p>
          {theatre.hasPaymentGateway ? (
            <div className="mt-2 text-sm">
              <span className="bg-purple-600 text-white px-2 py-1 rounded-full">
                Online Payment Available
              </span>
            </div>
          ) : (
            <div className="mt-2 text-sm">
              <span className="bg-gray-600 text-white px-2 py-1 rounded-full">
                Showcase Only
              </span>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">Now Showing</h2>
        
        <div className="grid gap-4">
          {movies.map(movie => (
            <Card 
              key={movie.id}
              className="bg-black/70 border-purple-500 overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={() => navigate(`/movie/${theatre.id}/${movie.id}`)}
            >
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="h-full object-cover"
                  />
                </div>
                <CardContent className="w-2/3 p-4">
                  <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                  <p className="text-purple-300 text-sm line-clamp-2 mt-1">
                    {movie.description}
                  </p>
                  <Button 
                    className="mt-3 bg-purple-600 hover:bg-purple-700 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/movie/${theatre.id}/${movie.id}`);
                    }}
                  >
                    Book Tickets
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheatreDetails;
