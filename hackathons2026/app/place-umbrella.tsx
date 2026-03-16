import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
import { Image } from "react-native";
import lockLocker from "../assets/images/lock_locker.png";
import led from "../assets/images/led.png";
import { TouchableOpacity } from "react-native";
=======
import LockerIcon from "../components/Lockericon";
import { API_URL } from "@/config/api";

type ApiResponse = {
  returned: boolean;
};
<<<<<<< Updated upstream
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes

export default function PlaceUmbrella() {

  const router = useRouter();
  const { user_id } = useLocalSearchParams();

  const [timeLeft, setTimeLeft] = useState(30);
<<<<<<< Updated upstream
  const [slotId, setSlotId] = useState("-");

  /* ---------------- TIMER ---------------- */
=======
<<<<<<< HEAD
  const [showTimeout, setShowTimeout] = useState(false);
=======
  const [slotId, setSlotId] = useState("-");

  /* ---------------- TIMER ---------------- */
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ---------------- TIMEOUT ---------------- */

  useEffect(() => {
    if (timeLeft === 0) {
      router.replace("/lock-success-screen");
    }
  }, [timeLeft]);

  /* ---------------- CHECK RETURN STATUS ---------------- */

  useEffect(() => {

    if (!user_id) return;

    const interval = setInterval(async () => {
      try {

        const res = await fetch(
          `${API_URL}/check_return_status.php?user_id=${user_id}`
        );

        const data: ApiResponse = await res.json();

        console.log("RETURN CHECK:", data);

        if (data.returned) {

          clearInterval(interval);

          router.replace("/lock-success-screen");

        }

      } catch (err) {
        console.log("Return check error:", err);
      }

    }, 2000);

    return () => clearInterval(interval);

  }, [user_id]);

  const formatTime = (sec: number) => {
    const s = sec.toString().padStart(2, "0");
    return `00:${s}`;
  };

  //  show slot_id
 useEffect(() => {

  if (!user_id) return;

  const interval = setInterval(async () => {

    try {

      const res = await fetch(
        `${API_URL}/get_return_slot.php?user_id=${user_id}`
      );

      const data = await res.json();

      console.log("SLOT RESPONSE:", data);

      if (data.success) {
        setSlotId(data.slot_id);
      }

    } catch (err) {
      console.log(err);
    }

  }, 1000);

  return () => clearInterval(interval);
<<<<<<< Updated upstream

}, [user_id]);

=======

}, [user_id]);

<<<<<<< HEAD
useEffect(() => {
  if (timeLeft === 0) {
  setShowTimeout(true);
}
}, [timeLeft]);
const formatTime = (sec: number) => {
  const s = sec.toString().padStart(2, "0");
  return `00:${s}`;
};
=======
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
>>>>>>> Stashed changes
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>วางร่ม</Text>
      </View>

      {/* TIME */}
      <Text style={styles.timeLabel}>ระยะเวลา</Text>

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.iconArea}>
<<<<<<< HEAD
      <Image source={lockLocker} style={styles.lockerImage} />
=======
        <LockerIcon size={190} />

        <View style={styles.lockBadge}>
          <Ionicons name="lock-closed" size={22} color="white" />
        </View>
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a
      </View>

      <View style={styles.slotBox}>
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    <Text style={styles.slotText}>A1</Text>

    <Image
    source={led}
    style={styles.ledIcon}
     />
    </View>
=======
>>>>>>> Stashed changes
        <Text style={styles.slotText}>{slotId}</Text>
      </View>
>>>>>>> e479ae965268528b6bed7552a0c1ae3ca3296e2a

      {/* INSTRUCTION */}
      <View style={styles.instructionBox}>
        <Text style={styles.instruction}>
          โปรดนำร่มเก็บในช่องที่กำหนด
        </Text>
      </View>

      <Text style={styles.desc}>
        กรุณาวางร่มให้ตรงช่องที่มีไฟสีเขียวและดันเข้าไปจนสุด ระบบจะทำการล็อคอัตโนมัติ
        ขอบคุณที่ช่วยดูแลร่มสำหรับการใช้งานร่วมกัน
      </Text>

      {/* STEP BAR */}
      <View style={styles.stepContainer}>

        <View style={styles.stepItem}>
          <View style={styles.stepCircleInactive}>
            <Ionicons name="qr-code" size={20} color="#333"/>
          </View>
          <Text style={styles.stepText}>สแกน QR</Text>
        </View>

        <View style={styles.stepLine}/>

        <View style={styles.stepItem}>
          <View style={styles.stepCircleActive}>
            <Ionicons name="umbrella" size={20} color="white"/>
          </View>
          <Text style={styles.stepTextActive}>คืนร่ม</Text>
        </View>

        <View style={styles.stepLine}/>

        <View style={styles.stepItem}>
          <View style={styles.stepCircleInactive}>
            <Ionicons name="lock-closed" size={20} color="#333"/>
          </View>
          <Text style={styles.stepText}>ล็อค</Text>
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

