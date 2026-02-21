import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function QRscan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);


  if (!permission) {
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <Pressable onPress={requestPermission}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Allow Camera
        </Text>
      </Pressable>
    );
  }

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;

    console.log("QR DATA:", result.data);

    setScanned(true);

    router.push({
      pathname: "/result",
      params: {
        box_id: result.data, // e.g. "BOX123"
      },
    });
  };

  return (
    <CameraView
      style={StyleSheet.absoluteFillObject}
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      onBarcodeScanned={handleBarcodeScanned}
    />
  );
}

