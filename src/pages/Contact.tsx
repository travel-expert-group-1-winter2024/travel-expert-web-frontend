import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Search } from "lucide-react";
import axios from "axios";

type Agency = {
  id: number;
  agencyAddress: string;
  agencyCity: string;
  agencyProvince: string;
  agencyPostal: string;
  agencyCountry: string;
  agencyPhone: string;
  agencyFax: string;
};

declare global {
  interface Window {
    initMap: () => void;
  }
}

const Contact = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/agencies");
        console.log("Fetched Agencies:", response.data);

        if (Array.isArray(response.data)) {
          setAgencies(response.data);
        } else {
          console.warn("Response is not an array:", response.data);
          setAgencies([]);
        }
      } catch (error) {
        console.error("Failed to fetch agencies:", error);
        setAgencies([]);
      }
    };

    fetchAgencies();
  }, []);

  const filteredAgencies = Array.isArray(agencies)
    ? agencies.filter((agency) => {
      const combined = `${agency.agencyAddress} ${agency.agencyCity} ${agency.agencyProvince} ${agency.agencyPostal} ${agency.agencyCountry}`;
      return combined.toLowerCase().includes(searchTerm.toLowerCase());
    })
    : [];

  useEffect(() => {
    if (!Array.isArray(agencies) || agencies.length === 0) return;

    const loadMapScript = () => {
      if (document.getElementById("google-maps-script")) {
        window.initMap = initMap;
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        zoom: 4,
        center: { lat: 53.7267, lng: -127.6476 },
      });

      const geocoder = new google.maps.Geocoder();

      agencies.forEach((agency) => {
        const fullAddress = `${agency.agencyAddress}, ${agency.agencyCity}, ${agency.agencyProvince}, ${agency.agencyPostal}`;
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              title: `${agency.agencyCity} Office`,
            });
          } else {
            console.error(`Geocode failed for: ${fullAddress}`, status);
          }
        });
      });
    };

    loadMapScript();
  }, [agencies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-semibold text-black">
          Find a Travel Experts Office
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our nationwide offices and connect with the nearest Travel Experts agency.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12 relative">
        <input
          type="text"
          placeholder="Search by city, province, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-blue-300 bg-white shadow-md rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <Search className="absolute left-4 top-3.5 text-blue-400 w-5 h-5" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredAgencies.length > 0 ? (
          filteredAgencies.map((agency) => (
            <div
              key={agency.id}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 relative"
            >
              <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 px-3 py-1 rounded-bl-lg text-xs font-semibold">
                {agency.agencyCity}
              </div>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span className="ml-2">{`${agency.agencyAddress}, ${agency.agencyCity}, ${agency.agencyProvince}, ${agency.agencyPostal}`}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span className="ml-2">Phone: {agency.agencyPhone}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span className="ml-2">Fax: {agency.agencyFax}</span>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span className="ml-2">contact@travelexperts.com</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No agencies match your search.
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
          <div
            ref={mapRef}
            style={{ width: "100%", height: "500px" }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