container:{
flex:1,
backgroundColor:"#fff",
alignItems:"center"
},

header:{
width:"100%",
height:100,
backgroundColor:"#0a3a73",
justifyContent:"center",
alignItems:"center",
borderBottomLeftRadius:28,
borderBottomRightRadius:28
},

headerText:{
color:"#fff",
fontSize:24,
fontWeight:"700"
},

timeLabel:{
marginTop:20,
fontSize:13
},

timerBox:{
marginTop:10,
paddingHorizontal:40,
paddingVertical:10,
borderWidth:4,
borderColor:"red",
borderRadius:40,
shadowColor:"#000",
shadowOpacity:0.25,
shadowRadius:6
},

timerText:{
fontSize:36,
fontWeight:"700",
color:"red"
},

ledIcon:{
width:55,
height:100,
resizeMode:"contain"
},

iconArea:{
marginTop:40,
alignItems:"center",
justifyContent:"center"
},

lockBadge:{
position:"absolute",
right:20,
top:60,
backgroundColor:"#E30000",
borderRadius:20,
padding:6
},

slotBox:{
marginTop:30,
width:260,
height:90,
backgroundColor:"#000",
borderRadius:30,
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
shadowColor:"#000",
shadowOpacity:0.3,
shadowRadius:8
},

slotText:{
color:"#fff",
fontSize:60,
fontWeight:"700"
},

instructionBox:{
marginTop:30,
backgroundColor:"#fff",
paddingVertical:16,
paddingHorizontal:30,
borderRadius:40,
shadowColor:"#000",
shadowOpacity:0.2,
shadowRadius:6
},

instruction:{
fontSize:24,
fontWeight:"600",
textAlign:"center"
},

desc:{
marginTop:20,
width:300,
fontSize:12,
textAlign:"center"
},

stepContainer:{
flexDirection:"row",
alignItems:"center",
marginTop:20
},

stepItem:{
alignItems:"center"
},

stepCircleActive:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#0a3a73",
justifyContent:"center",
alignItems:"center"
},

stepCircleInactive:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#D9D9D9",
justifyContent:"center",
alignItems:"center"
},

stepLine:{
width:70,
height:3,
backgroundColor:"#D9D9D9"
},

stepText:{
fontSize:10,
marginTop:4
},

stepTextActive:{
fontSize:10,
marginTop:4,
color:"#0a3a73",
fontWeight:"600"
},

lockerImage:{
width:320,
height:220,
resizeMode:"contain"
},

overlay:{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backgroundColor:"rgba(0,0,0,0.55)",
justifyContent:"center",
alignItems:"center"
},

popup:{
width:320,
backgroundColor:"#fff",
borderRadius:40,
paddingVertical:40,
alignItems:"center"
},

warningCircle:{
width:140,
height:140,
borderRadius:70,
backgroundColor:"#ff0000",
justifyContent:"center",
alignItems:"center",
marginBottom:20
},

warningText:{
fontSize:80,
color:"#fff",
fontWeight:"700"
},

timeoutTitle:{
fontSize:32,
fontWeight:"700",
marginBottom:10
},

timeoutDesc:{
fontSize:14,
textAlign:"center",
marginBottom:30,
width:220
},

retryButton:{
  backgroundColor:"#f2f2f2",
  paddingVertical:14,
  paddingHorizontal:50,
  borderRadius:40,

  // shadow (iOS)
  shadowColor:"#000",
  shadowOffset:{
    width:0,
    height:4
  },
  shadowOpacity:0.25,
  shadowRadius:4,

  // shadow (Android)
  elevation:6
},

retryText:{
fontSize:22,
fontWeight:"600"
},

});