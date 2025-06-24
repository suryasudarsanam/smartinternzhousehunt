import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Clock } from 'lucide-react-native';

const mockConversations = [
  {
    id: '1',
    landlordName: 'Sarah Johnson',
    landlordAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    propertyTitle: 'Modern Downtown Apartment',
    lastMessage: 'Hi! I\'d love to schedule a viewing for this weekend.',
    timestamp: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    landlordName: 'Michael Chen',
    landlordAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    propertyTitle: 'Cozy Family House',
    lastMessage: 'The property is available for viewing tomorrow at 3 PM.',
    timestamp: '1 day ago',
    unread: false,
  },
  {
    id: '3',
    landlordName: 'Emma Rodriguez',
    landlordAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    propertyTitle: 'Luxury High-Rise Condo',
    lastMessage: 'Thank you for your interest. Let me know if you have any questions.',
    timestamp: '3 days ago',
    unread: false,
  },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Your conversations with landlords</Text>
      </View>

      {mockConversations.length > 0 ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {mockConversations.map((conversation) => (
            <TouchableOpacity key={conversation.id} style={styles.conversationItem}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: conversation.landlordAvatar }}
                  style={styles.avatar}
                />
                {conversation.unread && <View style={styles.unreadBadge} />}
              </View>
              
              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.landlordName}>{conversation.landlordName}</Text>
                  <View style={styles.timestampContainer}>
                    <Clock size={12} color="#94A3B8" />
                    <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                  </View>
                </View>
                
                <Text style={styles.propertyTitle} numberOfLines={1}>
                  {conversation.propertyTitle}
                </Text>
                
                <Text 
                  style={[
                    styles.lastMessage,
                    conversation.unread && styles.lastMessageUnread
                  ]} 
                  numberOfLines={2}
                >
                  {conversation.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <MessageCircle size={64} color="#E2E8F0" />
          </View>
          <Text style={styles.emptyTitle}>No Messages Yet</Text>
          <Text style={styles.emptyDescription}>
            Start a conversation with landlords to inquire about properties
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
    backgroundColor: '#FFFFFF',
  },
  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#EF4444',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  landlordName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter-Regular',
  },
  propertyTitle: {
    fontSize: 14,
    color: '#2563EB',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  lastMessageUnread: {
    color: '#1E293B',
    fontFamily: 'Inter-Medium',
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