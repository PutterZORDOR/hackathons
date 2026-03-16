import React, { useEffect, useState, useRef } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Borrow() {
  const [location, setLocation] = useState<any>(null);
  const [isFullMap, setIsFullMap] = useState(false);
  const [time, setTime] = useState(0); // 1:15:40 = 4540 sec
  const [showReturnModal, setShowReturnModal] = useState(false);

  useEffect(() => {
    getLocation();

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {/* MAP */}
      {location && (
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      )}

      {/* SEARCH BAR */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#B9B9B9" />
          <Text style={styles.searchText}>
            ค้นหาจุดหมายที่ใกล้สุด
          </Text>
        </View>

        <View style={styles.moreBtn}>
          <Ionicons name="ellipsis-horizontal" size={18} color="white" />
        </View>
      </View>

      {/* BOTTOM PANEL */}
      <View style={styles.bottomPanel}>
        <View style={styles.handle} />

        {/* คืนร่ม */}
        <TouchableOpacity
          style={styles.returnBtn}
          onPress={() => setShowReturnModal(true)}
        >
          <Ionicons name="umbrella" size={26} color="white" />
          <Text style={styles.returnText}>คืนร่ม</Text>
          </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={styles.extendBtn}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={22}
              color="white"
            />
            <Text style={styles.smallBtnText}>ต่อเวลา</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reserveBtn}>
            <Ionicons name="hand-left" size={22} color="white" />
            <Text style={styles.smallBtnText}>จองสิทธิ์</Text>
          </TouchableOpacity>

          <View style={styles.timeBox}>
            <Text style={styles.timeText}>
              {formatTime(time)}
            </Text>
            <Text style={styles.timeLabel}>
              ระยะเวลา
            </Text>
          </View>
        </View>
      </View>
<View style={styles.container}>

  {location && (
    <View style={isFullMap ? styles.fullMap : styles.normalMap}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      />
    </View>
  )}

  {/* UI อื่น ๆ ตามเดิม */}

  <Modal
  visible={showReturnModal}
  transparent
  animationType="fade"
>
  <TouchableWithoutFeedback onPress={() => setShowReturnModal(false)}>
    <View style={styles.modalOverlay}>
      
      <TouchableWithoutFeedback>
        <View style={styles.modalBox}>

          <Text style={styles.modalTitle}>
            คืนร่มแล้วใช่มั้ย?
          </Text>

          <Ionicons name="umbrella" size={80} color="#0A2A66" />

          <Text style={styles.modalDesc}>
            กรุณากดยืนยันเพื่อดำเนินการต่อ
          </Text>

           <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => {
          setShowReturnModal(false)
          router.push("/scanReturn")
        }}
      >
            <Text style={styles.confirmText}>
              ยืนยันการคืนร่ม
            </Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>

    </View>
  </TouchableWithoutFeedback>
</Modal>

</View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  map: {
  width: "100%",
  height: "100%",
},

  searchWrapper: {
    position: "absolute",
    top: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBar: {
    width: width * 0.75,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 66,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 4,
  },

  searchText: {
    marginLeft: 8,
    color: "#B9B9B9",
    fontSize: 12,
  },

  moreBtn: {
    width: 37,
    height: 37,
    borderRadius: 20,
    backgroundColor: "#17468C",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  locateBtn: {
    position: "absolute",
    bottom: 260,
    right: 20,
    width: 53,
    height: 53,
    borderRadius: 30,
    backgroundColor: "#17468C",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomPanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 230,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 10,
    alignItems: "center",
    elevation: 10,
  },

  handle: {
    width: 63,
    height: 7,
    backgroundColor: "#D7D9D8",
    borderRadius: 66,
    marginBottom: 15,
  },

  returnBtn: {
    width: width * 0.85,
    height: 65,
    backgroundColor: "#000",
    borderRadius: 66,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  returnText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },

  row: {
    flexDirection: "row",
    marginTop: 20,
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  extendBtn: {
    width: 120,
    height: 55,
    backgroundColor: "#17468C",
    borderRadius: 66,
    justifyContent: "center",
    alignItems: "center",
  },

  reserveBtn: {
    width: 120,
    height: 55,
    backgroundColor: "#34C759",
    borderRadius: 66,
    justifyContent: "center",
    alignItems: "center",
  },

  smallBtnText: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },

  timeBox: {
    alignItems: "center",
  },

  timeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#17468C",
  },

  timeLabel: {
    fontSize: 11,
    color: "#17468C",
  },

  normalMap: {
  width: "100%",
  height: height * 0.75,
},

fullMap: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
},
fullBackBtn: {
  position: "absolute",
  top: 60,
  left: 20,
  width: 45,
  height: 45,
  borderRadius: 25,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
},


modalOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "flex-end",
},

modalBox: {
  backgroundColor: "white",
  height: 320,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  alignItems: "center",
  padding: 20,
},

modalTitle: {
  fontSize: 22,
  fontWeight: "700",
  marginBottom: 20,
},

modalDesc: {
  fontSize: 14,
  color: "#555",
  marginTop: 10,
  marginBottom: 30,
},

confirmBtn: {
  width: "90%",
  height: 60,
  backgroundColor: "red",
  borderRadius: 40,
  justifyContent: "center",
  alignItems: "center",
},

confirmText: {
  color: "white",
  fontSize: 18,
  fontWeight: "600",
},
});