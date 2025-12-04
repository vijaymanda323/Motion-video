// --- Start of HomeScreen.js ---

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* TOP HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          {/* 🎯 Profile Icon: Navigate to AboutYou */}
          <TouchableOpacity onPress={() => navigation.navigate("AboutYou")}>
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Hi, Neha</Text>
        <Text style={styles.headerSubtitle}>Let's fix that posture.</Text>

        {/* Status & Streak */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>STATUS</Text>
            <View style={styles.statValueRow}>
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
              <Text style={styles.statValue}> Active</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>STREAK</Text>
            <Text style={styles.statValue}>🔥 3 Day</Text>
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pain Bingo - clickable card */}
        <TouchableOpacity onPress={() => navigation.navigate("PainBingo")}>
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="apps-outline" size={22} color="#777" />
              <View style={styles.badgePink}>
                <Text style={styles.badgeText}>GAMIFIED</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>Pain Bingo</Text>
            <Text style={styles.cardText}>
              Turn your symptoms into a game. Complete patterns to unlock specific relief.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Quick Relief - MADE CLICKABLE AND ADDED NAVIGATION */}
        <TouchableOpacity onPress={() => navigation.navigate("QuickRelief")}>
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="list-outline" size={22} color="#777" />
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeText}>TRADITIONAL</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>Quick Relief</Text>
            <Text style={styles.cardText}>
              Direct access to standard physio routines. No frills, just results.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* --- Bottom Navigation --- */}
      <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItemActive}>
            {/* Active Icon for Today */}
            <Ionicons name="today" size={24} color="#1e5cff" /> 
            <Text style={styles.navTextActive}>Today</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("PainBingo")}>
            <Ionicons name="apps-outline" size={24} color="#888" />
            <Text style={styles.navText}>Bingo</Text>
          </TouchableOpacity>
          
          {/* 🎯 Profile Tab: Navigate to AboutYou */}
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("AboutYou")}>
            <Ionicons name="person-outline" size={24} color="#888" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#eef2ff" 
  },
  scrollContent: {
    paddingTop: 40, 
    paddingBottom: 120, // Add padding for bottom navigation
  },
  header: {
    backgroundColor: "#1e5cff",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 60,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  headerRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  headerTitle: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color: "#fff", 
    marginTop: 15 
  },
  headerSubtitle: { 
    color: "#dbe4ff", 
    fontSize: 16, 
    marginBottom: 20 
  },
  statsRow: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 12,
  },
  statLabel: { 
    color: "#dce6ff", 
    fontSize: 13, 
    marginBottom: 5 
  },
  statValueRow: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  statValue: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },

  /* cards */
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 22,
    marginHorizontal: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeaderRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  badgePink: { 
    backgroundColor: "#ff6b6b", 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 10 
  },
  badgeGreen: { 
    backgroundColor: "#8ad18a", 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 10 
  },
  badgeText: { 
    color: "#fff", 
    fontSize: 12, 
    fontWeight: "bold" 
  },
  cardTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginTop: 10, 
    color: "#333" 
  },
  cardText: { 
    fontSize: 15, 
    color: "#666", 
    marginTop: 5 
  },

  // --- Bottom Navigation Styles ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', // White background for light theme
    paddingBottom: 25, // For touch area/safe area spacing
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eef2ff', // Light separator
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    padding: 5,
  },
  navText: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  navItemActive: {
    alignItems: 'center',
    padding: 5,
  },
  navTextActive: {
    color: '#1e5cff', // Primary blue color for active tab
    fontSize: 12,
    marginTop: 2,
    fontWeight: 'bold',
  }
});

// --- End of HomeScreen.js ---