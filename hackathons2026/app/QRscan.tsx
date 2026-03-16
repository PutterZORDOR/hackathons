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
import { Camera, CameraView } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
<<<<<<< Updated upstream

export default function QRscan() {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a

export default function QRscan() {
  const [scanned, setScanned] = useState(false);
<<<<<<< HEAD
  const [torch, setTorch] = useState(false);

  // Loading
  if (!permission) {
=======
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

>>>>>>> Stashed changes
  /* ✅ Request Camera Permission */
  useEffect(() => {
    (async () => {
      const { status } =
        await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Camera access is needed to scan QR codes"
        );
      }
    })();
  }, []);

  /* ✅ Handle QR Scan */
  const handleScan = ({ data }: any) => {
    if (scanned) return;

    // Validate QR format
    if (!data.startsWith("BOX_")) {
      Alert.alert("Invalid QR", "This is not a valid box QR code");
      return;
    }

    const cleanBoxId = data.replace("BOX_", "BOX_");

    setScanned(true);

    // Navigate to Result Page
    router.replace({
      pathname: "/home",
      params: { 
        box_id: cleanBoxId,
        confirm: "true",
      },
    });
  };

  /* ❌ No Permission */
  if (hasPermission === false) {
<<<<<<< Updated upstream
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes
    return (
      <View style={styles.center}>
        <Text>No camera permission</Text>
      </View>
    );
  }

<<<<<<< Updated upstream
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      />

=======
<<<<<<< HEAD
  // Permission UI
  if (!permission.granted) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Camera permission is required</ThemedText>

        <Pressable style={styles.button} onPress={requestPermission}>
          <ThemedText style={styles.buttonText}>Allow Camera</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  // Scan handler
  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);
    router.replace('/(tabs)/home?confirm=true');
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

      {/* BACK BUTTON */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/home')}
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

    </ThemedView>
=======
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      />

>>>>>>> Stashed changes
      <View style={styles.overlay}>
        <Text style={styles.text}>
          Scan Box QR to Borrow Umbrella
        </Text>

        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#fff" }}>Cancel</Text>
        </Pressable>
      </View>
    </View>
<<<<<<< Updated upstream
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 6,
    width: 120,
    alignItems: "center",
  },
  center: {
    flex: 1,
<<<<<<< Updated upstream
    justifyContent: "center",
    alignItems: "center",
=======
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

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
=======
    justifyContent: "center",
    alignItems: "center",
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes
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
});