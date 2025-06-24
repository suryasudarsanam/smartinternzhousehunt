import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Switch 
} from 'react-native';
import { X } from 'lucide-react-native';
import { SearchFilters } from '@/types/Property';

interface FilterModalProps {
  visible: boolean;
  filters: SearchFilters;
  onClose: () => void;
  onApplyFilters: (filters: SearchFilters) => void;
}

export function FilterModal({ visible, filters, onClose, onApplyFilters }: FilterModalProps) {
  const [localFilters, setLocalFilters] = React.useState<SearchFilters>(filters);

  const propertyTypes = ['apartment', 'house', 'condo', 'townhouse'];
  const commonAmenities = [
    'Air Conditioning', 'Parking', 'Gym', 'Pool', 'Laundry', 'Balcony',
    'Garden', 'Fireplace', 'Garage', 'Pet Friendly'
  ];

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      priceRange: [0, 10000],
      propertyTypes: [],
      amenities: [],
    };
    setLocalFilters(resetFilters);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              <Text style={styles.priceLabel}>
                ${localFilters.priceRange[0].toLocaleString()} - ${localFilters.priceRange[1].toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Bedrooms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bedrooms</Text>
            <View style={styles.optionsContainer}>
              {[1, 2, 3, 4, 5].map((bedroom) => (
                <TouchableOpacity
                  key={bedroom}
                  style={[
                    styles.optionButton,
                    localFilters.bedrooms === bedroom && styles.optionButtonSelected
                  ]}
                  onPress={() => setLocalFilters({ 
                    ...localFilters, 
                    bedrooms: localFilters.bedrooms === bedroom ? undefined : bedroom 
                  })}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.bedrooms === bedroom && styles.optionTextSelected
                  ]}>
                    {bedroom}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Property Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Type</Text>
            <View style={styles.optionsContainer}>
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.optionButton,
                    localFilters.propertyTypes.includes(type) && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    const updatedTypes = localFilters.propertyTypes.includes(type)
                      ? localFilters.propertyTypes.filter(t => t !== type)
                      : [...localFilters.propertyTypes, type];
                    setLocalFilters({ ...localFilters, propertyTypes: updatedTypes });
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.propertyTypes.includes(type) && styles.optionTextSelected
                  ]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {commonAmenities.map((amenity) => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.amenityButton,
                    localFilters.amenities.includes(amenity) && styles.amenityButtonSelected
                  ]}
                  onPress={() => {
                    const updatedAmenities = localFilters.amenities.includes(amenity)
                      ? localFilters.amenities.filter(a => a !== amenity)
                      : [...localFilters.amenities, amenity];
                    setLocalFilters({ ...localFilters, amenities: updatedAmenities });
                  }}
                >
                  <Text style={[
                    styles.amenityText,
                    localFilters.amenities.includes(amenity) && styles.amenityTextSelected
                  ]}>
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Additional Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Options</Text>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Pet Friendly</Text>
              <Switch
                value={localFilters.petFriendly || false}
                onValueChange={(value) => setLocalFilters({ ...localFilters, petFriendly: value })}
                trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Furnished</Text>
              <Switch
                value={localFilters.furnished || false}
                onValueChange={(value) => setLocalFilters({ ...localFilters, furnished: value })}
                trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Parking Required</Text>
              <Switch
                value={localFilters.parkingRequired || false}
                onValueChange={(value) => setLocalFilters({ ...localFilters, parkingRequired: value })}
                trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  priceRangeContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  optionButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  amenityButtonSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  amenityText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  amenityTextSelected: {
    color: '#FFFFFF',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});