import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeCheck, LocateIcon, SearchIcon, LogInIcon, MapPin } from "lucide-react";

const userProfessions = ["Educator", "Healthcare", "First Responder", "Military", "Government"];

// Sample data for mapped deals
const mapDeals = [
  {
    id: 1,
    lat: 37.7749,
    lng: -122.4194,
    title: "BOGO Coffee at Java Joe’s",
    description: "For educators & healthcare workers"
  },
  {
    id: 2,
    lat: 37.7849,
    lng: -122.4094,
    title: "20% Off Athletic Wear",
    description: "For all essential workers"
  }
];

export default function GratifyrApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [location, setLocation] = useState(null);
  const [mapError, setMapError] = useState(null);

  const handleLogin = () => setLoggedIn(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setMapError("Location access denied.");
        }
      );
    } else {
      setMapError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Gratifyr</h1>
        <p className="text-lg text-pink-700">
          Exclusive Discounts for Essential Workers
        </p>
        {!loggedIn && (
          <Button onClick={handleLogin} className="mt-4 bg-pink-600 hover:bg-pink-700 text-white">
            <LogInIcon className="mr-2 h-4 w-4" /> Log In as Essential Worker
          </Button>
        )}
      </header>

      <div className="max-w-3xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 flex items-center space-x-2">
          <Input
            placeholder="Search discounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border-pink-300 focus:border-pink-500"
          />
          <Button variant="outline" className="border-pink-500 text-pink-600"><SearchIcon className="h-5 w-5" /></Button>
        </div>
        <select
          value={selectedProfession}
          onChange={(e) => setSelectedProfession(e.target.value)}
          className="border border-pink-300 rounded p-2 text-pink-700"
        >
          <option value="">Filter by Profession</option>
          {userProfessions.map((prof) => (
            <option key={prof} value={prof}>{prof}</option>
          ))}
        </select>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {mapDeals.map((deal) => (
          <Card key={deal.id} className="shadow-md border border-pink-200">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-pink-600">{deal.title}</h2>
              <p className="text-pink-800 mb-2">{deal.description}</p>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <BadgeCheck className="h-4 w-4" />
                <span>Verified Deal</span>
              </div>
              <Button className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white">Unlock Deal</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Map View of Local Deals</h2>
        <div className="bg-white rounded-xl shadow p-4 border border-pink-200">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="text-pink-600 h-5 w-5" />
            <span className="text-pink-700">Use your location to see nearby discounts</span>
          </div>
          <div className="h-96 rounded-lg overflow-hidden">
            {location ? (
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.lat},${location.lng}`}
                allowFullScreen
                title="Map"
              ></iframe>
            ) : (
              <div className="h-full flex items-center justify-center text-pink-600">
                <p>{mapError || "Fetching location..."}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-pink-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Gratifyr. All rights reserved.</p>
      </footer>
    </div>
  );
}
