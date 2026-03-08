import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config/api";

export default function ScanReturnBox() {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

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
  };

  return (
    <View style={styles.container}>

      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.scanBox} />
      </View>

      <Text style={styles.text}>
        สแกน QR Code ที่ตู้เพื่อคืนร่ม
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"black"
  },

  overlay:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

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

});