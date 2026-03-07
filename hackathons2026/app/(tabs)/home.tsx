import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState,useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Animated, Easing } from "react-native";
import Lockericon from "../../components/Lockericon";
const { width } = Dimensions.get("window");
import { useRouter } from "expo-router";

export default function Home() {
  const { confirm } = useLocalSearchParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const [showPickup, setShowPickup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const router = useRouter();
  
  const rotate = rotateAnim.interpolate({
    
  inputRange: [0, 1],
  outputRange: ["-45deg", "-20deg"],
  });

  useEffect(() => {
    if (confirm === "true") {
      setShowConfirm(true);
    }
  }, [confirm]);
  useEffect(() => {
  if (showSuccess) {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }
}, [showSuccess]);

useEffect(() => {
  if (!showPickup) return;

  if (timeLeft === 0) {
    setShowPickup(false);
    router.push("/borrow");
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [showPickup, timeLeft]);

  return (
    <View style={[styles.container, { position: "relative" }]}>
      {/* HEADER */}
      <LinearGradient
        colors={["#020012", "#051F3F", "#145EA3"]}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <View style={styles.logoRow}>
            <Image
              source={require("../../assets/images/mubrella-logo.png")}
              style={styles.logoImage}
  />
          </View>

          <View style={styles.headerIcons}>
            <Ionicons name="time-outline" size={24} color="white" />
            <Ionicons name="notifications" size={24} color="white" />
            <Ionicons name="settings" size={24} color="white" />
          </View>
        </View>

        {/* Reward + Search */}
        <View style={styles.topCards}>
          <View style={styles.rewardCard}>
            <Text style={styles.rewardSmall}>Reward Points</Text>
            <Text style={styles.rewardBig}>150 UMP</Text>
          </View>

          <View style={styles.searchCard}>
            <Ionicons name="search" size={18} />
            <Text style={{ marginLeft: 6 }}>Search</Text>
          </View>
        </View>
      </LinearGradient>

      {/* QUICK BUTTONS */}
      <View style={styles.quickRow}>
        {[
          { label: "Wallet", icon: "wallet" },
          { label: "Rewards", icon: "gift" },
          { label: "UM Help", icon: "help-circle" },
          { label: "More", icon: "menu" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.quickButton}>
            <Ionicons name={item.icon as any} size={26} color="black" />
            <Text style={styles.quickText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

    {/* WHITE MAIN CARD */}
<View style={styles.mainCard}>

  {/* MAP */}
  <View style={styles.mapWrapper}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 13.7563,
        longitude: 100.5018,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{ latitude: 13.7563, longitude: 100.5018 }}
        title="Umbrella Station"
      />
    </MapView>
  </View>

  {/* CREDIT + HELP */}
  <View style={styles.infoRow}>
    <View style={styles.creditBox}>
      <Text style={styles.creditLabel}>Credit Balance</Text>
      <Text style={styles.creditAmount}>฿ 9999.99</Text>
    </View>

    <View>
      <Text style={styles.sideLink}>UM Help</Text>
      <Text style={styles.sideLink}>Parking station</Text>
    </View>
  </View>

</View>
            {/* CONFIRM OVERLAY */}
      {showConfirm && (
        <View style={styles.overlayContainer}>
          <View style={styles.darkOverlay} />

          <View style={styles.bottomSheet}>
            <Text style={styles.confirmTitle}>
              พร้อมลุยฝนแล้วใช่มั้ย?
            </Text>

            <LinearGradient
              colors={["#020012", "#051F3F", "#145EA3"]}
              style={styles.umbrellaCircle}
            >
              <Ionicons name="umbrella" size={70} color="white" />
            </LinearGradient>

            <Text style={styles.confirmSubtitle}>
              กรุณากดยืนยันเพื่อดำเนินการต่อ
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
              setShowConfirm(false);

              setTimeout(() => {
                setShowSuccess(true);

              setTimeout(() => {
                setShowSuccess(false);
                setShowPickup(true);
              }, 2000); // แสดง success 1 วิ
            }, 300);
}}
              
>
              <Text style={styles.confirmText}>
                ยืนยันการปลดล็อคร่ม
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showSuccess && (
  <View style={styles.overlayContainer}>
    <View style={styles.darkOverlay} />

    <View style={styles.successSheet}>

      <Text style={styles.successTitle}>ปลดล็อกแล้ว</Text>

      {/* Floating Dots */}
      <View style={styles.floatingContainer}>
        {[...Array(8)].map((_, i) => (
          <View key={i} style={styles.floatingDot} />
        ))}
      </View>

      {/* Animated Lock */}
      <Animated.View
        style={{
          transform: [
            { scale: scaleAnim },
            { rotate: rotate },
          ],
        }}
      >
        <Ionicons name="lock-open" size={150} color="#39B54A" />
      </Animated.View>

      <Text style={styles.percentClean}>100%</Text>

      <Text style={styles.successDesc}>
        โปรดเช็คอุปกรณ์ทุกครั้งว่าอยู่ในสภาพพร้อมใช้งาน
        ก่อนเริ่มใช้ เช่น ใบร่ม หรือ ตอนกางร่ม หากเกิดความเสียหาย
        กรุณาแจ้งความเสียหายและเปลี่ยนไปใช้ร่มคันอื่น
      </Text>

    </View>
  </View>
)}

{showPickup && (
  <View style={styles.overlayContainer}>
    <View style={[styles.darkOverlay, { backgroundColor: "rgba(87,87,87,0.72)" }]} />

    <View style={styles.successSheet}>

      <Text style={styles.successTitle}>
        โปรดนำร่มออกจากตู้
      </Text>

      <View style={{ marginTop: 20 }}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Lockericon size={180} />
        </Animated.View>
        <Ionicons
          name="lock-open"
          size={50}
          color="#00FF44"
          style={{ position: "absolute", right: 30, bottom: 50 }}
        />
      </View>

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>
          00:{String(timeLeft).padStart(2, "0")}
        </Text>
      </View>

      <Text style={styles.successDesc}>
        โปรดเช็คอุปกรณ์ทุกครั้งว่าอยู่ในสภาพพร้อมใช้งาน{"\n"}
        ก่อนเริ่มใช้ เช่น ใบร่ม หรือ ตอนกางร่ม{"\n"}
        หากเกิดความเสียหาย กรุณาแจ้งความเสียหาย{"\n"}
        และเปลี่ยนไปใช้ร่มคันอื่น
      </Text>

    </View>
  </View>
)}

    </View>
  );
  

  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },

  topCards: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  rewardCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
  },

  rewardSmall: { fontSize: 10 },
  rewardBig: { fontWeight: "bold", marginTop: 5 },

  searchCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  quickButton: {
    backgroundColor: "white",
    width: 72,
    height: 73,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  quickText: {
    fontSize: 10,
    marginTop: 4,
  },

  mapCard: {
    marginTop: 20,
    alignSelf: "center",
    width: width * 0.9,
    height: 300,
    borderRadius: 30,
    overflow: "hidden",
    elevation: 8,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  creditCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D3E6",
  },

  sideLink: {
    fontSize: 12,
    marginBottom: 8,
  },



logoImage: {
  width: 120,
  height: 70,
  resizeMode: "contain",
},
mainCard: {
  marginTop: 20,
  marginHorizontal: 20,
  backgroundColor: "white",
  borderRadius: 30,
  padding: 15,
  elevation: 12,
},

mapWrapper: {
  height: 280,
  borderRadius: 25,
  overflow: "hidden",
},

infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
},

creditBox: {
  borderWidth: 1,
  borderColor: "#D1D3E6",
  padding: 15,
  borderRadius: 20,
},

creditLabel: {
  fontSize: 12,
  color: "#17468C",
},

creditAmount: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#17468C",
},

overlayContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
  justifyContent: "flex-end",
},

darkOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.18)",
},

