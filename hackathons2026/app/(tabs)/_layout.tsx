import { Tabs, useRouter, usePathname } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const TabItem = ({ icon, route }: any) => (
    <TouchableOpacity onPress={() => router.replace(route)}>

      <Ionicons
        name={icon}
        size={26}
        color={pathname === route ? "white" : "rgba(255,255,255,0.5)"}
      />
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.wrapper}>
      {/* Background bar */}
      <LinearGradient
        colors={["#020012", "#051F3F", "#145EA3"]}
        style={styles.bar}
      />

      {/* White circle cut illusion */}
      <View style={styles.notch} />

      {/* Center QR Button */}
      <TouchableOpacity
        style={styles.qrButton}
        onPress={() => router.push("/QRscan")}
      >
        <Ionicons name="qr-code" size={28} color="white" />
      </TouchableOpacity>

      {/* Icons */}
      <View style={styles.iconRow}>
        <TabItem icon="home" route="/home" />
        <TabItem icon="cloud" route="/weather" />
        <View style={{ width: 50 }} />
        <TabItem icon="pulse" route="/activity" />
        <TabItem icon="person" route="/profile" />
      </View>
    </View>
    
  );
}

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="weather" />
        <Tabs.Screen name="activity" />
        <Tabs.Screen name="profile" />
      </Tabs>

      <CustomTabBar />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 110,
    alignItems: "center",
  },
  bar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  notch: {
    position: "absolute",
    top: -20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F1F1F1",
  },
  qrButton: {
    position: "absolute",
    top: -11,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1F4E95",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  iconRow: {
    position: "absolute",
    bottom: 27,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
