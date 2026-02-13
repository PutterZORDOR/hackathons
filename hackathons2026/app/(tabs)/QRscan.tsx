import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function QRscan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Loading state
  if (!permission) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Loading camera permission...</ThemedText>
      </ThemedView>
    );
  }

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

  // QR handler
  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);
    alert(`QR Data: ${result.data}`);
  };

  return (
    <ThemedView style={styles.root}>

      {/* Camera (NO CHILDREN) */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      {/* Overlay UI */}
      <ThemedView style={styles.overlay}>
        <ThemedText style={styles.overlayText}>
          Point camera at QR code
        </ThemedText>

        {scanned && (
          <Pressable
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <ThemedText style={styles.buttonText}>Scan Again</ThemedText>
          </Pressable>
        )}

        <Pressable
          style={styles.button}
          onPress={() => router.push('/')}
        >
          <ThemedText style={styles.buttonText}>Home</ThemedText>
        </Pressable>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  overlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },

  overlayText: {
    color: 'white',
    textAlign: 'center',
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
});