bottomSheet: {
  backgroundColor: "white",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  padding: 25,
  paddingBottom: 40,
  alignItems: "center",
},

confirmTitle: {
  fontSize: 20,
  fontWeight: "700",
  marginBottom: 25,
},

umbrellaCircle: {
  width: 116,
  height: 116,
  borderRadius: 58,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
},

confirmSubtitle: {
  fontSize: 13,
  marginBottom: 25,
},

confirmButton: {
  width: "90%",
  height: 80,
  backgroundColor: "#000",
  borderRadius: 66,
  justifyContent: "center",
  alignItems: "center",
},

confirmText: {
  color: "#FFFFFF",
  fontSize: 20,
  fontWeight: "700",
},

successSheet: {
  backgroundColor: "white",
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  paddingTop: 30,
  paddingHorizontal: 30,
  paddingBottom: 60,
  alignItems: "center",
},

percentClean: {
  fontSize: 32,
  fontWeight: "800",
  color: "#0B2D5C",
  marginTop: 20,
},

floatingContainer: {
  position: "absolute",
  width: "100%",
  height: 250,
  alignItems: "center",
  justifyContent: "center",
},

floatingDot: {
  position: "absolute",
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: "#A5D6A7",
  opacity: 0.7,
  top: Math.random() * 200,
  left: Math.random() * 250,
},

successDesc: {
  fontSize: 14,
  color: "#555",
  textAlign: "center",
  marginTop: 8,
  lineHeight: 20,
  paddingHorizontal: 20,
},

successTitle: {
  fontSize: 22,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 12,
  color: "#000",
},

timerBox: {
  marginTop: 40,
  width: 187,
  paddingVertical: 12,
  borderRadius: 66,
  borderWidth: 4,
  borderColor: "#FF0000",
  backgroundColor: "#fff",
  alignItems: "center",
  elevation: 8,
},

timerText: {
  fontSize: 36,
  fontWeight: "700",
  color: "#FF0000",
},

});

