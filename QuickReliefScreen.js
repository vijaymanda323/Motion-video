import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import API_BASE_URL from "./config/api";

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
  const route = useRoute();
  
  // Get user email from route params or use default
  const userEmailFromParams = route.params?.email || route.params?.userEmail || '';
  const [userEmail, setUserEmail] = useState(userEmailFromParams);
  const [uploadingStates, setUploadingStates] = useState({});
  const [uploadedVideos, setUploadedVideos] = useState({});
  const [routineVideos, setRoutineVideos] = useState({}); // Store videos for each routine
  const [loadingVideos, setLoadingVideos] = useState(false);

  useEffect(() => {
    if (userEmailFromParams) {
      setUserEmail(userEmailFromParams);
    }
    // Fetch videos for all routines on component mount
    fetchAllRoutineVideos();
  }, [userEmailFromParams]);

  const fetchAllRoutineVideos = async () => {
    setLoadingVideos(true);
    try {
      // Fetch all public videos
      const response = await fetch(`${API_BASE_URL}/videos`);
      
      if (response.ok) {
        const data = await response.json();
        const allVideos = data.videos || [];
        
        // Group videos by routine name
        const videosByRoutine = {};
        RELIEF_ROUTINES.forEach(routine => {
          const routineName = routine.name.toLowerCase();
          // Find videos that match this routine
          const matchingVideos = allVideos.filter(video => {
            const title = video.title?.toLowerCase() || '';
            const tags = video.tags || [];
            const tagString = tags.join(' ').toLowerCase();
            
            // Check if video title or tags contain the routine name
            return title.includes(routineName) || 
                   tagString.includes(routineName) ||
                   tagString.includes(routineName.replace(/\s+/g, '-'));
          });
          
          if (matchingVideos.length > 0) {
            videosByRoutine[routine.id] = matchingVideos[0]; // Store the most recent video
          }
        });
        
        setRoutineVideos(videosByRoutine);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoadingVideos(false);
    }
  };

  const fetchVideosForRoutine = async (routineName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/routine/${encodeURIComponent(routineName)}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.videos || [];
      }
    } catch (error) {
      console.error("Error fetching videos for routine:", error);
    }
    return [];
  };

  const handleVideoUpload = async (routine) => {
    // Check if user email is available
    if (!userEmail) {
      Alert.alert(
        "Email Required",
        "Please login first to upload videos. User email is required.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      // Pick video file
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      
      // Validate file size (500MB limit)
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        Alert.alert("File Too Large", "Video file must be less than 500MB");
        return;
      }

      // Set uploading state
      setUploadingStates(prev => ({ ...prev, [routine.id]: true }));

      // Create FormData
      const formData = new FormData();
      formData.append("video", {
        uri: file.uri,
        type: file.mimeType || "video/mp4",
        name: file.name || `video_${routine.id}.mp4`,
      });
      formData.append("title", `${routine.name} - Quick Relief`);
      formData.append("userEmail", userEmail);
      formData.append("description", `${routine.name} exercise for ${routine.target}`);
      formData.append("category", "exercise");
      formData.append("tags", `quick-relief,${routine.target.toLowerCase()},${routine.name.toLowerCase().replace(/\s+/g, '-')}`);
      formData.append("duration", routine.duration.replace('s', '')); // Remove 's' and convert to seconds
      // Note: Videos are automatically set to public in backend

      // Upload video
      // Note: Don't set Content-Type header - React Native will set it automatically with boundary
      const response = await fetch(`${API_BASE_URL}/videos/upload-file`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedVideos(prev => ({ ...prev, [routine.id]: data.video }));
        // Update routine videos to show the newly uploaded video
        setRoutineVideos(prev => ({ ...prev, [routine.id]: data.video }));
        // Refresh all videos to get latest
        fetchAllRoutineVideos();
        Alert.alert(
          "Success",
          `Video uploaded successfully for ${routine.name}!`,
          [{ text: "OK" }]
        );
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert(
        "Upload Failed",
        error.message || "Failed to upload video. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setUploadingStates(prev => ({ ...prev, [routine.id]: false }));
    }
  };

  const renderRoutineItem = (item) => {
    const isUploading = uploadingStates[item.id];
    const hasVideo = routineVideos[item.id] || uploadedVideos[item.id];
    const video = routineVideos[item.id] || uploadedVideos[item.id];

    const handlePress = () => {
      if (hasVideo && video) {
        // If video exists, navigate to video player or show video
        // For now, show alert with video info
        Alert.alert(
          "Video Available",
          `A video is available for ${item.name}. Video ID: ${video.id}`,
          [
            { text: "OK" },
            { 
              text: "Upload New", 
              onPress: () => handleVideoUpload(item),
              style: "default"
            }
          ]
        );
      } else {
        // No video, allow upload
        handleVideoUpload(item);
      }
    };

    return (
      <TouchableOpacity 
        key={item.id} 
        style={styles.card} 
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={isUploading}
      >
        {/* Number Badge */}
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{item.id}</Text>
        </View>

        {/* Text Section */}
        <View style={styles.textBox}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>{item.target} • {item.duration}</Text>
          {hasVideo && (
            <Text style={styles.uploadedText}>✓ Video available</Text>
          )}
        </View>

        {/* Upload/Status Icon */}
        <View style={styles.iconContainer}>
          {isUploading ? (
            <ActivityIndicator size="small" color="#00d4a6" />
          ) : hasVideo ? (
            <Ionicons name="play-circle" size={22} color="#00d4a6" />
          ) : (
            <Ionicons name="cloud-upload-outline" size={22} color="#8e9aab" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
        {!userEmail && (
          <View style={styles.warningBox}>
            <Ionicons name="warning-outline" size={16} color="#ff9500" />
            <Text style={styles.warningText}>Login required to upload videos</Text>
          </View>
        )}

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
  uploadedText: {
    marginTop: 4,
    fontSize: 11,
    color: "#00d4a6",
    fontWeight: "600",
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff4e6",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  warningText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#ff9500",
    fontWeight: "500",
  },
});

export default QuickReliefScreen;