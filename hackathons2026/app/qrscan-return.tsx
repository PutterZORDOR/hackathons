<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
=======
>>>>>>> Stashed changes
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";
<<<<<<< Updated upstream

export default function ScanReturnBox() {
=======
>>>>>>> Stashed changes

export default function ScanReturnBox() {
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a

export default function QRscan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

<<<<<<< HEAD
  // Scan handler
  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);
    router.push('/confirm-return');
=======
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
      </View>
    );
  }

  const handleScan = async ({ data }: BarcodeScanningResult) => {

    if (scanned) return;

    setScanned(true);

    console.log("QR:", data);

    // Validate QR
    if (!data.startsWith("BOX_")) {
      Alert.alert("Invalid QR Code");
      setScanned(false);
      return;
    }

    const user_id = await AsyncStorage.getItem("user_id");

    if (!user_id) {
      Alert.alert("Error", "User not found");
      setScanned(false);
      return;
    }

    try {

      const response = await fetch(`${API_URL}/return_umbrella.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          box_id: data,
          user_id: user_id,
        }),
      });

      const result = await response.json();

      console.log("RESULT:", result);

      if (!result.success) {
        Alert.alert("Error", result.message || "Server error");
        setScanned(false);
        return;
      }

      // Success → go confirm page
      router.replace({
        pathname: "/confirm-return",
        params: {
          box_id: data,
          user_id,
        },
      });

    } catch (error) {

      console.log("Network error:", error);

      Alert.alert("Error", "Cannot connect to server");
      setScanned(false);
    }
<<<<<<< Updated upstream
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes
  };

  return (
    <ThemedView style={styles.root}>
      
      {/* CAMERA */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleBarcodeScanned}
        enableTorch={torch}
      />

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
      {/* BACK BUTTON */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/scanReturn')}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </Pressable>

      {/* SCAN FRAME */}
      <View style={styles.scanFrame}>
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>

       {/* TOP TEXT */}
      <View style={styles.topTextBox}>
        <ThemedText style={styles.scanText}>
          สแกน QR ที่ตู้ Mubrella
        </ThemedText>
      </View>
      
      {/* FLASH BUTTON */}
      <Pressable
        style={styles.flashButton}
        onPress={() => setTorch(!torch)}
      >
        
        <Ionicons
          name={torch ? "flash" : "flash-off"}
          
          size={26}
          color="white"      
        />
         <ThemedText style={styles.flashText}>
          {torch ? "ไฟฉาย: ปิด" : "ไฟฉาย: เปิด"}
        </ThemedText>
      </Pressable>
=======
>>>>>>> Stashed changes
      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.scanBox} />
      </View>

      <Text style={styles.text}>
        สแกน QR Code ที่ตู้เพื่อคืนร่ม
      </Text>
<<<<<<< Updated upstream
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes

    </ThemedView>
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  root: {
    flex: 1,
=======
>>>>>>> Stashed changes

  container:{
    flex:1,
    backgroundColor:"black"
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

<<<<<<< HEAD
    topTextBox: {
    position: 'absolute',
    top: 110,
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#1218d2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

   scanText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },

  scanFrame: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    width: 260,
    height: 260,
  },

  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderColor: '#ffffff',
    borderRadius: 12,
  },

  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderColor: '#ffffff',
    borderRadius: 12,
  },

  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderColor: '#ffffff',
    borderRadius: 12,
  },

  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderColor: '#ffffff',
    borderRadius: 12,
  },

  flashButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },

    flashText: {
    color: 'white',
    fontSize: 14,
  },
=======
  scanBox:{
    width:260,
    height:260,
    borderWidth:4,
    borderColor:"#2F6BFF",
    borderRadius:20,
    backgroundColor:"transparent"
  },

  text:{
    position:"absolute",
    bottom:120,
    alignSelf:"center",
    color:"white",
    fontSize:18,
    fontWeight:"600"
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }

<<<<<<< Updated upstream
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes
});