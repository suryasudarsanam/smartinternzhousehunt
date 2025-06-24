import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation } from 'lucide-react-native';
import { mockProperties } from '@/data/mockProperties';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Property Map</Text>
        <Text style={styles.subtitle}>Discover properties in your area</Text>
      </View>

      {/* Mock Map Container */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color="#2563EB" />
          <Text style={styles.mapText}>Interactive Map</Text>
          <Text style={styles.mapSubtext}>
            Map integration would display property locations here
          </Text>
        </View>
      </View>

      {/* Property List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Nearby Properties</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Navigation size={16} color="#2563EB" />
            <Text style={styles.locationButtonText}>Use My Location</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.propertyList}
          showsVerticalScrollIndicator={false}
        >
          {mockProperties.map((property) => (
            <TouchableOpacity key={property.id} style={styles.propertyItem}>
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyTitle} numberOfLines={1}>
                  {property.title}
                </Text>
                <Text style={styles.propertyAddress} numberOfLines={1}>
                  {property.address}, {property.city}
                </Text>
                <Text style={styles.propertyPrice}>
                  ${property.price.toLocaleString()}/mo
                </Text>
              </View>
              <View style={styles.propertyStats}>
                <Text style={styles.propertyStatText}>
                  {property.bedrooms}bd • {property.bathrooms}ba
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  mapText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: 300,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  locationButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
  propertyList: {
    flex: 1,
  },
  propertyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  propertyInfo: {
    flex: 1,
    marginRight: 16,
  },
  propertyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
  },
  propertyStats: {
    alignItems: 'flex-end',
  },
  propertyStatText: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
  },
});