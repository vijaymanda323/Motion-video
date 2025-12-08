import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RELIEF_ROUTINES = [
  { id: 1, name: "Cat Cow", target: "Spine", duration: "45s" },
  { id: 2, name: "Giraffe Stretch", target: "Neck", duration: "30s" },
  { id: 3, name: "Wrist Flexor", target: "Arms", duration: "30s" },
  { id: 4, name: "Seated Twist", target: "Back", duration: "45s" },
  { id: 5, name: "Hamstring Reach", target: "Legs", duration: "60s" },
  { id: 6, name: "Shoulder Rolls", target: "Shoulders", duration: "30s" },
  { id: 7, name: "Chin Tucks", target: "Neck", duration: "30s" },
  { id: 8, name: "Calf Raises", target: "Legs", duration: "45s" },
  { id: 9, name: "Doorway Stretch", target: "Chest", duration: "30s" },
  { id: 10, name: "Deep Squat", target: "Legs", duration: "45s" },
];

const QuickReliefScreen = () => {
  const navigation = useNavigation();

  const renderRoutineItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.7}>
      {/* Number Badge */}
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{item.id}</Text>
      </View>

      {/* Text Section */}
      <View style={styles.textBox}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>{item.target} • {item.duration}</Text>
      </View>

      {/* Play Icon */}
      <Ionicons name="play-outline" size={22} color="#8e9aab" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Titles */}
        <Text style={styles.title}>Quick Relief</Text>
        <Text style={styles.subtitle}>Verified physio routines.</Text>

        {/* List */}
        <View style={styles.list}>{RELIEF_ROUTINES.map(renderRoutineItem)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    marginTop: 15,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: "#7c8696",
    marginBottom: 25,
  },

  list: {
    marginTop: 5,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },

  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0,255,200,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  numberText: {
    color: "#00d4a6",
    fontWeight: "700",
    fontSize: 16,
  },

  textBox: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  sub: {
    marginTop: 2,
    fontSize: 13,
    color: "#8e9aab",
  },
});

export default QuickReliefScreen;