'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { artists, categories, locations, feeRanges } from '@/data/mockData';
import { Filter, Star, MapPin, DollarSign } from 'lucide-react';

export default function ArtistsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

    // Filter artists based on selected filters
    const filteredArtists = useMemo(() => {
        return artists.filter(artist => {
            const categoryMatch = selectedCategories.length === 0 ||
                artist.category.some(cat => selectedCategories.includes(cat));

            const locationMatch = selectedLocations.length === 0 ||
                selectedLocations.includes(artist.location);

            const priceMatch = selectedPriceRanges.length === 0 ||
                selectedPriceRanges.includes(artist.feeRange);

            return categoryMatch && locationMatch && priceMatch;
        });
    }, [selectedCategories, selectedLocations, selectedPriceRanges]);

    // Toggle filter selections
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleLocation = (location: string) => {
        setSelectedLocations(prev =>
            prev.includes(location)
                ? prev.filter(l => l !== location)
                : [...prev, location]
        );
    };

    const togglePriceRange = (priceRange: string) => {
        setSelectedPriceRanges(prev =>
            prev.includes(priceRange)
                ? prev.filter(p => p !== priceRange)
                : [...prev, priceRange]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedLocations([]);
        setSelectedPriceRanges([]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Browse Artists
                    </h1>
                    <p className="text-lg text-gray-700">
                        Discover talented performers for your next event
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-purple-600" />
                                    <CardTitle className="text-lg text-gray-900">Filters</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Categories Filter */}
                                <div>
                                    <h3 className="font-semibold mb-3 text-gray-900">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category.name)}
                                                    onChange={() => toggleCategory(category.name)}
                                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-gray-800 font-medium">{category.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Locations Filter */}
                                <div>
                                    <h3 className="font-semibold mb-3 text-gray-900">Locations</h3>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {locations.map((location) => (
                                            <label key={location} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLocations.includes(location)}
                                                    onChange={() => toggleLocation(location)}
                                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-gray-800 font-medium">{location}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div>
                                    <h3 className="font-semibold mb-3 text-gray-900">Price Range</h3>
                                    <div className="space-y-2">
                                        {feeRanges.map((range) => (
                                            <label key={range} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPriceRanges.includes(range)}
                                                    onChange={() => togglePriceRange(range)}
                                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-gray-800 font-medium">{range}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {(selectedCategories.length > 0 || selectedLocations.length > 0 || selectedPriceRanges.length > 0) && (
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                        className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                                    >
                                        Clear All Filters
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Artists Grid */}
                    <div className="lg:w-3/4">
                        {/* Results Header */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-700 font-medium">
                                Showing {filteredArtists.length} of {artists.length} artists
                            </p>
                        </div>

                        {/* Artists Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredArtists.map((artist) => (
                                <Card key={artist.id} className="hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-xl mb-2 text-gray-900 font-bold">{artist.name}</CardTitle>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="font-medium">{artist.rating}</span>
                                                    <span>•</span>
                                                    <span className="font-medium">{artist.experience}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                                            {artist.bio}
                                        </p>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold text-gray-900">Categories:</span>
                                                <div className="flex flex-wrap gap-1">
                                                    {artist.category.map((cat) => (
                                                        <span
                                                            key={cat}
                                                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <MapPin className="h-4 w-4 text-purple-600" />
                                                <span className="font-medium">{artist.location}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <DollarSign className="h-4 w-4 text-green-600" />
                                                <span className="font-bold text-gray-900">{artist.feeRange}</span>
                                            </div>
                                        </div>

                                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                                            Ask for Quote
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredArtists.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg mb-4 font-medium">
                                    No artists found matching your criteria
                                </p>
                                <Button onClick={clearFilters} variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 
