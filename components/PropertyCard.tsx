import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Property } from '@/types/Property';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react-native';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  onFavoritePress: () => void;
}

export function PropertyCard({ property, onPress, onFavoritePress }: PropertyCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.images[0] }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          activeOpacity={0.8}
        >
          <Heart
            size={20}
            color={property.isFavorite ? '#EF4444' : '#64748B'}
            fill={property.isFavorite ? '#EF4444' : 'transparent'}
          />
        </TouchableOpacity>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${property.price.toLocaleString()}/mo</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#64748B" />
          <Text style={styles.address} numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Bed size={16} color="#64748B" />
            <Text style={styles.detailText}>{property.bedrooms} bed</Text>
          </View>
          <View style={styles.detail}>
            <Bath size={16} color="#64748B" />
            <Text style={styles.detailText}>{property.bathrooms} bath</Text>
          </View>
          <View style={styles.detail}>
            <Square size={16} color="#64748B" />
            <Text style={styles.detailText}>{property.sqft} sq ft</Text>
          </View>
        </View>
        
        <View style={styles.amenitiesContainer}>
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
          {property.amenities.length > 3 && (
            <Text style={styles.moreAmenities}>+{property.amenities.length - 3} more</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  priceTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  address: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  amenityTag: {
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 12,
    color: '#475569',
    fontFamily: 'Inter-Medium',
  },
  moreAmenities: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
  },
});