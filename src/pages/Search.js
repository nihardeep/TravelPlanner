import React from 'react';
import Header from '../components/Header';
import SearchHeader from '../components/search/SearchHeader';
import PromotionalBanner from '../components/search/PromotionalBanner';
import FilterSidebar from '../components/search/FilterSidebar';
import SortOptions from '../components/search/SortOptions';
import HotelGrid from '../components/search/HotelGrid';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import { MapPin, Map, Car } from 'lucide-react';

const INITIAL_SEARCH = {
  location: 'Kuala Lumpur',
  checkIn: '27 Nov 2025',
  checkOut: '29 Nov 2025',
  guests: '2-adults',
};

const INITIAL_FILTERS = {
  payAtHotel: true,
  rating7: true,
  location9: false,
  washingMachine: false,
  apartment: false,
  serviced: false,
  hotel: false,
  villa: false,
};

const HOTEL_DATA = [
  {
    id: 'hotel-1',
    name: 'Deface Platinum 2 Kuala Lumpur',
    images: [
      'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    newBadge: 'Newly built in 2023',
    location: 'Kuala Lumpur City Centre, Kuala Lumpur - City',
    booked: 'Booked 25 times today',
    tags: ['Promoted', 'Boosted', 'Agoda Preferred'],
    discountBadge: '-68%',
    discountAmount: '6,373',
    rating: { score: '8.5', label: 'Excellent', reviews: '1,142' },
    originalPrice: 'Rs. 17,336',
    discountPercent: '-68%',
    finalPrice: 'Rs. 4,847',
  },
  {
    id: 'hotel-2',
    name: 'Tribal Luxe Suites Bukit Bintang',
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    newBadge: 'Renovated in 2024',
    location: 'Bukit Bintang, Kuala Lumpur',
    booked: 'Booked 18 times today',
    tags: ['Agoda Preferred', 'Hot Deal'],
    discountBadge: '-52%',
    discountAmount: '4,210',
    rating: { score: '9.1', label: 'Exceptional', reviews: '2,743' },
    originalPrice: 'Rs. 21,090',
    discountPercent: '-52%',
    finalPrice: 'Rs. 10,112',
  },
  {
    id: 'hotel-3',
    name: 'Azure Heights KLCC Residences',
    images: [
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    newBadge: 'Newly built in 2022',
    location: 'KLCC, Kuala Lumpur',
    booked: 'Popular choice',
    tags: ['Boosted', 'Family Favorite'],
    discountBadge: '-35%',
    discountAmount: '3,320',
    rating: { score: '8.9', label: 'Wonderful', reviews: '987' },
    originalPrice: 'Rs. 12,500',
    discountPercent: '-35%',
    finalPrice: 'Rs. 8,125',
  },
];

const CAR_DATA = [
  {
    id: 'car-1',
    name: 'Urban Glide Sedan',
    type: 'Sedan · Automatic · 5 seats',
    price: 'Rs. 3,499 / day',
    image:
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'car-2',
    name: 'EcoRide Hatchback',
    type: 'Hatchback · Automatic · 4 seats',
    price: 'Rs. 2,199 / day',
    image:
      'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'car-3',
    name: 'Summit Explorer SUV',
    type: 'SUV · Automatic · 7 seats',
    price: 'Rs. 4,950 / day',
    image:
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Search() {
  const [searchParams, setSearchParams] = React.useState(INITIAL_SEARCH);
  const [priceRange, setPriceRange] = React.useState([0, 2039410]);
  const [filters, setFilters] = React.useState(INITIAL_FILTERS);
  const [sortOption, setSortOption] = React.useState('best');
  const [favorites, setFavorites] = React.useState({});
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpdateSearch = (updates) => {
    setSearchParams((prev) => ({ ...prev, ...updates }));
  };

  const handleToggleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleFavorite = (hotelId) => {
    setFavorites((prev) => ({
      ...prev,
      [hotelId]: !prev[hotelId],
    }));
  };

  const fetchSearchResults = async (sessionId) => {
    setIsLoading(true);
    try {
      const payload = {
        type: "get_search_results",
      };

      // Only include sessionId if it exists
      if (sessionId) {
        payload.sessionId = sessionId;
      }

      const response = await fetch("https://ndsharma.app.n8n.cloud/webhook/travel-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Search results from n8n:", data);

        if (data.action === "search_results" && data.packages) {
          setSearchResults(data);
        }
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for stored search results from chat
  React.useEffect(() => {
    // Check if we have stored search results from chat
    const storedResults = sessionStorage.getItem('searchResults');
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setSearchResults(parsedResults);
        sessionStorage.removeItem('searchResults'); // Clear after use
        return;
      } catch (error) {
        console.error('Error parsing stored search results:', error);
      }
    }

    // Always try to fetch search results regardless of session ID
    fetchSearchResults(null);
  }, []);

  const transformN8nData = (data) => {
    return data.packages.map((pkg, index) => ({
      id: `n8n-${index}`,
      name: pkg.hotel.name,
      images: pkg.hotel.image
        ? [pkg.hotel.image]
        : ['https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      newBadge: null,
      location: `${data.destination}`,
      booked: 'Popular choice',
      tags: pkg.activity ? ['Package Deal', 'Hotel + Activity'] : ['Hotel Only'],
      discountBadge: null,
      discountAmount: null,
      rating: { score: '8.0', label: 'Very Good', reviews: '100+' },
      originalPrice: null,
      discountPercent: null,
      finalPrice: `Rs. ${pkg.package_total_price.toLocaleString('en-IN')}`,
      description: pkg.hotel.description,
      hasActivity: !!pkg.activity,
      hotelPrice: pkg.hotel.price,
      packagePrice: pkg.package_total_price,
    }));
  };

  const filteredHotels = searchResults ? transformN8nData(searchResults) : HOTEL_DATA;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a24] via-[#1a1530] to-[#2d1b69] text-white">
      <Header />
      <SearchHeader
        searchParams={searchParams}
        onUpdate={handleUpdateSearch}
        onSearch={() => null}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <PromotionalBanner />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="lg:hidden space-y-4">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
              >
                {isFilterDrawerOpen ? 'Hide filters' : 'Show filters'}
              </Button>
              {isFilterDrawerOpen && (
                <FilterSidebar
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  filters={filters}
                  onToggleFilter={handleToggleFilter}
                  className="sticky top-24"
                />
              )}
            </div>

            <div className="hidden lg:block">
              <FilterSidebar
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                filters={filters}
                onToggleFilter={handleToggleFilter}
              />
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-white/70">Showing 9,778 choices</p>
                  <h2 className="text-2xl font-semibold">
                    Kuala Lumpur · 27 Nov - 29 Nov · 2 adults
                  </h2>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Modify search
                </Button>
              </div>
              <SortOptions value={sortOption} onChange={setSortOption} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-white/70 uppercase tracking-[0.4em]">
                    Explore visually
                  </p>
                  <h3 className="text-xl font-semibold">Search on Map</h3>
                </div>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  View interactive map
                </Button>
              </div>
              <div className="h-56 rounded-2xl bg-gradient-to-r from-[#3b82f6]/20 to-[#e879f9]/20 border border-white/10 flex items-center justify-center text-white/70">
                <div className="text-center space-y-2">
                  <MapPin className="w-8 h-8 mx-auto text-[#e879f9]" />
                  <p className="font-semibold">Pinch and zoom to explore KL</p>
                  <p className="text-sm text-white/60">
                    Coming soon: full interactive map experience.
                  </p>
                </div>
              </div>
              <Input
                placeholder="Search within map area (e.g. Bukit Bintang, KLCC)"
                className="bg-white text-gray-900 border border-white/30 placeholder:text-gray-500"
              />
            </div>

            <HotelGrid
              hotels={filteredHotels}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />

            <section className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-white/60">
                    On-the-go
                  </p>
                  <h3 className="text-2xl font-semibold">Popular cars in KL</h3>
                  <p className="text-white/70 text-sm">
                    Mock rates in INR — swap with live inventory later.
                  </p>
                </div>
                <Button variant="secondary" className="w-full sm:w-auto">
                  View all cars
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {CAR_DATA.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row"
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="h-40 w-full object-cover lg:w-44"
                    />
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">{car.name}</h4>
                        <Car className="w-5 h-5 text-[#e879f9]" />
                      </div>
                      <p className="text-sm text-white/70">{car.type}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/60">
                            From
                          </p>
                          <p className="text-xl font-bold text-white">
                            {car.price}
                          </p>
                        </div>
                        <Button variant="accent" className="text-sm">
                          Reserve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-[#ff8b5f]/20 border border-[#ff8b5f]/30 rounded-3xl p-6">
                <p className="text-sm uppercase tracking-[0.4em] text-[#ffedd5]">
                  Agoda insights
                </p>
                <h3 className="text-2xl font-semibold mt-3">
                  Save more when you bundle flights + stays
                </h3>
                <Button variant="accent" className="mt-4">
                  Explore bundles
                </Button>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                  TravelMate perks
                </p>
                <h3 className="text-2xl font-semibold mt-3">
                  Get AI powered trip plans in seconds
                </h3>
                <p className="text-white/70 mt-2">
                  Launch the chatbot anytime for personalized recommendations.
                </p>
                <Button variant="secondary" className="mt-4">
                  Plan with AI
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

