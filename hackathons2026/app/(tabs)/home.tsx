import {
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,} from "@expo/vector-icons";
import React, { useState,useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Animated, Easing } from "react-native";
const { width } = Dimensions.get("window");
import { useRouter } from "expo-router";
<<<<<<< Updated upstream
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@/config/api";
=======
<<<<<<< HEAD
const LockerImage = require("../../assets/images/locker_check.png");
=======
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@/config/api";
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes

export default function Home() {
  const { confirm, box_id } = useLocalSearchParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const [showPickup, setShowPickup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const router = useRouter();

    const banners = [
    require("../../assets/images/banner1.jpg"),
    require("../../assets/images/banner2.jpg"),
    require("../../assets/images/banner3.jpg"),
    require("../../assets/images/banner4.jpg"),
    require("../../assets/images/banner5.jpg"),
  ];

  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
  const timer = setInterval(() => {
    setBannerIndex((prev) => (prev + 1) % banners.length);
  }, 3000);

  return () => clearInterval(timer);
  }, []);
  
  const rotate = rotateAnim.interpolate({
    
  inputRange: [0, 1],
  outputRange: ["-45deg", "-20deg"],
  });

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [borrowing, setBorrowing] = useState(false);

<<<<<<< Updated upstream
  useEffect(() => {
    const checkUser = async () => {
      const user_id = await AsyncStorage.getItem('user_id');

      if (!user_id) {
        router.replace('/login');
      }
    };

    checkUser();
  }, []);

  //Check if box_id is the real box
  useEffect(() => {
    if (!box_id) return;

    fetch(`${API_URL}/check_box.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ box_id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage(`Box found. Status: ${data.box.status}`);
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => setMessage("Server error"))
      .finally(() => setLoading(false));
  }, [box_id]);

  //ส่งให้หลังบ้าน
  const useUmbrella = async () => {
    if (!box_id) return;

    const user_id = await AsyncStorage.getItem("user_id");

    console.log("Borrow request:", { user_id, box_id });

    if (!user_id) {
      Alert.alert("Error", "User not found");
      return;
    }

    setBorrowing(true);

    try {
      console.log("Sending:", { user_id, box_id });
      const res = await fetch(`${API_URL}/borrow_umbrella.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          box_id,
        }),
      });

      const data = await res.json();
      

      if (data.success) {
        setMessage(
          `Umbrella ${data.umbrella_id} borrowed successfully`
        );

      } else {
        setMessage(data.message);
      }

    } catch {
      setMessage("Server error");
    }

    setBorrowing(false);
  };

  const checkBorrow = async () => {
  const user_id = await AsyncStorage.getItem("user_id");

  try {
    const res = await fetch(
      `${API_URL}/check_borrow_status.php?user_id=${user_id}`
    );

    const data = await res.json();

    console.log("CHECK BORROW RESPONSE:", data);

    if (data.borrowed) {
      console.log("Umbrella taken:", data.umbrella_id);
      setShowPickup(false);
      router.replace("/borrow");
    }

  } catch (err) {
    console.log("Check borrow error:", err);
  }
};


  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

=======
>>>>>>> Stashed changes
  useEffect(() => {
    const checkUser = async () => {
      const user_id = await AsyncStorage.getItem('user_id');

      if (!user_id) {
        router.replace('/login');
      }
    };

    checkUser();
  }, []);

  //Check if box_id is the real box
  useEffect(() => {
    if (!box_id) return;

    fetch(`${API_URL}/check_box.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ box_id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage(`Box found. Status: ${data.box.status}`);
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => setMessage("Server error"))
      .finally(() => setLoading(false));
  }, [box_id]);

  //ส่งให้หลังบ้าน
  const useUmbrella = async () => {
    if (!box_id) return;

    const user_id = await AsyncStorage.getItem("user_id");

    console.log("Borrow request:", { user_id, box_id });

    if (!user_id) {
      Alert.alert("Error", "User not found");
      return;
    }

    setBorrowing(true);

    try {
      console.log("Sending:", { user_id, box_id });
      const res = await fetch(`${API_URL}/borrow_umbrella.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          box_id,
        }),
      });

      const data = await res.json();
      

      if (data.success) {
        setMessage(
          `Umbrella ${data.umbrella_id} borrowed successfully`
        );

      } else {
        setMessage(data.message);
      }

    } catch {
      setMessage("Server error");
    }

    setBorrowing(false);
  };

  const checkBorrow = async () => {
  const user_id = await AsyncStorage.getItem("user_id");

  try {
    const res = await fetch(
      `${API_URL}/check_borrow_status.php?user_id=${user_id}`
    );

    const data = await res.json();

    console.log("CHECK BORROW RESPONSE:", data);

    if (data.borrowed) {
      console.log("Umbrella taken:", data.umbrella_id);
      setShowPickup(false);
      router.replace("/borrow");
    }

  } catch (err) {
    console.log("Check borrow error:", err);
  }
};


  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
  if (confirm === "true") {
    setShowConfirm(true);
    router.setParams({ overlay: "true" });
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

  console.log("Start checking borrow status...");

  const interval = setInterval(() => {
    console.log("Checking borrow status...");
    checkBorrow();
  }, 1500);

  const timer = setInterval(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  return () => {
    clearInterval(interval);
    clearInterval(timer);
    console.log("Stop checking borrow status");
  };
}, [showPickup]);

