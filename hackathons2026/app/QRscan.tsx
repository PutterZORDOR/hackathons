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

export default function QRscan() {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

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
    return (
      <View style={styles.center}>
        <Text>No camera permission</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      />

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
    justifyContent: "center",
    alignItems: "center",
  },
});
