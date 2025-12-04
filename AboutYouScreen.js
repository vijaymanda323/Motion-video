// --- Start of AboutYouScreen.js ---

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Placeholder data (you would load this from state/API in a real app)
const profileData = {
    height: '172 cm',
    weight: '54 kg',
    birthday: 'May 6, 1992',
    sex: 'Female',
    displayName: 'Neha ',
    location: 'Choose country',
    bio: 'Share your fitness goals',
    accountCreated: 'December 2, 2025',
    id: 'CWJZJV',
};

// 🌟 CORRECTED COMPONENT: Now displays both label and value
const ProfileRow = ({ label, value }) => (
    <View style={styles.row}>
        {/* Added Label Text */}
        <Text style={styles.labelText}>{label}</Text> 
        <Text style={styles.valueText}>{value}</Text>
    </View>
);

export default function AboutYouScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About you</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Information Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Profile information</Text>
                    <TouchableOpacity>
                        <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.description}>
                    The profile information you share is used to calculate some metrics and personalize your experience
                </Text>

                <View style={styles.card}>
                    {/* Height - Label passed correctly */}
                    <ProfileRow label="Height" value={profileData.height} />
                    <View style={styles.divider} />
                    
                    {/* Weight - Label passed correctly */}
                    <ProfileRow label="Weight" value={profileData.weight} />
                    <View style={styles.divider} />

                    {/* Birthday - Label passed correctly */}
                    <ProfileRow label="Birthday" value={profileData.birthday} />
                    <View style={styles.divider} />
                    
                    {/* Sex - Label passed correctly */}
                    <ProfileRow label="Sex" value={profileData.sex} />
                </View>

                {/* Social Profile Section */}
                <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                    <Text style={styles.sectionTitle}>Social profile</Text>
                    <TouchableOpacity>
                        <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Added Description for Social Profile */}
                <Text style={styles.description}>
                   Your profile lets you **share movement progress and streaks** with friends for motivation and accountability, while controlling your privacy settings.
                </Text>

                <View style={styles.card}>
                    {/* Display Name - Label passed correctly */}
                    <ProfileRow label="Display name" value={profileData.displayName} />
                    <View style={styles.divider} />
                    
                    {/* Location - Label passed correctly */}
                    <ProfileRow label="Location" value={profileData.location} />
                    <View style={styles.divider} />

                    {/* Your bio - Label passed correctly */}
                    <ProfileRow label="Your bio" value={profileData.bio} />
                    <View style={styles.divider} />
                    
                    <TouchableOpacity style={styles.privacyButton}>
                        <Text style={styles.privacyButtonText}>Community & Sharing privacy</Text>
                    </TouchableOpacity>
                </View>

                {/* Account Section */}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Your account</Text>
                
                <View style={styles.card}>
                    {/* Account created - Label passed correctly */}
                    <ProfileRow label="Account created" value={profileData.accountCreated} />
                    <View style={styles.divider} />
                    
                    {/* ID - Label passed correctly */}
                    <ProfileRow label="ID" value={profileData.id} />
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#333',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 50,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        color: '#0A84FF',
        fontSize: 16,
        fontWeight: '600',
    },
    // 🌟 Adjusted description style for better flow in the Social Profile section
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        lineHeight: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 10,
    },
    row: {
        // 🌟 Adjusted vertical padding for two lines of text
        paddingVertical: 10, 
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    labelText: {
        fontSize: 12,
        color: '#999',
        // 🌟 Add margin bottom to separate label from value
        marginBottom: 2, 
    },
    valueText: {
        fontSize: 16,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 20,
    },
    privacyButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#e6f0ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 20,
    },
    privacyButtonText: {
        color: '#0A84FF',
        fontWeight: '600',
        fontSize: 14,
    },
});

