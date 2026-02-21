import { API_URL } from "@/config/api";
import { CameraView } from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ScanReturnBox() {
  const { umbrella_id, from_box_id } = useLocalSearchParams();
  const [scanned, setScanned] = useState(false);
  const [toBox, setToBox] = useState<string | null>(null);

  const onScan = ({ data }: any) => {
    if (scanned) return;
    setScanned(true);
    setToBox(data);
  };

  const confirmReturn = () => {
    fetch(`${API_URL}/return_umbrella.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        umbrella_id,
        from_box_id,
        to_box_id: toBox,
      }),
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(() => alert("Server error"));
  };

  return (
    <View style={{ flex: 1 }}>
      {!toBox ? (
        <>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={onScan}
          />
          <Text style={styles.label}>Scan Destination Box</Text>
        </>
      ) : (
        <View style={styles.confirm}>
          <Text>Umbrella: {umbrella_id}</Text>
          <Text>Return to box: {toBox}</Text>

          <Pressable style={styles.button} onPress={confirmReturn}>
            <Text style={{ color: "#fff" }}>Confirm Return</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    fontSize: 16,
  },
  confirm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 6,
  },
});
