import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { useRouter } from "expo-router";
export default function QRScan() {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
  }

  const handleScan = ({ data }: any) => {
    if (scanned) return;

    setScanned(true);

    console.log("QR:", data);

    router.push("/confirm-return");
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

      {/* scan frame */}
      <View style={styles.overlay}>
        <View style={styles.scanBox} />
      </View>

      <Text style={styles.text}>สแกน QR Code ที่ตู้</Text>

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
    borderRadius:20
  },

  text:{
    position:"absolute",
    bottom:120,
    alignSelf:"center",
    color:"white",
    fontSize:18
  }
});