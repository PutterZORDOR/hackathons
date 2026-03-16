import { API_URL } from "@/config/api";
import { Ionicons } from "@expo/vector-icons";
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import check1 from "../assets/images/check1.png";
import check3 from "../assets/images/check3.png";
=======
>>>>>>> Stashed changes
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
export default function ConfirmReturn() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(30);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  const [showTimeout, setShowTimeout] = useState(false);
=======
>>>>>>> Stashed changes
  const { box_id, user_id } = useLocalSearchParams();
  const [startTime] = useState(Date.now());


  const checkRFID = async () => {
  try {

    const res = await fetch(
      `${API_URL}/check_rfid_event.php?box_id=${box_id}&since=${startTime}`
    );

    const data = await res.json();

    console.log("RFID EVENT:", data);

    if (data.scanned) {
      console.log("RFID detected:", data.umbrella_id);

      router.replace({
        pathname: "/place-umbrella",
        params: { user_id }
      });
    }

  } catch (err) {
    console.log("RFID check error:", err);
  }
};

useEffect(() => {

  const interval = setInterval(() => {

    checkRFID();

    console.log("Checking RFID event...");
    checkRFID();

  }, 1800); // every 2 seconds

  return () => clearInterval(interval);

}, []);
<<<<<<< Updated upstream
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  }, 2000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  if (timeLeft === 0) {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  setShowTimeout(true);
}
=======
>>>>>>> Stashed changes
    router.replace({
      pathname: "/place-umbrella",
      params: { user_id }
    });
  }
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
}, [timeLeft]);
const formatTime = (sec: number) => {
  const s = sec.toString().padStart(2, "0");
  return `00:${s}`;
};
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ยืนยันตัวร่ม</Text>
      </View>

      {/* TIMER */}
      <Text style={styles.timeLabel}>ระยะเวลา</Text>

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

    <View style={styles.card}>

    <Image source={check1} style={styles.umbrellaImg} />

    <Ionicons name="arrow-forward" size={60} color="#0a3a73" style={styles.arrow} />

    <Image source={check3} style={styles.machineImg} />

    </View>

      {/* INSTRUCTION */}
       <View style={styles.instructionBox}>
              <Text style={styles.instruction}>
                กรุณาจัดตำแหน่งด้ามจับร่มให้ตรงกับโลโก้หน้าตู้
              </Text>
            </View>

      <Text style={styles.desc}>
        เพื่อให้ระบบสามารถยืนยันและตรวจสอบไอดีร่มสำหรับดำเนินการในขั้นตอนถัดไป
      </Text>

      {/* STEP PROGRESS */}
      <View style={styles.stepContainer}>

        {/* STEP 1 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircleInactive}>
            <Ionicons name="qr-code" size={22} color="white" />
          </View>
          <Text style={styles.stepText}>สแกน QR code</Text>
        </View>

        <View style={styles.stepLine} />

        {/* STEP 2 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircleActive}>
            <Ionicons name="umbrella" size={22} color="white" />
          </View>
          <Text style={styles.stepText}>คืนร่ม</Text>
        </View>

        <View style={styles.stepLine} />

        {/* STEP 3 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircleInactive}>
            <Ionicons name="lock-closed" size={22} color="white" />
          </View>
          <Text style={styles.stepText}>ล็อกเสร็จสิ้น</Text>
        </View>

      </View>

      {showTimeout && (
<View style={styles.overlay}>

<View style={styles.popup}>

<View style={styles.warningCircle}>
<Text style={styles.warningText}>!</Text>
</View>

<Text style={styles.timeoutTitle}>หมดเวลา</Text>

<Text style={styles.timeoutDesc}>
ระบบไม่สามารถดำเนินการต่อได้{"\n"}
กรุณาเริ่มขั้นตอนการวางร่มใหม่อีกครั้ง
</Text>

<TouchableOpacity
style={styles.retryButton}
onPress={() => router.replace("/(tabs)/borrow")}
>
<Text style={styles.retryText}>ลองอีกครั้ง</Text>
</TouchableOpacity>

</View>

</View>
)}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#0a3a73",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  timeLabel: {
    marginTop: 25,
    fontSize: 14,
  },

  timerBox: {
  marginTop: 10,
  paddingHorizontal: 40,
  paddingVertical: 10,
  borderWidth: 4,
  borderColor: "red",
  borderRadius: 40,

  shadowColor:"#000",
  shadowOpacity:0.25,
  shadowRadius:6,
  shadowOffset:{width:0,height:3},
  elevation:4
},

  timerText: {
    fontSize: 36,
    color: "red",
    fontWeight: "700",
  },

  iconContainer: {
    alignItems: "center",
    marginTop: 40,
  },

instructionBox:{
marginTop:30,
backgroundColor:"#fff",
paddingVertical:16,
paddingHorizontal:25,
borderRadius:40,

shadowColor:"#000",
shadowOpacity:0.25,
shadowRadius:8,
shadowOffset:{width:0,height:3},
elevation:4
},

instruction:{
fontSize:16,
fontWeight:"500",
textAlign:"center"
},

  desc: {
    marginTop: 30,
    width: 260,
    textAlign: "center",
    fontSize: 11,
  },

  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  stepItem: {
    alignItems: "center",
  },

  stepCircleActive: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0a3a73",
    justifyContent: "center",
    alignItems: "center",
  },

  stepCircleInactive: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },

  stepLine: {
    width: 60,
    height: 3,
    backgroundColor: "#D9D9D9",
  },

  stepText: {
    marginTop: 6,
    fontSize: 12,
  },


  card:{
  marginTop:20,
  width:340,
  height:300,
  backgroundColor:"#fff",
  borderRadius:20,
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
  shadowColor:"#000",
  shadowOpacity:0.25,
  shadowRadius:8,
  shadowOffset:{width:0,height:4},
  elevation:5
},

umbrellaImg:{
  width:120,
  height:200,
  resizeMode:"contain"
},

machineImg:{
  width:170,
  height:250,
  resizeMode:"contain"
},

arrow:{
  marginHorizontal:-10
},

overlay:{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backgroundColor:"rgba(0,0,0,0.45)",
justifyContent:"center",
alignItems:"center"
},

popup:{
width:340,
backgroundColor:"#fff",
borderRadius:40,
paddingVertical:40,
alignItems:"center",

shadowColor:"#000",
shadowOpacity:0.25,
shadowRadius:10,
shadowOffset:{width:0,height:5},
elevation:8
},

warningCircle:{
width:160,
height:160,
borderRadius:80,
backgroundColor:"#ff0000",
justifyContent:"center",
alignItems:"center",
marginBottom:25
},

warningText:{
fontSize:90,
color:"#fff",
fontWeight:"700"
},

timeoutTitle:{
fontSize:34,
fontWeight:"700",
marginBottom:10
},

timeoutDesc:{
fontSize:14,
textAlign:"center",
width:240,
marginBottom:30
},

retryButton:{
backgroundColor:"#eee",
paddingVertical:16,
paddingHorizontal:80,
borderRadius:40,

shadowColor:"#000",
shadowOpacity:0.25,
shadowRadius:8,
shadowOffset:{width:0,height:4},
elevation:6
},

retryText:{
fontSize:24,
fontWeight:"700"
}

});