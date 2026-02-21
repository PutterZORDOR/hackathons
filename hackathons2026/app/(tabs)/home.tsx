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
import { router } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";



const { width } = Dimensions.get("window");

export default function Home() {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={[styles.container, { paddingBottom: tabBarHeight + 20 }]}>
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
            <Text style={styles.rewardBig}>0 UMP</Text>
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
          { label: "Um Point", on: "gift" },
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
      <Text style={styles.creditAmount}>฿ 0000.00</Text>
    </View>

    <View>
      <Text style={styles.sideLink}>UM Help</Text>
      <Text style={styles.sideLink}>Parking station</Text>
    </View>
  </View>

</View>



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



});

