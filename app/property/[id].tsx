import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Share,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react-native';
import { mockProperties } from '@/data/mockProperties';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(property?.isFavorite || false);

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Property not found</Text>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${property.landlord.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${property.landlord.email}`);
  };

  const handleMessage = () => {
    Alert.alert('Message', 'Message functionality would be implemented here');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.images[currentImageIndex] }}
            style={styles.mainImage}
          />
          
          <View style={styles.imageHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  size={24}
                  color={isFavorite ? '#EF4444' : '#64748B'}
                  fill={isFavorite ? '#EF4444' : 'transparent'}
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>
          
          {property.images.length > 1 && (
            <ScrollView
              horizontal
              style={styles.imagePreview}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imagePreviewContent}
            >
              {property.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentImageIndex(index)}
                  style={[
                    styles.previewImage,
                    currentImageIndex === index && styles.previewImageActive,
                  ]}
                >
                  <Image source={{ uri: image }} style={styles.previewImageImg} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Property Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.priceHeader}>
            <Text style={styles.price}>${property.price.toLocaleString()}/mo</Text>
            {property.available && (
              <View style={styles.availableBadge}>
                <Text style={styles.availableText}>Available</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.address}>
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </Text>
          </View>
          
          <View style={styles.quickStats}>
            <View style={styles.stat}>
              <Bed size={20} color="#2563EB" />
              <Text style={styles.statText}>{property.bedrooms} Bedrooms</Text>
            </View>
            <View style={styles.stat}>
              <Bath size={20} color="#2563EB" />
              <Text style={styles.statText}>{property.bathrooms} Bathrooms</Text>
            </View>
            <View style={styles.stat}>
              <Square size={20} color="#2563EB" />
              <Text style={styles.statText}>{property.sqft} sq ft</Text>
            </View>
            {property.parkingSpaces > 0 && (
              <View style={styles.stat}>
                <Car size={20} color="#2563EB" />
                <Text style={styles.statText}>{property.parkingSpaces} Parking</Text>
              </View>
            )}
          </View>
          
          <View style={styles.availabilityContainer}>
            <Calendar size={20} color="#10B981" />
            <Text style={styles.availabilityText}>
              Available from {new Date(property.availableDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{property.description}</Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {property.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Property Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Features</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureLabel}>Type</Text>
              <Text style={styles.featureValue}>
                {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
              </Text>
            </View>
            {property.yearBuilt && (
              <View style={styles.feature}>
                <Text style={styles.featureLabel}>Year Built</Text>
                <Text style={styles.featureValue}>{property.yearBuilt}</Text>
              </View>
            )}
            <View style={styles.feature}>
              <Text style={styles.featureLabel}>Pet Policy</Text>
              <Text style={styles.featureValue}>
                {property.petFriendly ? 'Pet Friendly' : 'No Pets'}
              </Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureLabel}>Furnished</Text>
              <Text style={styles.featureValue}>
                {property.furnished ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        </View>

        {/* Landlord Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Landlord</Text>
          <View style={styles.landlordContainer}>
            <View style={styles.landlordInfo}>
              <Image
                source={{ uri: property.landlord.avatar }}
                style={styles.landlordAvatar}
              />
              <View style={styles.landlordDetails}>
                <Text style={styles.landlordName}>{property.landlord.name}</Text>
                <Text style={styles.landlordTitle}>Property Owner</Text>
              </View>
            </View>
            
            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
                <Phone size={20} color="#10B981" />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
                <Mail size={20} color="#2563EB" />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.contactButton} onPress={handleMessage}>
                <MessageCircle size={20} color="#F59E0B" />
                <Text style={styles.contactButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.inquireButton} onPress={handleMessage}>
          <Text style={styles.inquireButtonText}>Send Inquiry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  imageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  imagePreview: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  imagePreviewContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  previewImage: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  previewImageActive: {
    borderColor: '#2563EB',
  },
  previewImageImg: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  detailsContainer: {
    padding: 20,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  availableBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  availableText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#166534',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
  quickStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  availabilityText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#166534',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    fontFamily: 'Inter-Regular',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  amenityText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#475569',
  },
  featuresContainer: {
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  featureLabel: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  featureValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  landlordContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
  },
  landlordInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  landlordAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  landlordDetails: {
    flex: 1,
  },
  landlordName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  landlordTitle: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  bottomAction: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  inquireButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  inquireButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});