import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LockerIcon from "../components/Lockericon";
import { API_URL } from "@/config/api";

type ApiResponse = {
  returned: boolean;
};

export default function PlaceUmbrella() {

  const router = useRouter();
  const { user_id } = useLocalSearchParams();

  const [timeLeft, setTimeLeft] = useState(30);
  const [slotId, setSlotId] = useState("-");

  /* ---------------- TIMER ---------------- */

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

}, [user_id]);

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

      {/* LOCKER ICON */}
      <View style={styles.iconArea}>
        <LockerIcon size={190} />

        <View style={styles.lockBadge}>
          <Ionicons name="lock-closed" size={22} color="white" />
        </View>
      </View>

      {/* SLOT ID */}
      <View style={styles.slotBox}>
        <Text style={styles.slotText}>{slotId}</Text>
      </View>

      {/* INSTRUCTION */}
      <View style={styles.instructionBox}>
        <Text style={styles.instruction}>
          โปรดนำร่มเก็บในช่องที่กำหนด
        </Text>
      </View>

      <Text style={styles.desc}>
        กรุณาวางร่มให้ตรงช่องและดันเข้าไปจนสุด ระบบจะทำการล็อคอัตโนมัติ
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
}

});