useEffect(() => {
  if (timeLeft <= 0 && showPickup) {
    setShowPickup(false);
    router.push("/borrow");
  }
}, [timeLeft]);

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
            <Ionicons name="notifications" size={24} color="white" />
            <Ionicons name="settings" size={24} color="white" />
          </View>
        </View>

       <View style={styles.topCards}>
  {/* Reward */}
  <View style={styles.rewardCard}>
    <Text style={styles.rewardSmall}>Reward Points</Text>
    <Text style={styles.rewardBig}>150 UMP</Text>
    <Ionicons
      name="gift"
      size={22}
      color="#17468C"
      style={{ position: "absolute", right: 10, top: 15 }}
    />
  </View>
  {/* Credit */}
  <View style={styles.creditTopCard}>
    <Text style={styles.rewardSmall}>Credit Balance</Text>
    <Text style={styles.rewardBig}>฿ 9999.99</Text>
    <Ionicons
      name="wallet"
      size={22}
      color="#17468C"
      style={{ position: "absolute", right: 10, top: 15 }}/>
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


{/* ACTIVITY BANNER (แยกออกจาก card) */}
<View style={styles.activitySection}>

<Text style={styles.activityTitle}>
กิจกรรม/การแจ้งเตือนล่าสุด
</Text>

<Image
source={banners[bannerIndex]}
style={styles.banner}
/>

<View style={styles.dots}>
{banners.map((_, i) => (
<View
key={i}
style={[
styles.dot,
bannerIndex === i && styles.activeDot,
]}
/>
))}
</View>

</View>


{/* WHITE MAIN CARD */}
<View style={styles.mainCard}>

<<<<<<< HEAD
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
=======
  {/* MAP */}
  <View style={styles.mapWrapper}>
    { location && (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
      }}
      showsUserLocation
    >
      <Marker
        coordinate={{ latitude: 13.7563, longitude: 100.5018 }}
        title="Umbrella Station"
      />
    </MapView>)}
    
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
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a

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

              useUmbrella(); //ส่งให้หลังบ้าน update db เพื่อยืมร่ม

              setTimeout(() => {
                setShowSuccess(true);

              setTimeout(() => {
                setShowSuccess(false);
                setTimeLeft(30);
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

      <View style={{ marginTop: 20 , alignItems: "center"  }}>
        <View style={styles.floatingContainer}>
    </View>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
  <Image
    source={LockerImage}
    style={{ width: 300, height: 205, resizeMode: "contain", alignSelf: "center",}}
    />
  </Animated.View>
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
<<<<<<< HEAD
  flex: 1,
  backgroundColor: "#F1F1F1",
  paddingBottom: 90,
},
=======
    flex: 1,
    backgroundColor: "#F1F1F1",
    overflow: "visible",
  },
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a

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
    marginTop: -10,
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
  marginTop: 10,
  marginHorizontal: 20,
  backgroundColor: "white",
  borderRadius: 30,
  padding: 15,
  elevation: 12,
},

mapWrapper: {
  height: 250,
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
  elevation: 999,
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
  width: 260,
  height: 220,
  alignSelf: "center",
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

creditTopCard: {
  flex: 1,
  backgroundColor: "white",
  padding: 12,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#D1D3E6",
  elevation: 4,
},

activitySection: {
  marginTop: 5,
  marginHorizontal: 20,
},

activityTitle: {
  fontSize: 12,
  fontWeight: "bold",
  color: "#8A8A8A",
  marginBottom: 5,
},

banner: {
  width: "100%",
  height: 160,
  borderRadius: 20,
  elevation: 6,
},

dots: {
  flexDirection: "row",
  justifyContent: "flex-end",
  marginTop: 6,
  gap: 6,
},

dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "#000",
},

activeDot: {
  backgroundColor: "#17468C",
  borderWidth: 0,
},

});

