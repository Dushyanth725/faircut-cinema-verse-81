
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { MapPin } from "lucide-react";

const TheatrePage = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <div className="container mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Theatres under Fair-Cut</h1>
          <p className="text-purple-200">Enjoy movies without convenience fee</p>
        </div>

        <div className="grid gap-4">
          {theatres.map(theatre => (
            <Card 
              key={theatre.id}
              className="bg-black/70 border-purple-500 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => navigate(`/theatre/${theatre.id}`)}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={theatre.image} 
                  alt={theatre.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{theatre.name}</h3>
                    <div className="flex items-center text-purple-300 text-sm mt-1">
                      <MapPin size={14} className="mr-1" />
                      {theatre.location}
                    </div>
                  </div>
                  {theatre.hasPaymentGateway && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      Online Payment
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheatrePage;
