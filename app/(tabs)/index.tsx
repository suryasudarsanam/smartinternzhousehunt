import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PropertyCard } from '@/components/PropertyCard';
import { SearchHeader } from '@/components/SearchHeader';
import { FilterModal } from '@/components/FilterModal';
import { mockProperties } from '@/data/mockProperties';
import { Property, SearchFilters } from '@/types/Property';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 10000],
    propertyTypes: [],
    amenities: [],
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPrice = property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1];

      // Bedroom filter
      const matchesBedrooms = !filters.bedrooms || property.bedrooms >= filters.bedrooms;

      // Bathroom filter
      const matchesBathrooms = !filters.bathrooms || property.bathrooms >= filters.bathrooms;

      // Property type filter
      const matchesPropertyType = filters.propertyTypes.length === 0 || 
        filters.propertyTypes.includes(property.propertyType);

      // Amenities filter
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => property.amenities.includes(amenity));

      // Pet friendly filter
      const matchesPetFriendly = filters.petFriendly === undefined || 
        property.petFriendly === filters.petFriendly;

      // Furnished filter
      const matchesFurnished = filters.furnished === undefined || 
        property.furnished === filters.furnished;

      // Parking filter
      const matchesParking = !filters.parkingRequired || property.parkingSpaces > 0;

      return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms &&
             matchesPropertyType && matchesAmenities && matchesPetFriendly && 
             matchesFurnished && matchesParking;
    });
  }, [properties, searchQuery, filters]);

  const handlePropertyPress = (property: Property) => {
    router.push({
      pathname: '/property/[id]',
      params: { id: property.id }
    });
  };

  const handleFavoritePress = (propertyId: string) => {
    setProperties(prevProperties =>
      prevProperties.map(property =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const handleApplyFilters = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={() => setShowFilters(true)}
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredProperties.length} properties found
          </Text>
        </View>

        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onPress={() => handlePropertyPress(property)}
            onFavoritePress={() => handleFavoritePress(property.id)}
          />
        ))}

        {filteredProperties.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No properties found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your search criteria or filters
            </Text>
          </View>
        )}
      </ScrollView>

      <FilterModal
        visible={showFilters}
        filters={filters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});