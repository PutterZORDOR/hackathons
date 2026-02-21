import { CameraView } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function ScanUmbrella() {
  const { from_box_id } = useLocalSearchParams();
  const [scanned, setScanned] = useState(false);

  const onScan = ({ data }: any) => {
    if (scanned) return;
    setScanned(true);

    router.push({
      pathname: "/scan-return-box",
      params: {
        umbrella_id: data,
        from_box_id,
      },
    });
  };

  return (
    <>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={onScan}
      />
      <Text style={{ position: "absolute", bottom: 40, alignSelf: "center" }}>
        Scan Umbrella QR
      </Text>
    </>
  );
}
