import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { PropertyCard } from '@/components/PropertyCard';
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/types/Property';
import { router } from 'expo-router';

export default function FavoritesScreen() {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>(
    mockProperties.filter(property => property.isFavorite)
  );

  const handlePropertyPress = (property: Property) => {
    router.push({
      pathname: '/property/[id]',
      params: { id: property.id }
    });
  };

  const handleFavoritePress = (propertyId: string) => {
    setFavoriteProperties(prevProperties =>
      prevProperties.filter(property => property.id !== propertyId)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved properties</Text>
      </View>

      {favoriteProperties.length > 0 ? (
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {favoriteProperties.length} saved {favoriteProperties.length === 1 ? 'property' : 'properties'}
            </Text>
          </View>

          {favoriteProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{ ...property, isFavorite: true }}
              onPress={() => handlePropertyPress(property)}
              onFavoritePress={() => handleFavoritePress(property.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Heart size={64} color="#E2E8F0" />
          </View>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyDescription}>
            Start browsing properties and tap the heart icon to save your favorites
          </Text>
        </View>
      )}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});